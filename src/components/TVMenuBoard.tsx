import { ReactNode, useEffect } from 'react';

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

function LeftMenu() {
  return (
    <div className={`${styles.board} ${styles.leftBoard}`}>
      <header className={styles.leftTopBar}>
        <div className={styles.logoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/menu/tv-native/tearekz-logo-cropped.png" alt="Tea-Rek'z" />
        </div>
        <div className={styles.legend}>
          <div>
            <span className={`${styles.legendIcon} ${styles.iceIcon}`}>❄</span> Iced only
          </div>
          <div>
            <span className={`${styles.legendIcon} ${styles.moonIcon}`}>☾</span> Caffeine-free
          </div>
          <div>
            <span className={`${styles.legendIcon} ${styles.cloudIcon}`}>☁</span> Pairs well with
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
              <Emoji>🦖</Emoji> Tea-Rek&apos;z Signatures <Emoji>❄</Emoji>
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
                <Emoji>🥤</Emoji> Milk Teas
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
              Classic Thai Tea ❄ <Price>$6.75</Price>
            </Item>
            <Item code="25">
              <span>
                Crème Brûlée
                <br />
                Classic Thai Tea ❄ <Price>$8</Price>
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
                <Emoji>🍵</Emoji> Pure Teas
              </>
            }
            className={styles.pureTeas}
          >
            <Item code="1">
              Jasmine Green ☁ <Price>$5.75</Price>
            </Item>
            <Item code="2">
              Magnolia Green ❄ ☁ <Price>$6</Price>
            </Item>
            <Item code="3">
              Lychee Black <Price>$5.75</Price>
            </Item>
            <Item code="4">
              White Peach Oolong <Price>$6</Price> ☁
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
                <Emoji>🥛</Emoji> Milk Drinks <Emoji>☾</Emoji>
              </>
            }
            tone="orange"
            className={styles.compactSection}
          >
            <Item code="41">
              🐯 Tiger Milk (with boba) 🌙 ❄ <Price>$7</Price>
            </Item>
            <Item code="42">
              <span>
                🐯 Crème Brûlée
                <br />
                Tiger Milk (with boba) 🌙 ❄ <Price>$8</Price>
              </span>
            </Item>
            <Item code="43" description="real taro & ube, no artificial flavor or color">
              Ube Taro Milk 🌙 <Price>$7.5</Price>
            </Item>
            <Item code="44" description="organic strawberries and fresh milk">
              Strawberry Milk 🌙 ❄ ☁ <Price>$7</Price>
            </Item>
            <Item code="45" description="organic mango and fresh milk">
              Korean Mango Milk 🌙 ❄ ☁ <Price>$7</Price>
            </Item>
            <Item code="46" description="oat milk horchata">
              Horchata de Avena 🌙 ❄ <Price>$7</Price>
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
              Matcha Latte ☁ <Price>$7</Price>
            </Item>
            <Item code="32">
              Brown Sugar Matcha Latte ☁ <Price>$7.25</Price>
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
              <Emoji>☁</Emoji> Cream Tops
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
    </div>
  );
}

