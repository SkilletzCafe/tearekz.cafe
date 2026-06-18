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
    label: 'Sweetness / ice / milk options',
    color: '#1e88e5',
    style: { left: '27.5cqw', top: '0.35cqh', width: '70.3cqw', height: '8.4cqh' },
  },
  {
    id: 4,
    label: 'Signatures',
    color: '#43a047',
    style: { left: '0.48cqw', top: '13.45cqh', width: '24.35cqw', height: '81.8cqh' },
  },
  {
    id: 5,
    label: 'Milk Teas',
    color: '#fb8c00',
    style: { left: '25.85cqw', top: '13.45cqh', width: '20.85cqw', height: '34.4cqh' },
  },
  {
    id: 6,
    label: 'Pure Teas',
    color: '#00acc1',
    style: { left: '25.85cqw', top: '57.6cqh', width: '20.85cqw', height: '33.0cqh' },
  },
  {
    id: 7,
    label: 'Fruit Teas',
    color: '#7cb342',
    style: { left: '47.72cqw', top: '13.45cqh', width: '22.25cqw', height: '39.3cqh' },
  },
  {
    id: 8,
    label: 'Matcha / Chocolate',
    color: '#3949ab',
    style: { left: '47.72cqw', top: '62.0cqh', width: '22.25cqw', height: '30.4cqh' },
  },
  {
    id: 9,
    label: 'Cream Tops box',
    color: '#6d4c41',
    style: { left: '70.95cqw', top: '13.45cqh', width: '28.0cqw', height: '44.8cqh' },
  },
  {
    id: 10,
    label: 'Toppings box',
    color: '#d81b60',
    style: { left: '70.95cqw', top: '62.8cqh', width: '28.0cqw', height: '34.9cqh' },
  },
];

const RIGHT_REGIONS: RegionDef[] = [
  {
    id: 1,
    label: 'Fruit Teas',
    color: '#43a047',
    style: { left: '0.85cqw', top: '1.05cqh', width: '31.6cqw', height: '48.3cqh' },
  },
  {
    id: 2,
    label: 'Smash Lemonades',
    color: '#e53935',
    style: { left: '0.85cqw', top: '50.7cqh', width: '31.6cqw', height: '45.5cqh' },
  },
  {
    id: 3,
    label: 'Lemonade photo pair',
    color: '#c2185b',
    style: { left: '21.2cqw', top: '62.9cqh', width: '11.2cqw', height: '22.0cqh' },
  },
  {
    id: 4,
    label: 'Blended Drinks',
    color: '#fb8c00',
    style: { left: '33.6cqw', top: '1.05cqh', width: '34.7cqw', height: '51.9cqh' },
  },
  {
    id: 5,
    label: 'Blended photo pair',
    color: '#8e24aa',
    style: { left: '55.0cqw', top: '10.2cqh', width: '13.2cqw', height: '22.0cqh' },
  },
  {
    id: 6,
    label: 'Coffee Drinks',
    color: '#6d4c41',
    style: { left: '33.6cqw', top: '54.3cqh', width: '34.7cqw', height: '42.5cqh' },
  },
  {
    id: 7,
    label: 'Coffee photo pair',
    color: '#3949ab',
    style: { left: '55.8cqw', top: '65.0cqh', width: '12.4cqw', height: '19.8cqh' },
  },
  {
    id: 8,
    label: 'Hot Drinks',
    color: '#1e88e5',
    style: { left: '69.45cqw', top: '1.05cqh', width: '29.5cqw', height: '27.7cqh' },
  },
  {
    id: 9,
    label: 'Extras',
    color: '#00acc1',
    style: { left: '69.45cqw', top: '30.1cqh', width: '29.5cqw', height: '15.9cqh' },
  },
  {
    id: 10,
    label: 'Hawaiian Shaved Ice',
    color: '#7cb342',
    style: { left: '69.45cqw', top: '47.4cqh', width: '29.5cqw', height: '47.2cqh' },
  },
];

