import { useRef } from 'react';

import styles from '@/styles/TVMenuBoard.module.css';

import { ShowcasePreview } from './ShowcasePreview';
import { FruitTeaBuilderOptions, ShavedIceBuilderOptions } from './TVMenuAddOns';
import { RegionOverlay } from './TVMenuDebug';
import {
  CREAM_COLORS,
  Colored,
  Emoji,
  FRUIT_COLORS,
  Item,
  Price,
  ProductPhotoCluster,
  Section,
} from './TVMenuPrimitives';

export function RightTVMenu({ debugRegions = false }: { debugRegions?: boolean }) {
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
            <FruitTeaBuilderOptions />
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
            <ProductPhotoCluster
              className={styles.lemonadeCluster}
              photos={[
                {
                  code: '62',
                  src: '/images/menu/tv-native/drinks/01-strawberry-lemonade-cutout.png',
                  alt: 'Strawberry Lemonade',
                  imageClassName: styles.productPhoto62,
                  captionClassName: styles.photoCaption62,
                },
                {
                  code: '65',
                  src: '/images/menu/tv-native/drinks/04-purple-lemonade-cutout.png',
                  alt: 'Purple Lemonade',
                  imageClassName: styles.productPhoto65,
                  captionClassName: styles.photoCaption65,
                },
              ]}
            />
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
            <ProductPhotoCluster
              className={styles.blendedCluster}
              photos={[
                {
                  code: '71',
                  src: '/images/menu/tv-native/drinks/05-golden-mango-blended-drink-cutout.png',
                  alt: 'Golden Mango blended drink',
                  imageClassName: styles.productPhoto71,
                  captionClassName: styles.photoCaption71,
                },
                {
                  code: '75',
                  src: '/images/menu/tv-native/drinks/08-mango-grapefruit-crystal-blended-drink-cutout.png',
                  alt: 'Mango Grapefruit Crystal blended drink',
                  imageClassName: styles.productPhoto75,
                  captionClassName: styles.photoCaption75,
                },
              ]}
            />
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
            <ProductPhotoCluster
              className={styles.coffeeCluster}
              photos={[
                {
                  code: '82',
                  src: '/images/menu/tv-native/drinks/09-cr-me-br-l-e-vietnamese-iced-coffee-cutout.png',
                  alt: 'Crème Brûlée Vietnamese Iced Coffee',
                  imageClassName: styles.productPhoto82,
                  captionClassName: styles.photoCaption82,
                },
                {
                  code: '84',
                  src: '/images/menu/tv-native/drinks/11-dino-fuel-vietnamese-coffee-and-thai-tea-cutout.png',
                  alt: 'Dino Fuel Vietnamese Coffee and Thai Tea',
                  imageClassName: styles.productPhoto84,
                  captionClassName: styles.photoCaption84,
                },
              ]}
            />
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
            <ShavedIceBuilderOptions />
          </Section>
        </div>
      </main>
      <ShowcasePreview />
      {debugRegions && <RegionOverlay boardRef={boardRef} />}
    </div>
  );
}
