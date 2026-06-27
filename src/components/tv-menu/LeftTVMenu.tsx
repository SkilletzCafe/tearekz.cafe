import { useRef } from 'react';

import styles from '@/styles/TVMenuBoard.module.css';

import { RegionOverlay } from './TVMenuDebug';
import { ScreenFooter } from './TVMenuFooter';
import {
  CREAM_COLORS,
  Colored,
  Emoji,
  FRUIT_COLORS,
  GradientText,
  Item,
  Price,
  Section,
  TEA_COLORS,
  TOPPING_COLORS,
  ToppingItem,
} from './TVMenuPrimitives';

export function LeftTVMenu({ debugRegions = false }: { debugRegions?: boolean }) {
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
      <ScreenFooter />
      {debugRegions && <RegionOverlay boardRef={boardRef} />}
    </div>
  );
}
