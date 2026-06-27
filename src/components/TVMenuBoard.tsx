import { CSSProperties, ReactNode, RefObject, useEffect, useRef, useState } from 'react';

import Head from 'next/head';

import { SHOWCASE_IMAGES } from '@/data/drink-images/showcaseImages';

import { tvMenu } from '@/config/fonts';

import styles from '@/styles/TVMenuBoard.module.css';

const RELOAD_INTERVAL_MILLIS = 30 * 60 * 1000;
const SHOWCASE_INTERVAL_MILLIS = 5 * 1000;
const TV_WIDTH_PX = 1920;
const TV_HEIGHT_PX = 1080;

type MenuSide = 'left' | 'right';

type ItemProps = {
  code: string;
  children: ReactNode;
  description?: ReactNode;
  className?: string;
};

type SectionProps = {
  title: ReactNode;
  tone?: 'green' | 'orange';
  children: ReactNode;
  className?: string;
  semanticClassName?: string;
  subhead?: ReactNode;
  debugLabel?: string;
};

function useTvRefresh() {
  useEffect(() => {
    const reloadTimer = setInterval(() => window.location.reload(), RELOAD_INTERVAL_MILLIS);
    return () => clearInterval(reloadTimer);
  }, []);

  useEffect(() => {
    let wakeLock: { release: () => Promise<void> } | undefined;

    async function requestWakeLock() {
      try {
        const nav = navigator as Navigator & {
          wakeLock?: { request: (type: 'screen') => Promise<{ release: () => Promise<void> }> };
        };
        wakeLock = await nav.wakeLock?.request('screen');
      } catch {
        // Wake lock is best-effort only. The TV pages should still render cleanly.
      }
    }

    requestWakeLock();
    return () => {
      wakeLock?.release().catch(() => undefined);
    };
  }, []);
}

function isEnabledParam(value: string | null) {
  return value ? ['1', 'true', 'yes'].includes(value.toLowerCase()) : false;
}

function useDebugRegions() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('debug') ?? params.get('debugRegions') ?? params.get('regions');
    setEnabled(isEnabledParam(value));
  }, []);

  return enabled;
}

function useShowCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const override = params.get('debug') ?? params.get('showCursor') ?? params.get('cursor');

    if (override) {
      setEnabled(isEnabledParam(override));
      return;
    }

    const hostname = window.location.hostname.toLowerCase();
    setEnabled(hostname !== 'tearekz.cafe' && hostname !== 'www.tearekz.cafe');
  }, []);

  return enabled;
}

function useTvScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      setScale(Math.min(window.innerWidth / TV_WIDTH_PX, window.innerHeight / TV_HEIGHT_PX));
    }

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return scale;
}

type DebugRegion = {
  id: number;
  label: string;
  color: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

type DebugMeasurement = {
  boardWidth: number;
  boardHeight: number;
  layoutWidth: number;
  layoutHeight: number;
  scaleX: number;
  scaleY: number;
  regions: DebugRegion[];
};

const DEBUG_REGION_SELECTOR = '[data-debug-region]';
const DEBUG_COLORS = [
  '#e53935',
  '#8e24aa',
  '#1e88e5',
  '#43a047',
  '#fb8c00',
  '#7cb342',
  '#6d4c41',
  '#d81b60',
  '#f6a000',
  '#00897b',
  '#3949ab',
  '#c0a000',
];

function getRegionLabel(element: HTMLElement) {
  return (
    element.dataset.debugRegion || element.getAttribute('aria-label') || element.id || 'Region'
  );
}

function measureDebugRegions(board: HTMLElement): DebugMeasurement {
  const boardRect = board.getBoundingClientRect();
  const scaleX = boardRect.width > 0 ? TV_WIDTH_PX / boardRect.width : 1;
  const scaleY = boardRect.height > 0 ? TV_HEIGHT_PX / boardRect.height : 1;

  const regions = Array.from(board.querySelectorAll<HTMLElement>(DEBUG_REGION_SELECTOR))
    .map((element, index) => {
      const rect = element.getBoundingClientRect();
      return {
        id: index + 1,
        label: getRegionLabel(element),
        color: DEBUG_COLORS[index % DEBUG_COLORS.length],
        left: (rect.left - boardRect.left) * scaleX,
        top: (rect.top - boardRect.top) * scaleY,
        width: rect.width * scaleX,
        height: rect.height * scaleY,
      };
    })
    .filter((region) => region.width > 0 && region.height > 0);

  return {
    boardWidth: boardRect.width,
    boardHeight: boardRect.height,
    layoutWidth: TV_WIDTH_PX,
    layoutHeight: TV_HEIGHT_PX,
    scaleX,
    scaleY,
    regions,
  };
}

function useDebugMeasurement(enabled: boolean, boardRef: RefObject<HTMLElement | null>) {
  const [measurement, setMeasurement] = useState<DebugMeasurement | null>(null);

  useEffect(() => {
    if (!enabled || !boardRef.current) {
      setMeasurement(null);
      return;
    }

    const board = boardRef.current;
    let frameId = 0;

    const updateMeasurement = () => {
      frameId = 0;
      setMeasurement(measureDebugRegions(board));
    };

    const scheduleMeasurement = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateMeasurement);
    };

    scheduleMeasurement();
    window.addEventListener('resize', scheduleMeasurement);
    window.addEventListener('load', scheduleMeasurement);

    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(scheduleMeasurement) : undefined;
    resizeObserver?.observe(board);
    board.querySelectorAll<HTMLElement>(DEBUG_REGION_SELECTOR).forEach((element) => {
      resizeObserver?.observe(element);
    });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', scheduleMeasurement);
      window.removeEventListener('load', scheduleMeasurement);
      resizeObserver?.disconnect();
    };
  }, [boardRef, enabled]);

  return measurement;
}

