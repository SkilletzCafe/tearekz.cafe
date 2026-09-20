import { useRef } from 'react';

import { hotTeas, icedTeas, matcha, milkTeas } from '@/data/tvMenu';

import styles from '@/styles/TVTextMenu.module.css';

import { RegionOverlay } from './TVMenuDebug';
import { TextMenuSection } from './TextMenuSection';

function CustomizationPanel() {
  return (
    <aside
      className={styles.customize}
      aria-label="Customize your drink"
      data-debug-region="Customization"
    >
      <h2 className={styles.customizeTitle}>
        Customize
        <br />
        your drink
      </h2>
      <div className={styles.addOns}>
        <h3 className={styles.creamHeader}>
          <span>
            Add a cream top <span className={styles.extraPrice}>+$2</span>
          </span>
          <small>Made with Real Cream · Contains Dairy</small>
        </h3>
        <div className={styles.creamColumns}>
          <ul>
            <li>
              Crème Brûlée <small>(iced drinks only)</small>
            </li>
            <li>Vanilla Ice Cream Float</li>
            <li>
              Jasmine Cream <small>(whipped)</small>
            </li>
          </ul>
          <ul>
            <li>
              Matcha Cream <small>(contains caffeine)</small>
            </li>
            <li>Pistachio Cream</li>
            <li>Raspberry Cream</li>
            <li>Sea Salt Cheese Cream</li>
          </ul>
        </div>
        <h3 className={styles.toppingsHeader}>
          Add toppings <span className={styles.extraPrice}>$0.75 each</span>
        </h3>
        <p className={styles.toppings}>
          Boba (Tapioca Pearls) · Popping Boba (Mango · Strawberry)
          <br />
          Jelly (Mango Star · Strawberry Heart · Lychee Star)
          <br />
          Agar Boba (Crystal · Brown Sugar) · Grapefruit Pulp · Diced Mango
        </p>
      </div>
      <div className={styles.preferences}>
        <div className={styles.preferenceColumns}>
          <div>
            <h3>Sweetness</h3>
            <p className={styles.levels}>100% 75% 50% 25% 10% 0%</p>
          </div>
          <div>
            <h3>Ice</h3>
            <p className={styles.levels}>100% 50% 0%</p>
          </div>
        </div>
        <p className={styles.preferenceNote}>(A few drinks are pre-sweetened with cane sugar)</p>
        <p className={styles.sweetener}>
          All-natural sugar-free sweetener (Allulose &amp; Organic Monk Fruit)
          <br />
          available for most drinks (+$0.5)
        </p>
        <h3 className={styles.boostHeader}>Additional boosts</h3>
        <p className={styles.boosts}>
          <span>Whey Protein +$2</span>
          <span>Pea Protein +$2</span>
          <span>Creatine +$1</span>
        </p>
      </div>
    </aside>
  );
}

export function LeftTVMenu({ debugRegions = false }: { debugRegions?: boolean }) {
  const boardRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={boardRef} className={`${styles.board} ${styles.leftBoard}`}>
      <main className={styles.leftGrid} aria-label="Tea menu">
        <div className={styles.column}>
          <TextMenuSection menu={icedTeas}>
            <div className={styles.pairings}>
              <h3>Try it with a cream top +$2</h3>
              <p>
                <strong>Green Teas</strong>
                <br />
                Pair with Jasmine Cream or Matcha Cream
              </p>
              <p>
                <strong>Black &amp; Oolong</strong>
                <br />
                Pair with Sea Salt Cheese Cream
              </p>
            </div>
          </TextMenuSection>
        </div>
        <div className={styles.column}>
          <TextMenuSection menu={hotTeas} />
        </div>
        <div className={styles.column}>
          <TextMenuSection menu={milkTeas} className={styles.milkTeas} />
        </div>
        <div className={styles.column}>
          <TextMenuSection menu={matcha} className={styles.matcha} />
        </div>
      </main>
      <CustomizationPanel />
      {debugRegions && <RegionOverlay boardRef={boardRef} />}
    </div>
  );
}
