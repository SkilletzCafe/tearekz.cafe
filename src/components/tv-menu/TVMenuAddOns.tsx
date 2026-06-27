import styles from '@/styles/TVMenuBoard.module.css';

import {
  CREAM_COLORS,
  Colored,
  Emoji,
  FRUIT_COLORS,
  Price,
  TOPPING_COLORS,
  ToppingItem,
} from './TVMenuPrimitives';

export function CreamTopsBox() {
  return (
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
          <span className={styles.creamQualifier}>(on cold drinks only)</span> <Price>$1.5</Price>
        </p>
        <p>
          <Colored color={CREAM_COLORS.iceCream}>Vanilla Ice Cream Float</Colored>{' '}
          <span className={styles.creamQualifier}>(on cold drinks only)</span> <Price>$2</Price>
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
          <Colored color={CREAM_COLORS.raspberry}>Raspberry Cream</Colored> <Price>$1.5</Price>
        </p>
        <p>
          <Colored color={CREAM_COLORS.seaSaltCheese}>Sea Salt Cheese Cream</Colored>{' '}
          <Price>$1.5</Price>
        </p>
      </div>
    </div>
  );
}

export function ToppingsBox() {
  return (
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
  );
}

export function FruitTeaBuilderOptions() {
  return (
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
  );
}

export function ShavedIceBuilderOptions() {
  return (
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
  );
}