function roundPixel(value: number) {
  return `${Math.round(value)}px`;
}

function getRegionMetrics(region: DebugRegion) {
  return `${roundPixel(region.width)} × ${roundPixel(region.height)} · x ${roundPixel(
    region.left
  )}, y ${roundPixel(region.top)}`;
}

function getBoardMetrics(measurement: DebugMeasurement | null) {
  if (!measurement) return `Board: ${TV_WIDTH_PX}px × ${TV_HEIGHT_PX}px`;

  const scale = (measurement.boardWidth / measurement.layoutWidth).toFixed(3);
  return `Board: ${Math.round(measurement.boardWidth)}px × ${Math.round(
    measurement.boardHeight
  )}px screen · ${measurement.layoutWidth}px × ${measurement.layoutHeight}px layout · scale ${scale}`;
}

function RegionOverlay({ boardRef }: { boardRef: RefObject<HTMLElement | null> }) {
  const measurement = useDebugMeasurement(true, boardRef);
  const regions = measurement?.regions ?? [];

  return (
    <div className={styles.regionOverlay} aria-hidden="true">
      <div className={styles.regionBoardLabel}>{getBoardMetrics(measurement)}</div>
      {regions.map((region) => (
        <div
          key={`${region.id}-${region.label}`}
          className={styles.regionBox}
          style={{
            left: region.left,
            top: region.top,
            width: region.width,
            height: region.height,
            borderColor: region.color,
            color: region.color,
          }}
        >
          <span className={styles.regionLabel} style={{ backgroundColor: region.color }}>
            <strong>
              {region.id}. {region.label}
            </strong>
            <span>{getRegionMetrics(region)}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function Section({
  title,
  tone = 'green',
  children,
  className = '',
  semanticClassName = '',
  subhead,
  debugLabel,
}: SectionProps) {
  return (
    <section
      className={`${styles.section} ${semanticClassName} ${className}`.trim()}
      data-debug-region={debugLabel}
    >
      <div className={`${styles.sectionTitle} ${styles[tone]}`}>{title}</div>
      {subhead && <div className={styles.subhead}>{subhead}</div>}
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function Item({ code, children, description, className = '' }: ItemProps) {
  return (
    <div className={`${styles.item} ${className}`}>
      <div className={styles.itemLine}>
        <span className={styles.code}>{code}</span>
        <span className={styles.itemName}>{children}</span>
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}

function Colored({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className={styles.colored} style={{ color }}>
      {children}
    </span>
  );
}

function GradientText({ from, to, children }: { from: string; to: string; children: ReactNode }) {
  return (
    <span
      className={`${styles.colored} ${styles.gradientText}`}
      style={{ '--gradient-from': from, '--gradient-to': to } as CSSProperties}
    >
      {children}
    </span>
  );
}

function Price({ children }: { children: ReactNode }) {
  return <span className={styles.price}>{children}</span>;
}

const FRUIT_COLORS = {
  ginger: 'var(--menu-color-ginger)',
  hibiscus: 'var(--menu-color-hibiscus)',
  lychee: 'var(--menu-color-lychee)',
  mango: 'var(--menu-color-mango)',
  passionfruit: 'var(--menu-color-passionfruit)',
  peach: 'var(--menu-color-peach)',
  pineapple: 'var(--menu-color-pineapple)',
  purple: 'var(--menu-color-purple)',
  raspberry: 'var(--menu-color-raspberry)',
  rose: 'var(--menu-color-rose)',
  strawberry: 'var(--menu-color-strawberry)',
} as const;

const CREAM_COLORS = {
  brulee: 'var(--menu-color-brulee)',
  iceCream: 'var(--menu-color-ice-cream)',
  jasmine: 'var(--menu-color-jasmine-cream)',
  matcha: 'var(--menu-color-matcha-cream)',
  pistachio: 'var(--menu-color-pistachio-cream)',
  raspberry: 'var(--menu-color-raspberry-cream)',
  seaSaltCheese: 'var(--menu-color-sea-salt-cheese)',
} as const;

const TEA_COLORS = {
  assam: '#7a4b21',
  jasmine: CREAM_COLORS.jasmine,
  lychee: FRUIT_COLORS.lychee,
  magnolia: '#3e7a3b',
  peach: FRUIT_COLORS.peach,
  rooibos: '#a86f17',
  white: '#6f7f4a',
} as const;

const TOPPING_COLORS = {
  crystal: 'var(--menu-color-crystal)',
  brownSugar: 'var(--menu-color-brown-sugar)',
  taro: 'var(--menu-color-purple)',
} as const;

function Emoji({ children }: { children: ReactNode }) {
  return (
    <span className={styles.emoji} aria-hidden="true">
      {children}
    </span>
  );
}

function ToppingItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className={styles.toppingItem}>
      <span className={styles.toppingIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.toppingText}>{children}</span>
    </p>
  );
}

function ShowcasePreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (SHOWCASE_IMAGES.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % SHOWCASE_IMAGES.length);
    }, SHOWCASE_INTERVAL_MILLIS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={`${styles.showcaseWidget} showcase-slideshow-widget`}
      aria-hidden="true"
      data-debug-region="Showcase slideshow"
    >
      {SHOWCASE_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={`${styles.showcaseSlide} ${index === activeIndex ? styles.showcaseSlideActive : ''}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className={styles.showcaseImage} />
          <div className={styles.showcaseName}>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

function SymbolLegend() {
  return (
    <div className={styles.legend} data-debug-region="Symbol legend">
      <div className={styles.legendItem}>
        <span className={`${styles.legendIcon} ${styles.iceIcon}`}>❄️</span>
        <span className={styles.legendText}>Iced only</span>
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendIcon} ${styles.moonIcon}`}>🌙</span>
        <span className={styles.legendText}>Caffeine-free</span>
      </div>
      <div className={styles.legendItem}>
        <span className={`${styles.legendIcon} ${styles.cloudIcon}`}>☁️</span>
        <span className={styles.legendText}>Pairs well with Cream Tops</span>
      </div>
    </div>
  );
}

function DrinkOptions() {
  return (
    <div
      className={`${styles.options} ${styles.drinkOptions} drink-options`}
      data-debug-region="Drink options"
    >
      <div className={`${styles.optionGroup} ${styles.sweetenerOptions}`}>
        <div className={styles.optionRow}>
          <span className={styles.optionLabel}>Sweetness Options:</span> 100% · 75% · 50% · 25% ·
          10% · 0%{' '}
          <span className={styles.optionExplainer}>(Some drinks contain built-in cane sugar)</span>
        </div>
        <div className={`${styles.optionRow} ${styles.optionExplainer}`}>
          Sugar-free sweetener (Allulose & Monk Fruit) available for most drinks (+$0.5)
        </div>
      </div>
      <div className={`${styles.optionGroup} ${styles.iceMilkOptions}`}>
        <div className={styles.optionRow}>
          <span className={styles.optionLabel}>Ice Options:</span> 100% · 50% · 0%
        </div>
        <div className={styles.optionRow}>
          <span className={styles.optionLabel}>Milk Options:</span> Dairy · Oat (+$0.75)
        </div>
        <div className={`${styles.optionRow} ${styles.boostOptions}`}>
          <span className={styles.optionLabel}>Additional Boosts 💪:</span> Whey Protein 🥛 +$2 ·
          Pea Protein 🫛 +$2 · Creatine ⚡ +$1
        </div>
      </div>
    </div>
  );
}

function LeftMenu({ debugRegions = false }: { debugRegions?: boolean }) {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={boardRef} className={`${styles.board} ${styles.leftBoard}`}>
      <main className={styles.leftGrid}>
        <div className={`${styles.menuColumn} ${styles.leftCol1}`}>
          <Section
            title={
              <>
                <Emoji>🦖</Emoji> Tea-Rek&apos;z Signatures <Emoji>❄️</Emoji>
              </>
            }
            semanticClassName="section-signatures"
            debugLabel="Signatures section"
            className={styles.signatures}
          >
            <Item code="S1" description="Magnolia Green Tea with Jasmine Cream">
              Magnolia <Colored color={CREAM_COLORS.jasmine}>Cloud</Colored> <Price>$7.5</Price>
            </Item>
            <Item code="S2" description="Magnolia Green Tea with Sea Salt Cheese Cream">
              Magnolia <Colored color={CREAM_COLORS.seaSaltCheese}>Velvet</Colored>{' '}
              <Price>$7.5</Price>
            </Item>
            <Item code="S3" description="Magnolia Green Tea with Matcha Cream">
              Magnolia <Colored color={CREAM_COLORS.matcha}>Matcha</Colored> Cloud <Price>$8</Price>
            </Item>
            <Item
              code="S4"
              description={
                <>
                  Lychee and Peach Infused Magnolia Green Tea
                  <br />
                  with Jasmine Cream
                </>
              }
            >
              Magnolia{' '}
              <GradientText from={FRUIT_COLORS.lychee} to={FRUIT_COLORS.peach}>
                Orchard
              </GradientText>{' '}
              <Price>$8</Price>
            </Item>
            <Item code="S5" description="Lychee Jasmine Green Tea with Jasmine Cream">
              <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored>{' '}
              <Colored color={CREAM_COLORS.jasmine}>Blossom</Colored> <Price>$8</Price>
            </Item>
            <Item code="S6" description="Vietnamese Iced Coffee with Pistachio Cream">
              <Colored color={CREAM_COLORS.pistachio}>Pistachio</Colored> Cream Coffee{' '}
              <Price>$8</Price>
            </Item>
            <Item code="S7" description="Matcha Latte with Raspberry Cream">
              <Colored color={CREAM_COLORS.matcha}>Matcha</Colored>{' '}
              <Colored color={CREAM_COLORS.raspberry}>Blossom</Colored> <Price>$8</Price>
            </Item>
            <Item
              code="S8"
              description={
                <>
                  Organic strawberries, fresh milk, and naturally
                  <br />
                  colored strawberry popping boba
                </>
              }
            >
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> Pop Milk 🌙{' '}
              <Price>$7.5</Price>
            </Item>
            <Item
              code="S9"
              description={
                <>
                  Organic mango, fresh milk, and naturally colored
                  <br />
                  mango popping boba
                </>
              }
            >
              <Colored color={FRUIT_COLORS.mango}>Mango</Colored> Pop Milk 🌙 <Price>$7.5</Price>
            </Item>
          </Section>
        </div>

        <div className={`${styles.menuColumn} ${styles.leftCol2}`}>
          <Section
            title={
              <>
                <Emoji>🧋</Emoji> Milk Teas
              </>
            }
            tone="orange"
            semanticClassName="section-milk-teas"
            debugLabel="Milk Teas section"
            className={`${styles.milkTeas} ${styles.compactSection}`}
          >
            <Item code="21">
              Lychee Black Milk Tea <Price>$6.75</Price>
            </Item>
            <Item code="22">
              Assam Black Milk Tea <Price>$6.75</Price>
            </Item>
            <Item code="23">
              Roasted Oolong Milk Tea <Price>$6.75</Price>
            </Item>
            <Item code="24">
              Classic Thai Tea ❄️ <Price>$6.75</Price>
            </Item>
            <Item code="25">
              Crème Brûlée Classic Thai Tea ❄️ <Price>$8</Price>
            </Item>
            <Item code="26">
              Assam Masala Chai Tea <Price>$7</Price>
            </Item>
            <Item code="27">
              Jasmine Green Milk Tea <Price>$6.75</Price>
            </Item>
            <Item code="28">
              White Peach Oolong Milk Tea <Price>$7</Price>
            </Item>
            <Item code="29">
              Rooibos Milk Tea 🌙 <Price>$6.75</Price>
            </Item>
          </Section>

          <Section
            title={
              <>
                <Emoji>🫖</Emoji> Pure Teas
              </>
            }
            semanticClassName="section-pure-teas"
            debugLabel="Pure Teas section"
            className={styles.pureTeas}
          >
            <Item code="1">
              <Colored color={TEA_COLORS.jasmine}>Jasmine</Colored>{' '}
              <Colored color={TEA_COLORS.magnolia}>Green</Colored> ☁️ <Price>$5.75</Price>
            </Item>
            <Item code="2">
              <Colored color={TEA_COLORS.magnolia}>Magnolia Green</Colored> ❄️ ☁️ <Price>$6</Price>
            </Item>
            <Item code="3">
              <Colored color={TEA_COLORS.lychee}>Lychee</Colored>{' '}
              <Colored color={TEA_COLORS.assam}>Black</Colored> <Price>$5.75</Price>
            </Item>
            <Item code="4">
              <Colored color={TEA_COLORS.white}>White</Colored>{' '}
              <Colored color={TEA_COLORS.peach}>Peach</Colored>{' '}
              <Colored color={TEA_COLORS.assam}>Oolong</Colored> <Price>$6</Price> ☁️
            </Item>
            <Item code="5">
              <Colored color={TEA_COLORS.rooibos}>Rooibos</Colored> 🌙 <Price>$5.75</Price>
            </Item>
          </Section>
        </div>

        <div className={`${styles.menuColumn} ${styles.leftCol3}`}>
          <Section
            title={
              <>
                <Emoji>🥛</Emoji> Milk Drinks <Emoji>🌙</Emoji>
              </>
            }
            tone="orange"
            semanticClassName="section-milk-drinks"
            debugLabel="Milk Drinks section"
            className={`${styles.milkDrinks} ${styles.compactSection}`}
          >
            <Item code="41">
              🐯 Tiger Milk (with boba) 🌙 ❄️ <Price>$7</Price>
            </Item>
            <Item code="42">
              <span>
                🐯 Crème Brûlée
                <br />
                Tiger Milk (with boba) 🌙 ❄️ <Price>$8</Price>
              </span>
            </Item>
            <Item code="43" description="real taro, vanilla & milk">
              Taro Milk 🌙 <Price>$7</Price>
            </Item>
            <Item code="44" description="organic strawberries and fresh milk">
              Strawberry Milk 🌙 ❄️ ☁️ <Price>$7</Price>
            </Item>
            <Item code="45" description="organic mango and fresh milk">
              Korean Mango Milk 🌙 ❄️ ☁️ <Price>$7</Price>
            </Item>
            <Item code="46" description="oat milk horchata">
              Horchata de Avena 🌙 ❄️ <Price>$7</Price>
            </Item>
          </Section>

          <Section
            title={
              <>
                <Emoji>🍵</Emoji> Matcha
              </>
            }
            semanticClassName="section-matcha"
            debugLabel="Matcha section"
            className={styles.matcha}
          >
            <Item code="31">
              Matcha Latte ☁️ <Price>$7</Price>
            </Item>
            <Item code="32" className={styles.noWrapItem}>
              Brown Sugar Matcha Latte ☁️ <Price>$7.25</Price>
            </Item>
            <Item code="33">
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> Matcha Latte{' '}
              <Price>$8</Price>
            </Item>
            <Item code="34">
              <Colored color={FRUIT_COLORS.mango}>Mango</Colored> Matcha Latte <Price>$8</Price>
            </Item>
            <Item code="35">
              <Colored color="#7760a8">Taro</Colored> Matcha Latte <Price>$8</Price>
            </Item>
          </Section>
        </div>

        <aside className={`${styles.menuColumn} ${styles.leftAside}`}>
          <div
            className={`${styles.box} cream-tops-section ${styles.creamBox}`}
            data-debug-region="Cream Tops box"
          >
            <div className={`${styles.boxTitle} ${styles.creamTitle}`}>
              <Emoji>☁️</Emoji> Cream Tops
            </div>
            <div className={styles.boxBody}>
              <p className={styles.boxNote}>(Made with Real Cream · Contains Dairy)</p>
              <p>
                <Colored color={CREAM_COLORS.brulee}>Crème Brûlée</Colored>{' '}
                <span className={styles.creamQualifier}>(on cold drinks only)</span>{' '}
                <Price>$1.5</Price>
              </p>
              <p>
                <Colored color={CREAM_COLORS.iceCream}>Vanilla Ice Cream Float</Colored>{' '}
                <span className={styles.creamQualifier}>(on cold drinks only)</span>{' '}
                <Price>$2</Price>
              </p>
              <p>
                <Colored color={CREAM_COLORS.jasmine}>Jasmine Cream</Colored> (Whipped){' '}
                <Price>$1.5</Price>
              </p>
              <p>
                <Colored color={CREAM_COLORS.matcha}>Matcha Cream</Colored> <Price>$2</Price>
              </p>
              <p>
                <Colored color={CREAM_COLORS.pistachio}>Pistachio Cream</Colored> <Price>$2</Price>
              </p>
              <p>
                <Colored color={CREAM_COLORS.raspberry}>Raspberry Cream</Colored>{' '}
                <Price>$1.5</Price>
              </p>
              <p>
                <Colored color={CREAM_COLORS.seaSaltCheese}>Sea Salt Cheese Cream</Colored>{' '}
                <Price>$1.5</Price>
              </p>
            </div>
          </div>

          <div
            className={`${styles.box} toppings-section ${styles.toppingBox}`}
            data-debug-region="Toppings box"
          >
            <div className={`${styles.boxTitle} ${styles.toppingTitle}`}>
              <Emoji>✨</Emoji> Toppings $.75 each
            </div>
            <div className={styles.boxBody}>
              <ToppingItem icon="⚫">Boba (Tapioca Pearls)</ToppingItem>
              <ToppingItem icon="🔴">
                Popping Boba: <Colored color={FRUIT_COLORS.mango}>Mango</Colored> ·{' '}
                <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> ·{' '}
                <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored>
              </ToppingItem>
              <ToppingItem icon="⭐">
                Jelly: <Colored color={FRUIT_COLORS.mango}>Mango Star</Colored> ·{' '}
                <Colored color={FRUIT_COLORS.strawberry}>Strawberry Heart</Colored> ·{' '}
                <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored>
              </ToppingItem>
              <ToppingItem icon="🟤">
                Agar Boba: <Colored color={TOPPING_COLORS.crystal}>Crystal</Colored> ·{' '}
                <Colored color={TOPPING_COLORS.brownSugar}>Brown Sugar</Colored>
              </ToppingItem>
              <ToppingItem icon="🍉">Grapefruit Pulp</ToppingItem>
              <ToppingItem icon="🟨">Diced Mango</ToppingItem>
              <ToppingItem icon="🍠">
                <Colored color={TOPPING_COLORS.taro}>Taro</Colored>
              </ToppingItem>
            </div>
          </div>
        </aside>
      </main>
      <footer className={styles.screenFooter} data-debug-region="Footer bar">
        <SymbolLegend />
        <DrinkOptions />
        <div className={styles.footerLogoWrap} data-debug-region="Footer logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/menu/tv-native/tearekz-logo-cropped.png" alt="Tea-Rek'z" />
        </div>
      </footer>
      {debugRegions && <RegionOverlay boardRef={boardRef} />}
    </div>
  );
}

function RightMenu({ debugRegions = false }: { debugRegions?: boolean }) {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={boardRef} className={`${styles.board} ${styles.rightBoard}`}>
      <main className={styles.rightGrid}>
        <div className={`${styles.menuColumn} ${styles.rightCol1}`}>
          <Section
            title={
              <>
                Fruit Teas <Emoji>🍓</Emoji>
                <Emoji>🍑</Emoji>
                <Emoji>🥭</Emoji>
                <Emoji>🫖</Emoji>
              </>
            }
            subhead="Made with all-natural fruit purée"
            semanticClassName="section-fruit-teas"
            debugLabel="Fruit Teas section"
            className={styles.fruitTeas}
          >
            <Item code="51">
              <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored> Jasmine Green ☁️{' '}
              <Price>$6.75</Price>
            </Item>
            <Item code="52">
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored>{' '}
              <Colored color={FRUIT_COLORS.peach}>Peach</Colored> Jade Oolong ☁️{' '}
              <Price>$6.75</Price>
            </Item>
            <Item code="53">
              <Colored color={FRUIT_COLORS.mango}>Mango</Colored>{' '}
              <Colored color={FRUIT_COLORS.passionfruit}>Passionfruit</Colored> Jasmine Green{' '}
              <Price>$6.75</Price>
            </Item>
            <Item code="54">
              <Colored color={FRUIT_COLORS.peach}>Peach</Colored>{' '}
              <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored> Magnolia Green ❄️ ☁️{' '}
              <Price>$7</Price>
            </Item>
            <Item code="55">
              Build Your Own Fruit Tea <Price>$6.75</Price>
            </Item>
            <div className={`${styles.builderCopy} ${styles.builderOptions}`}>
              <b>Choose a tea:</b>
              <br />
              <Colored color="#3e7a3b">Jasmine Green</Colored> ·{' '}
              <Colored color="#3e7a3b">Magnolia Green</Colored> · Four Seasons Oolong
              <br />
              <b>Choose up to 2 fruits:</b>
              <br />
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.mango}>Mango</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.passionfruit}>Passionfruit</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.peach}>Peach</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored>
              <br />
              <Colored color={FRUIT_COLORS.raspberry}>Raspberry</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.pineapple}>Pineapple</Colored>
            </div>
          </Section>

          <Section
            title={
              <>
                Smash Lemonades <Emoji>🍋</Emoji>
                <Emoji>❄️</Emoji>
                <Emoji>🌙</Emoji>
              </>
            }
            subhead="Freshly smashed whole lemons blended with all-natural fruit purée"
            semanticClassName="section-smash-lemonades"
            debugLabel="Smash Lemonades section"
            className={styles.lemonades}
          >
            <Item code="61">
              Lemonade <Price>$6</Price>
            </Item>
            <Item code="62">
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> Lemonade{' '}
              <Price>$7</Price>
            </Item>
            <Item code="63">
              <Colored color={FRUIT_COLORS.mango}>Mango</Colored> Lemonade <Price>$7</Price>
            </Item>
            <Item code="64">
              <Colored color={FRUIT_COLORS.passionfruit}>Passionfruit</Colored> Lemonade{' '}
              <Price>$7</Price>
            </Item>
            <Item code="65" description="Butterfly pea–infused lemonade with passionfruit">
              <Colored color={FRUIT_COLORS.purple}>Purple</Colored> Lemonade <Price>$7.5</Price>
            </Item>
            <Item code="66">
              <Colored color={FRUIT_COLORS.rose}>Rose</Colored>{' '}
              <Colored color={FRUIT_COLORS.hibiscus}>Hibiscus</Colored> Lemonade <Price>$7</Price>
            </Item>
            <Item code="67">
              <Colored color={FRUIT_COLORS.ginger}>Ginger</Colored> Lemonade <Price>$7</Price>
            </Item>
            <div
              className={`${styles.productPhotoSlot} ${styles.lemonadeCluster}`}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto62}`}
                src="/images/menu/tv-native/drinks/01-strawberry-lemonade-cutout.png"
                alt="Strawberry Lemonade"
              />
              <span className={`${styles.photoCaption} ${styles.photoCaption62}`}>62</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto65}`}
                src="/images/menu/tv-native/drinks/04-purple-lemonade-cutout.png"
                alt="Purple Lemonade"
              />
              <span className={`${styles.photoCaption} ${styles.photoCaption65}`}>65</span>
            </div>
          </Section>
        </div>

        <div className={`${styles.menuColumn} ${styles.rightCol2}`}>
          <Section
            title={
              <>
                Blended Drinks <Emoji>🥭</Emoji>
                <Emoji>🥥</Emoji>
                <Emoji>❄️</Emoji>
              </>
            }
            semanticClassName="section-blended-drinks"
            debugLabel="Blended Drinks section"
            className={styles.blended}
          >
            <Item code="71" description="½ lb. organic mango">
              🥭 Golden Mango 🌙 <Price>$8</Price>
            </Item>
            <Item code="72" description="½ lb. organic mango, jasmine or magnolia tea">
              🥭 Jasmine / Magnolia Mango ☁️ <Price>$8</Price>
            </Item>
            <Item code="73" description="½ lb. organic mango, organic coconut milk">
              🥭 Coco Mango <Price>$8</Price>
            </Item>
            <Item code="74" description="Golden Mango with chamoy and Tajín">
              🥭 Mangonada <Price>$8</Price>
            </Item>
            <Item
              code="75"
              description="organic mango, jasmine tea, organic coconut milk, grapefruit pulp and crystal boba"
            >
              🥭 Mango Grapefruit Crystal 🌙 <Price>$8.5</Price>
            </Item>
            <Item
              code="76"
              description={<>icy and refreshing, made with real fruit purée</>}
              className={styles.noWrapItem}
            >
              🦖 Dino Freeze (Build Your Own) 🌙 <Price>$6.5</Price>
            </Item>
            <div className={`${styles.builderCopy} ${styles.builderOptions}`}>
              <b>Choose up to 2 fruits:</b>{' '}
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.mango}>Mango</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.passionfruit}>Passionfruit</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.peach}>Peach</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.raspberry}>Raspberry</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.pineapple}>Pineapple</Colored>
            </div>
            <div
              className={`${styles.productPhotoSlot} ${styles.blendedCluster}`}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto71}`}
                src="/images/menu/tv-native/drinks/05-golden-mango-blended-drink-cutout.png"
                alt="Golden Mango blended drink"
              />
              <span className={`${styles.photoCaption} ${styles.photoCaption71}`}>71</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto75}`}
                src="/images/menu/tv-native/drinks/08-mango-grapefruit-crystal-blended-drink-cutout.png"
                alt="Mango Grapefruit Crystal blended drink"
              />
              <span className={`${styles.photoCaption} ${styles.photoCaption75}`}>75</span>
            </div>
          </Section>

          <Section
            title={
              <>
                Coffee Drinks <Emoji>☕</Emoji>
              </>
            }
            tone="orange"
            semanticClassName="section-coffee-drinks"
            debugLabel="Coffee Drinks section"
            className={styles.coffee}
          >
            <Item code="81">
              <Colored color="#4f2f20">Vietnamese Iced Coffee</Colored> ❄️ ☁️ <Price>$6.75</Price>
            </Item>
            <Item code="82">
              <span>
                <Colored color={CREAM_COLORS.brulee}>Crème Brûlée</Colored>
                <br />
                Vietnamese Iced Coffee ❄️ <Price>$8</Price>
              </span>
            </Item>
            <Item code="83">
              <span>
                <Colored color={CREAM_COLORS.pistachio}>Pistachio Cream</Colored>
                <br />
                Vietnamese Iced Coffee ❄️ <Price>$8</Price>
              </span>
            </Item>
            <Item code="84">
              <span>
                🦖 <Colored color="#305d32">Dino Fuel</Colored>
                <br />
                (Vietnamese Coffee x Thai Tea) <Price>$8</Price>
              </span>
            </Item>
            <Item code="85">
              <Colored color="#744b2a">Dirty Horchata de Avena</Colored> ❄️ <Price>$8</Price>
            </Item>
            <Item code="86">
              <Colored color="#502d1d">Vietnamese Mocha</Colored> (Iced or Hot) <Price>$8</Price>
            </Item>
            <div
              className={`${styles.productPhotoSlot} ${styles.coffeeCluster}`}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto82}`}
                src="/images/menu/tv-native/drinks/09-cr-me-br-l-e-vietnamese-iced-coffee-cutout.png"
                alt="Crème Brûlée Vietnamese Iced Coffee"
              />
              <span className={`${styles.photoCaption} ${styles.photoCaption82}`}>82</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto84}`}
                src="/images/menu/tv-native/drinks/11-dino-fuel-vietnamese-coffee-and-thai-tea-cutout.png"
                alt="Dino Fuel Vietnamese Coffee and Thai Tea"
              />
              <span className={`${styles.photoCaption} ${styles.photoCaption84}`}>84</span>
            </div>
          </Section>
        </div>

        <div className={`${styles.menuColumn} ${styles.rightCol3}`}>
          <Section
            title={
              <>
                Hot Drinks <Emoji>🔥</Emoji>
              </>
            }
            tone="orange"
            semanticClassName="section-hot-drinks"
            debugLabel="Hot Drinks section"
            className={styles.hotDrinks}
          >
            <Item code="91">
              Hazelnut Hot Chocolate 🌙 <Price>$6</Price>
            </Item>
            <Item code="92">
              Jasmine Hot Chocolate <Price>$7</Price>
            </Item>
            <Item code="93">
              Masala Chai Hot Chocolate <Price>$8</Price>
            </Item>
            <Item code="94">
              Hot Honey Yuzu Tea 🌙 <Price>$5</Price>
            </Item>
            <Item code="95">
              Hot Ginger Honey Yuzu Tea 🌙 <Price>$6</Price>
            </Item>
          </Section>

          <Section
            title={
              <>
                Hawaiian Hand-Shaved Ice <Emoji>🍧</Emoji>
              </>
            }
            semanticClassName="section-hawaiian-shaved-ice"
            debugLabel="Hawaiian Shaved Ice section"
            className={styles.shavedIce}
          >
            <Item
              code="H1"
              description={
                <>
                  Fresh strawberries, all-natural strawberry puree, condensed
                  <br />
                  milk
                </>
              }
            >
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> Shaved Ice{' '}
              <Price>$8</Price>
            </Item>
            <Item code="H2">
              Build Your Own Shaved Ice <Price>$8</Price>
            </Item>
            <div className={`${styles.builderCopy} ${styles.builderOptions}`}>
              <b>Choose a base flavor:</b>
              <br />
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.mango}>Mango</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.passionfruit}>Passionfruit</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.peach}>Peach</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.raspberry}>Raspberry</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.pineapple}>Pineapple</Colored>
              <br />
              <b>Add toppings (choose up to 3):</b>
              <br />
              <Colored color={FRUIT_COLORS.strawberry}>Fresh Strawberries</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.mango}>Diced Mango</Colored> · Grapefruit Pulp ·{' '}
              <Colored color={TOPPING_COLORS.taro}>Taro</Colored>
              <br />
              <b>Popping Boba:</b> <Colored color={FRUIT_COLORS.mango}>Mango</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored>
              <br />
              <b>Jelly:</b> <Colored color={FRUIT_COLORS.mango}>Mango Star</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry Heart</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored>
              <br />
              <b>Agar Boba:</b> <Colored color={TOPPING_COLORS.crystal}>Crystal</Colored> ·{' '}
              <Colored color={TOPPING_COLORS.brownSugar}>Brown Sugar</Colored>
              <br />
              <em>Optional condensed milk drizzle</em>
            </div>
          </Section>
        </div>
      </main>
      <ShowcasePreview />
      {debugRegions && <RegionOverlay boardRef={boardRef} />}
    </div>
  );
}

export function TVMenuBoard({ side }: { side: MenuSide }) {
  useTvRefresh();
  const debugRegions = useDebugRegions();
  const showCursor = useShowCursor();
  const tvScale = useTvScale();

  const pageTitle = `Menu Display - ${side === 'left' ? 'Left' : 'Right'}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div
        className={`${tvMenu.variable} ${styles.viewport} ${showCursor ? styles.showCursor : ''}`}
        style={{ '--tv-scale': tvScale } as CSSProperties}
      >
        {side === 'left' ? (
          <LeftMenu debugRegions={debugRegions} />
        ) : (
          <RightMenu debugRegions={debugRegions} />
        )}
      </div>
    </>
  );
}