function Section({ title, tone = 'green', children, className = '', subhead }: SectionProps) {
  return (
    <section className={`${styles.section} ${className}`}>
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
        <span>{children}</span>
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

function Price({ children }: { children: ReactNode }) {
  return <span className={styles.price}>{children}</span>;
}

function Emoji({ children }: { children: ReactNode }) {
  return (
    <span className={styles.emoji} aria-hidden="true">
      {children}
    </span>
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
          <div>
            <span className={`${styles.legendIcon} ${styles.iceIcon}`}>❄️</span> Iced only
          </div>
          <div>
            <span className={`${styles.legendIcon} ${styles.moonIcon}`}>🌙</span> Caffeine-free
          </div>
          <div>
            <span className={`${styles.legendIcon} ${styles.cloudIcon}`}>☁️</span> Pairs well with
            Cream Tops
          </div>
        </div>
        <div className={styles.options}>
          <div>
            <b>Sweetness Options:</b> 100% · 75% · 50% · 25% · 10% · 0%{' '}
            <span>(Some drinks contain built-in cane sugar)</span>
          </div>
          <div>Sugar-free sweetener (Allulose & Monk Fruit) available for most drinks (+$0.5)</div>
          <div>
            <b>Ice Options:</b> 100% · 50% · 0% <b className={styles.milkOptions}>Milk Options:</b>{' '}
            Dairy · Oat (+$0.75)
          </div>
        </div>
      </header>

      <main className={styles.leftGrid}>
        <Section
          title={
            <>
              <Emoji>🦖</Emoji> Tea-Rek&apos;z Signatures <Emoji>❄️</Emoji>
            </>
          }
          className={styles.signatures}
        >
          <Item code="S1" description="Magnolia Green Tea with Jasmine Cream">
            Magnolia Cloud <Price>$7.5</Price>
          </Item>
          <Item code="S2" description="Magnolia Green Tea with Sea Salt Cheese Cream">
            Magnolia Velvet <Price>$7.5</Price>
          </Item>
          <Item code="S3" description="Magnolia Green Tea with Matcha Cream">
            Magnolia Matcha Cloud <Price>$8</Price>
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
            Magnolia Orchard <Price>$8</Price>
          </Item>
          <Item code="S5" description="Lychee Jasmine Green Tea with Jasmine Cream">
            Lychee Blossom <Price>$8</Price>
          </Item>
          <Item code="S6" description="Vietnamese Iced Coffee with Pistachio Cream">
            Pistachio Cream Coffee <Price>$8</Price>
          </Item>
          <Item code="S7" description="Matcha Latte with Raspberry Cream">
            Matcha Blossom <Price>$8</Price>
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
            Strawberry Pop Milk 🌙 <Price>$7.5</Price>
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
            Mango Pop Milk 🌙 <Price>$7.5</Price>
          </Item>
        </Section>

        <div className={styles.leftMiddleA}>
          <Section
            title={
              <>
                <Emoji>🧋</Emoji> Milk Teas
              </>
            }
            tone="orange"
            className={styles.compactSection}
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
            className={styles.pureTeas}
          >
            <Item code="1">
              Jasmine Green ☁️ <Price>$5.75</Price>
            </Item>
            <Item code="2">
              Magnolia Green ❄️ ☁️ <Price>$6</Price>
            </Item>
            <Item code="3">
              Lychee Black <Price>$5.75</Price>
            </Item>
            <Item code="4">
              White Peach Oolong <Price>$6</Price> ☁️
            </Item>
            <Item code="5">
              Rooibos 🌙 <Price>$5.75</Price>
            </Item>
          </Section>
        </div>

        <div className={styles.leftMiddleB}>
          <Section
            title={
              <>
                <Emoji>🥛</Emoji> Milk Drinks <Emoji>🌙</Emoji>
              </>
            }
            tone="orange"
            className={styles.compactSection}
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
            className={styles.matcha}
          >
            <Item code="31">
              Matcha Latte ☁️ <Price>$7</Price>
            </Item>
            <Item code="32">
              Brown Sugar Matcha Latte ☁️ <Price>$7.25</Price>
            </Item>
            <Item code="33">
              <Colored color="#c43c37">Strawberry</Colored> Matcha Latte <Price>$8</Price>
            </Item>
            <Item code="34">
              <Colored color="#bb841a">Mango</Colored> Matcha Latte <Price>$8</Price>
            </Item>
            <Item code="35">
              <Colored color="#7760a8">Taro</Colored> Matcha Latte <Price>$8.5</Price>
            </Item>
            <Item code="36" description="Matcha latte with honeycomb toffee">
              Dalgona Matcha Latte <Price>$7.5</Price>
            </Item>
          </Section>
        </div>

        <aside className={styles.leftAside}>
          <div className={`${styles.box} ${styles.creamBox}`}>
            <div className={`${styles.boxTitle} ${styles.creamTitle}`}>
              <Emoji>☁️</Emoji> Cream Tops
            </div>
            <div className={styles.boxBody}>
              <p className={styles.boxNote}>(Made with Real Cream • Contains Dairy)</p>
              <p>
                <Colored color="#a7771b">Crème Brûlée</Colored> (on cold drinks only){' '}
                <Price>$1.5</Price>
              </p>
              <p>
                <Colored color="#5a8fba">Vanilla Ice Cream Float</Colored> (on cold drinks only){' '}
                <Price>$2</Price>
              </p>
              <p>
                <Colored color="#4b9f4d">Jasmine Cream</Colored> (Whipped) <Price>$1.5</Price>
              </p>
              <p>
                <Colored color="#7f9d22">Matcha Cream</Colored> <Price>$2</Price>
              </p>
              <p>
                <Colored color="#77711f">Pistachio Cream</Colored> <Price>$2</Price>
              </p>
              <p>
                <Colored color="#b63249">Raspberry Cream</Colored> <Price>$1.5</Price>
              </p>
              <p>
                <Colored color="#b77a3d">Sea Salt Cheese Cream</Colored> <Price>$1.5</Price>
              </p>
            </div>
          </div>

          <div className={`${styles.box} ${styles.toppingBox}`}>
            <div className={`${styles.boxTitle} ${styles.toppingTitle}`}>
              <Emoji>✨</Emoji> Toppings $.75 each
            </div>
            <div className={styles.boxBody}>
              <p>⚫ Boba (Tapioca Pearls)</p>
              <p>
                🔴 Popping Boba: <Colored color="#d28a17">Mango</Colored> |{' '}
                <Colored color="#c43c37">Strawberry</Colored> |{' '}
                <Colored color="#7c1f1f">Lychee</Colored>
              </p>
              <p>
                ⭐ Jelly: <Colored color="#d28a17">Mango Star</Colored> |{' '}
                <Colored color="#c43c37">Strawberry Heart</Colored> |{' '}
                <Colored color="#7c1f1f">Lychee</Colored>
              </p>
              <p>
                🟤 Agar Boba: <Colored color="#9e9e9e">Crystal</Colored> |{' '}
                <Colored color="#7a4b21">Brown Sugar</Colored>
              </p>
              <p>
                🍯 <Colored color="#a9771c">Dalgona</Colored> (Honeycomb Toffee)
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
        <div>
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
            className={styles.fruitTeas}
          >
            <Item code="51">
              Lychee Jasmine Green ☁️ <Price>$6.75</Price>
            </Item>
            <Item code="52">
              <Colored color="#c43c37">Strawberry</Colored> <Colored color="#c58aa8">Peach</Colored>{' '}
              Jade Oolong ☁️ <Price>$6.75</Price>
            </Item>
            <Item code="53">
              <Colored color="#d28a17">Mango</Colored>{' '}
              <Colored color="#7b3f98">Passionfruit</Colored> Jasmine Green <Price>$6.75</Price>
            </Item>
            <Item code="54">
              <Colored color="#c58aa8">Peach</Colored> <Colored color="#7c1f1f">Lychee</Colored>{' '}
              Magnolia Green ❄️ ☁️ <Price>$7</Price>
            </Item>
            <Item code="55">
              Build Your Own Fruit Tea <Price>$6.75</Price>
            </Item>
            <div className={styles.builderCopy}>
              <b>Choose a tea:</b>
              <br />
              <Colored color="#3e7a3b">Jasmine Green</Colored> |{' '}
              <Colored color="#3e7a3b">Magnolia Green</Colored> | Four Seasons Oolong
              <br />
              <b>Choose up to 2 fruits:</b>
              <br />
              <Colored color="#c43c37">Strawberry</Colored> |{' '}
              <Colored color="#d28a17">Mango</Colored> |{' '}
              <Colored color="#7b3f98">Passionfruit</Colored> |{' '}
              <Colored color="#c58aa8">Peach</Colored> | <Colored color="#7c1f1f">Lychee</Colored>
              <br />
              <Colored color="#b71c1c">Raspberry</Colored> |{' '}
              <Colored color="#5d8a2a">Pineapple</Colored>
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
            className={styles.lemonades}
          >
            <Item code="61">
              Lemonade <Price>$6</Price>
            </Item>
            <Item code="62">
              <Colored color="#c43c37">Strawberry</Colored> Lemonade <Price>$7</Price>
            </Item>
            <Item code="63">
              <Colored color="#d28a17">Mango</Colored> Lemonade <Price>$7</Price>
            </Item>
            <Item code="64">
              <Colored color="#7b3f98">Passionfruit</Colored> Lemonade <Price>$7</Price>
            </Item>
            <Item code="65" description="Butterfly pea–infused lemonade with passionfruit">
              <Colored color="#7b3f98">Purple</Colored> Lemonade <Price>$7.5</Price>
            </Item>
            <Item code="66">
              Rose Hibiscus Lemonade <Price>$7</Price>
            </Item>
            <Item code="67">
              Ginger Lemonade <Price>$7</Price>
            </Item>
            <div
              className={`${styles.productPhotoGroup} ${styles.lemonadeCluster}`}
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

        <div>
          <Section
            title={
              <>
                Blended Drinks <Emoji>🥭</Emoji>
                <Emoji>🥥</Emoji>
                <Emoji>❄️</Emoji>
              </>
            }
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
            <Item
              code="74"
              description={
                <>
                  organic mango, jasmine tea, organic coconut milk, grapefruit
                  <br />
                  pulp and crystal boba
                </>
              }
            >
              🥭 Mango Grapefruit Crystal 🌙 <Price>$8.5</Price>
            </Item>
            <Item code="75" description={<>icy and refreshing, made with real fruit purée</>}>
              🦕 Dino Freeze (Build Your Own) 🌙 <Price>$6.5</Price>
            </Item>
            <div className={styles.builderCopy}>
              <b>Choose up to 2 fruits:</b>
              <br />
              <Colored color="#c43c37">Strawberry</Colored> |{' '}
              <Colored color="#d28a17">Mango</Colored> |{' '}
              <Colored color="#7b3f98">Passionfruit</Colored> |{' '}
              <Colored color="#c58aa8">Peach</Colored> | <Colored color="#7c1f1f">Lychee</Colored>
              <br />
              <Colored color="#b71c1c">Raspberry</Colored> |{' '}
              <Colored color="#5d8a2a">Pineapple</Colored>
            </div>
            <div
              className={`${styles.productPhotoGroup} ${styles.blendedCluster}`}
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
                className={`${styles.productPhoto} ${styles.productPhoto74}`}
                src="/images/menu/tv-native/drinks/08-mango-grapefruit-crystal-blended-drink-cutout.png"
                alt="Mango Grapefruit Crystal blended drink"
              />
              <span className={`${styles.photoCaption} ${styles.photoCaption74}`}>74</span>
            </div>
          </Section>

          <Section
            title={
              <>
                Coffee Drinks <Emoji>☕</Emoji>
              </>
            }
            tone="orange"
            className={styles.coffee}
          >
            <Item code="81">
              Vietnamese Iced Coffee ❄️ ☁️ <Price>$6.75</Price>
            </Item>
            <Item code="82">
              <span>
                Crème Brûlée
                <br />
                Vietnamese Iced Coffee ❄️ <Price>$8</Price>
              </span>
            </Item>
            <Item code="83">
              <span>
                Pistachio Cream
                <br />
                Vietnamese Iced Coffee ❄️ <Price>$8</Price>
              </span>
            </Item>
            <Item code="84">
              <span>
                🦕 Dino Fuel
                <br />
                (Vietnamese Coffee x Thai Tea) <Price>$8</Price>
              </span>
            </Item>
            <Item code="85">
              Dirty Horchata de Avena ❄️ <Price>$8</Price>
            </Item>
            <Item code="86">
              Vietnamese Mocha (Iced or Hot) <Price>$8</Price>
            </Item>
            <div
              className={`${styles.productPhotoGroup} ${styles.coffeeCluster}`}
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

        <div>
          <Section
            title={
              <>
                Hot Drinks <Emoji>🔥</Emoji>
              </>
            }
            tone="orange"
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
              <Colored color="#c43c37">Strawberry</Colored> Shaved Ice <Price>$8</Price>
            </Item>
            <Item code="H2">
              Build Your Own Shaved Ice <Price>$8</Price>
            </Item>
            <div className={`${styles.builderCopy} ${styles.shavedIceBuilder}`}>
              <b>Choose a base flavor:</b>
              <br />
              <Colored color="#c43c37">Strawberry</Colored> |{' '}
              <Colored color="#d28a17">Mango</Colored> |{' '}
              <Colored color="#7b3f98">Passionfruit</Colored> |{' '}
              <Colored color="#c58aa8">Peach</Colored> | <Colored color="#7c1f1f">Lychee</Colored> |{' '}
              <Colored color="#b71c1c">Raspberry</Colored> |{' '}
              <Colored color="#5d8a2a">Pineapple</Colored>
              <br />
              <br />
              <b>Add toppings (choose up to 3):</b>
              <br />
              <Colored color="#c43c37">Fresh Strawberries</Colored> •{' '}
              <Colored color="#d28a17">Diced Mango</Colored> • Grapefruit Pulp
              <br />
              <b>Popping Boba:</b> <Colored color="#d28a17">Mango</Colored> |{' '}
              <Colored color="#c43c37">Strawberry</Colored> |{' '}
              <Colored color="#7c1f1f">Lychee</Colored>
              <br />
              <b>Jelly:</b> <Colored color="#d28a17">Mango Star</Colored> |{' '}
              <Colored color="#c43c37">Strawberry Heart</Colored> |{' '}
              <Colored color="#7c1f1f">Lychee</Colored>
              <br />
              <b>Agar Boba:</b> Crystal | <Colored color="#7a4b21">Brown Sugar</Colored>
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

  const pageTitle = `Menu Display - ${side === 'left' ? 'Left' : 'Right'}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className={styles.viewport}>
        {side === 'left' ? (
          <LeftMenu debugRegions={debugRegions} />
        ) : (
          <RightMenu debugRegions={debugRegions} />
        )}
      </div>
    </>
  );
}
