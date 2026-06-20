import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import Head from 'next/head';

import styles from '@/styles/TVMenuBoard.module.css';

const RELOAD_INTERVAL_MILLIS = 30 * 60 * 1000;

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
};

type RegionDef = {
  id: number;
  label: string;
  color: string;
  style: CSSProperties;
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

function useDebugRegions() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('debugRegions') ?? params.get('regions') ?? '';
    setEnabled(['1', 'true', 'yes'].includes(value.toLowerCase()));
  }, []);

  return enabled;
}

function useShowCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const override = params.get('debug') ?? params.get('showCursor') ?? params.get('cursor');

    if (override) {
      setEnabled(['1', 'true', 'yes'].includes(override.toLowerCase()));
      return;
    }

    const hostname = window.location.hostname.toLowerCase();
    setEnabled(hostname !== 'tearekz.cafe' && hostname !== 'www.tearekz.cafe');
  }, []);

  return enabled;
}

function RegionOverlay({ regions }: { regions: RegionDef[] }) {
  return (
    <div className={styles.regionOverlay} aria-hidden="true">
      {regions.map((region) => (
        <div
          key={region.id}
          className={styles.regionBox}
          style={{ ...region.style, borderColor: region.color, color: region.color }}
        >
          <span className={styles.regionLabel} style={{ backgroundColor: region.color }}>
            {region.id}. {region.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const LEFT_REGIONS: RegionDef[] = [
  {
    id: 1,
    label: 'Logo',
    color: '#e53935',
    style: { left: '0.2cqw', top: '0.1cqh', width: '7.1cqw', height: '11.5cqh' },
  },
  {
    id: 2,
    label: 'Legend',
    color: '#8e24aa',
    style: { left: '7.6cqw', top: '0.4cqh', width: '19.2cqw', height: '9.5cqh' },
  },
  {
    id: 3,
    label: 'Options',
    color: '#1e88e5',
    style: { left: '23.6cqw', top: '0.35cqh', width: '75.0cqw', height: '8.4cqh' },
  },
  {
    id: 4,
    label: 'Col 1 — Signatures',
    color: '#43a047',
    style: { left: '0.48cqw', top: '13.45cqh', width: '24.35cqw', height: '81.8cqh' },
  },
  {
    id: 5,
    label: 'Col 2 — Milk Teas',
    color: '#fb8c00',
    style: { left: '25.85cqw', top: '13.45cqh', width: '20.85cqw', height: '38.0cqh' },
  },
  {
    id: 6,
    label: 'Col 2 — Pure Teas',
    color: '#fb8c00',
    style: { left: '25.85cqw', top: '56.05cqh', width: '20.85cqw', height: '34.6cqh' },
  },
  {
    id: 7,
    label: 'Col 3 — Milk Drinks',
    color: '#7cb342',
    style: { left: '47.72cqw', top: '13.45cqh', width: '22.25cqw', height: '39.3cqh' },
  },
  {
    id: 8,
    label: 'Col 3 — Matcha',
    color: '#7cb342',
    style: { left: '47.72cqw', top: '54.5cqh', width: '22.25cqw', height: '38.0cqh' },
  },
  {
    id: 9,
    label: 'Col 4 — Cream Tops',
    color: '#6d4c41',
    style: { left: '70.05cqw', top: '13.45cqh', width: '28.9cqw', height: '37.1cqh' },
  },
  {
    id: 10,
    label: 'Col 4 — Toppings',
    color: '#d81b60',
    style: { left: '70.05cqw', top: '51.75cqh', width: '28.9cqw', height: '43.4cqh' },
  },
  {
    id: 11,
    label: 'Showcase',
    color: '#f6a000',
    style: { left: '84.1cqw', top: '80.8cqh', width: '15.7cqw', height: '18.25cqh' },
  },
];

const RIGHT_REGIONS: RegionDef[] = [
  {
    id: 1,
    label: 'Col 1 — Fruit Teas',
    color: '#43a047',
    style: { left: '0.85cqw', top: '1.05cqh', width: '31.6cqw', height: '48.3cqh' },
  },
  {
    id: 2,
    label: 'Col 1 — Smash Lemonades',
    color: '#43a047',
    style: { left: '0.85cqw', top: '50.7cqh', width: '31.6cqw', height: '45.5cqh' },
  },
  {
    id: 3,
    label: 'Col 2 — Blended Drinks',
    color: '#fb8c00',
    style: { left: '33.6cqw', top: '1.05cqh', width: '34.7cqw', height: '51.9cqh' },
  },
  {
    id: 4,
    label: 'Col 2 — Coffee Drinks',
    color: '#fb8c00',
    style: { left: '33.6cqw', top: '54.3cqh', width: '34.7cqw', height: '42.5cqh' },
  },
  {
    id: 5,
    label: 'Col 3 — Hot Drinks',
    color: '#1e88e5',
    style: { left: '69.45cqw', top: '1.05cqh', width: '29.5cqw', height: '27.7cqh' },
  },
  {
    id: 6,
    label: 'Col 3 — Extras',
    color: '#1e88e5',
    style: { left: '69.45cqw', top: '30.1cqh', width: '29.5cqw', height: '15.9cqh' },
  },
  {
    id: 7,
    label: 'Col 3 — Hawaiian Shaved Ice',
    color: '#1e88e5',
    style: { left: '69.45cqw', top: '47.4cqh', width: '29.5cqw', height: '47.2cqh' },
  },
];

function Section({
  title,
  tone = 'green',
  children,
  className = '',
  semanticClassName = '',
  subhead,
}: SectionProps) {
  return (
    <section className={`${styles.section} ${semanticClassName} ${className}`.trim()}>
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
} as const;

const SHOWCASE_IMAGES = [
  {
    name: 'Golden Mango',
    alt: 'Golden Mango blended drink preview',
    src: '/images/menu/tv-native/drinks/05-golden-mango-blended-drink-cutout.png',
  },
  {
    name: 'Tiger Milk',
    alt: 'Tiger Milk with Boba preview',
    src: '/images/menu/tv-native/drinks/41-tiger-milk-with-boba-cutout.png',
  },
  {
    name: 'Coco Mango',
    alt: 'Coco Mango blended drink preview',
    src: '/images/menu/tv-native/drinks/07-coco-mango-blended-drink-cutout.png',
  },
  {
    name: 'Strawberry Milk',
    alt: 'Strawberry Milk preview',
    src: '/images/menu/tv-native/drinks/44-strawberry-milk-cutout.png',
  },
  {
    name: 'Dino Fuel',
    alt: 'Dino Fuel coffee drink preview',
    src: '/images/menu/tv-native/drinks/11-dino-fuel-vietnamese-coffee-and-thai-tea-cutout.png',
  },
  {
    name: 'Vietnamese Iced Coffee',
    alt: 'Vietnamese Iced Coffee preview',
    src: '/images/menu/tv-native/drinks/81-vietnamese-iced-coffee-cutout.png',
  },
];

function Emoji({ children }: { children: ReactNode }) {
  return (
    <span className={styles.emoji} aria-hidden="true">
      {children}
    </span>
  );
}

function ShowcasePreview() {
  return (
    <div className={`${styles.showcaseWidget} showcase-slideshow-widget`} aria-hidden="true">
      {SHOWCASE_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={styles.showcaseSlide}
          style={{ '--showcase-index': index } as CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className={styles.showcaseImage} />
          <div className={styles.showcaseName}>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

function LeftMenu({ debugRegions = false }: { debugRegions?: boolean }) {
  return (
    <div className={`${styles.board} ${styles.leftBoard}`}>
      <header className={styles.leftTopBar}>
        <div className={styles.logoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/menu/tv-native/tearekz-logo-cropped.png" alt="Tea-Rek'z" />
        </div>
        <div className={styles.legend}>
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
        <div className={`${styles.options} ${styles.drinkOptions} drink-options`}>
          <div className={`${styles.optionGroup} ${styles.sweetenerOptions}`}>
            <div className={styles.optionRow}>
              <span className={styles.optionLabel}>Sweetness Options:</span> 100% · 75% · 50% · 25%
              · 10% · 0%{' '}
              <span className={styles.optionExplainer}>
                (Some drinks contain built-in cane sugar)
              </span>
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
              <span className={styles.optionLabel}>Additional Boosts (+$1):</span> Whey Protein 💪 ·
              Pea Protein 🫛 · Creatine ⚡
            </div>
          </div>
        </div>
      </header>

      <ShowcasePreview />

      <main className={styles.leftGrid}>
        <div className={`${styles.menuColumn} ${styles.leftCol1}`}>
          <Section
            title={
              <>
                <Emoji>🦖</Emoji> Tea-Rek&apos;z Signatures <Emoji>❄️</Emoji>
              </>
            }
            semanticClassName="section-signatures"
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
              <span>
                Crème Brûlée
                <br />
                Classic Thai Tea ❄️ <Price>$8</Price>
              </span>
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
            <Item code="43" description="real taro & ube, no artificial flavor or color">
              Ube Taro Milk 🌙 <Price>$7.5</Price>
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
              <Colored color="#7760a8">Taro</Colored> Matcha Latte <Price>$8.5</Price>
            </Item>
          </Section>
        </div>

        <aside className={`${styles.menuColumn} ${styles.leftAside}`}>
          <div className={`${styles.box} cream-tops-section ${styles.creamBox}`}>
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

          <div className={`${styles.box} toppings-section ${styles.toppingBox}`}>
            <div className={`${styles.boxTitle} ${styles.toppingTitle}`}>
              <Emoji>✨</Emoji> Toppings $.75 each
            </div>
            <div className={styles.boxBody}>
              <p>⚫ Boba (Tapioca Pearls)</p>
              <p>
                🔴 Popping Boba: <Colored color={FRUIT_COLORS.mango}>Mango</Colored> ·{' '}
                <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> ·{' '}
                <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored>
              </p>
              <p>
                ⭐ Jelly: <Colored color={FRUIT_COLORS.mango}>Mango Star</Colored> ·{' '}
                <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored>
              </p>
              <p>
                🟤 Agar Boba: <Colored color={TOPPING_COLORS.crystal}>Crystal</Colored> ·{' '}
                <Colored color={TOPPING_COLORS.brownSugar}>Brown Sugar</Colored>
              </p>
              <p>🍉 Grapefruit Pulp</p>
              <p>🟨 Diced Mango</p>
            </div>
          </div>
        </aside>
      </main>
      {debugRegions && <RegionOverlay regions={LEFT_REGIONS} />}
    </div>
  );
}

function RightMenu({ debugRegions = false }: { debugRegions?: boolean }) {
  return (
    <div className={`${styles.board} ${styles.rightBoard}`}>
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
                Extras <Emoji>❄️</Emoji>
              </>
            }
            semanticClassName="section-extras"
            className={styles.extras}
          >
            <Item code="98">
              Fresh Squeezed Orange Juice 🌙 <Price>$8</Price>
            </Item>
            <Item code="99">
              🍨 Boba Sundae 🌙 <Price>$6</Price>
            </Item>
          </Section>

          <Section
            title={
              <>
                Hawaiian Hand-Shaved Ice <Emoji>🍧</Emoji>
              </>
            }
            semanticClassName="section-hawaiian-shaved-ice"
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
              <Colored color={FRUIT_COLORS.mango}>Diced Mango</Colored> · Grapefruit Pulp
              <br />
              <b>Popping Boba:</b> <Colored color={FRUIT_COLORS.mango}>Mango</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.strawberry}>Strawberry</Colored> ·{' '}
              <Colored color={FRUIT_COLORS.lychee}>Lychee</Colored>
              <br />
              <b>Jelly:</b> <Colored color={FRUIT_COLORS.mango}>Mango Star</Colored> ·{' '}
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
      {debugRegions && <RegionOverlay regions={RIGHT_REGIONS} />}
    </div>
  );
}

export function TVMenuBoard({ side }: { side: MenuSide }) {
  useTvRefresh();
  const debugRegions = useDebugRegions();
  const showCursor = useShowCursor();

  const pageTitle = `Menu Display - ${side === 'left' ? 'Left' : 'Right'}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className={`${styles.viewport} ${showCursor ? styles.showCursor : ''}`}>
        {side === 'left' ? (
          <LeftMenu debugRegions={debugRegions} />
        ) : (
          <RightMenu debugRegions={debugRegions} />
        )}
      </div>
    </>
  );
}