function RightMenu() {
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
              Lychee Jasmine Green ☁ <Price>$6.75</Price>
            </Item>
            <Item code="52">
              <Colored color="#c43c37">Strawberry</Colored> <Colored color="#c58aa8">Peach</Colored>{' '}
              Jade Oolong ☁ <Price>$6.75</Price>
            </Item>
            <Item code="53">
              <Colored color="#d28a17">Mango</Colored>{' '}
              <Colored color="#7b3f98">Passionfruit</Colored> Jasmine Green <Price>$6.75</Price>
            </Item>
            <Item code="54">
              <Colored color="#c58aa8">Peach</Colored> <Colored color="#7c1f1f">Lychee</Colored>{' '}
              Magnolia Green ❄ ☁ <Price>$7</Price>
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
              <br />| <Colored color="#b71c1c">Raspberry</Colored> |{' '}
              <Colored color="#5d8a2a">Pineapple</Colored>
            </div>
          </Section>

          <Section
            title={
              <>
                Smash Lemonades <Emoji>🍋</Emoji>
                <Emoji>❄</Emoji>
                <Emoji>☾</Emoji>
              </>
            }
            subhead={
              <>
                Freshly smashed whole lemons blended with all-
                <br />
                natural fruit purée
              </>
            }
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
              Rose Hibiscus Lemonade <Price>$6.75</Price>
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
                src="https://toasttab.s3.amazonaws.com/menu_service/restaurants/2d838293-2776-4151-b65b-1c9eea686461/MenuItem/f885eb1f-5056-4f95-aac5-388e287932b4.png"
                alt="Strawberry Lemonade"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto63}`}
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/7/item-1300000005355804257_1758274181.jpg"
                alt="Mango Lemonade"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto64}`}
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/8/item-1300000005355808498_1758274196.jpg"
                alt="Passionfruit Lemonade"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto65}`}
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/6/item-1300000006111297916_1766828237.png"
                alt="Purple Lemonade"
              />
            </div>
          </Section>
        </div>

        <div>
          <Section
            title={
              <>
                Blended Drinks <Emoji>🥭</Emoji>
                <Emoji>🥥</Emoji>
                <Emoji>❄</Emoji>
              </>
            }
            className={styles.blended}
          >
            <Item code="71" description="½ lb. organic mango">
              🥭 Golden Mango 🌙 <Price>$8</Price>
            </Item>
            <Item code="72" description="½ lb. organic mango, jasmine or magnolia tea">
              🥭 Jasmine / Magnolia Mango ☁ <Price>$8</Price>
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
              🥭 Mango Grapefruit Crystal (🌙) <Price>$8.5</Price>
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
              <br />| <Colored color="#b71c1c">Raspberry</Colored> |{' '}
              <Colored color="#5d8a2a">Pineapple</Colored>
            </div>
            <div
              className={`${styles.productPhotoGroup} ${styles.blendedCluster}`}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto71}`}
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/1/item-1300000007709137801_1770463661.png"
                alt="Golden Mango blended drink"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto72}`}
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/3/item-1300000007709137803_1770463677.png"
                alt="Jasmine or Magnolia Mango blended drink"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto73}`}
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/5/item-1300000007709137805_1770463698.png"
                alt="Coco Mango blended drink"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto74}`}
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/5/item-1300000005355541035_1770463715.png"
                alt="Mango Grapefruit Crystal blended drink"
              />
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
              Vietnamese Iced Coffee ❄ ☁ <Price>$6.75</Price>
            </Item>
            <Item code="82">
              <span>
                Crème Brûlée
                <br />
                Vietnamese Iced Coffee ❄ <Price>$8</Price>
              </span>
            </Item>
            <Item code="83">
              <span>
                Pistachio Cream
                <br />
                Vietnamese Iced Coffee ❄ <Price>$8</Price>
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
              Dirty Horchata de Avena ❄ <Price>$8</Price>
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
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/3/item-1300000005291458123_1766840134.png"
                alt="Crème Brûlée Vietnamese Iced Coffee"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto83}`}
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/4/item-1300000007709066774_1772013562.jpg"
                alt="Pistachio Cream Vietnamese Iced Coffee"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={`${styles.productPhoto} ${styles.productPhoto84}`}
                src="https://toasttab.s3.amazonaws.com/restaurants/restaurant-244719000000000000/menu/items/4/item-1300000006111243964_1766829653.png"
                alt="Dino Fuel Vietnamese Coffee and Thai Tea"
              />
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
                Extras <Emoji>❄</Emoji>
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
            <div className={styles.builderCopy}>
              <b>Choose a base flavor:</b>
              <br />
              <Colored color="#c43c37">Strawberry</Colored> |{' '}
              <Colored color="#d28a17">Mango</Colored> |{' '}
              <Colored color="#7b3f98">Passionfruit</Colored> |{' '}
              <Colored color="#c58aa8">Peach</Colored> |<br />
              <Colored color="#7c1f1f">Lychee</Colored> |{' '}
              <Colored color="#b71c1c">Raspberry</Colored> |{' '}
              <Colored color="#5d8a2a">Pineapple</Colored>
              <br />
              <br />
              <b>Add toppings (choose up to 3):</b>
              <br />
              Fresh Strawberries • Diced Mango • Grapefruit Pulp
              <br />
              Popping Boba: <Colored color="#d28a17">Mango</Colored> |{' '}
              <Colored color="#c43c37">Strawberry</Colored> |{' '}
              <Colored color="#7c1f1f">Lychee</Colored>
              <br />
              Jelly: <Colored color="#d28a17">Mango Star</Colored> |{' '}
              <Colored color="#c43c37">Strawberry Heart</Colored> |{' '}
              <Colored color="#7c1f1f">Lychee</Colored>
              <br />
              Agar Boba: <Colored color="#9e9e9e">Crystal</Colored> |{' '}
              <Colored color="#7a4b21">Brown Sugar</Colored>
              <br />
              <br />
              <em>Optional condensed milk drizzle</em>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}

export function TVMenuBoard({ side }: { side: MenuSide }) {
  useTvRefresh();

  const pageTitle = `Menu Display - ${side === 'left' ? 'Left' : 'Right'}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className={styles.viewport}>{side === 'left' ? <LeftMenu /> : <RightMenu />}</div>
    </>
  );
}
