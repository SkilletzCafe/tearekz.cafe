import { useRef } from 'react';

import {
  blendedDrinks,
  coffee,
  fruitChoices,
  fruitTeas,
  hotDrinks,
  lemonades,
  milkDrinks,
  teaChoices,
} from '@/data/tvMenu';

import styles from '@/styles/TVTextMenu.module.css';

import { RegionOverlay } from './TVMenuDebug';
import { TextMenuSection } from './TextMenuSection';

function FruitChoices() {
  return (
    <>
      <strong>Choose up to 2 fruits:</strong>
      <p>{fruitChoices}</p>
    </>
  );
}

export function RightTVMenu({ debugRegions = false }: { debugRegions?: boolean }) {
  const boardRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={boardRef} className={`${styles.board} ${styles.rightBoard}`}>
      <main className={styles.rightGrid} aria-label="Specialty drinks menu">
        <div className={styles.column}>
          <TextMenuSection menu={milkDrinks} />
          <TextMenuSection menu={blendedDrinks} className={styles.blended}>
            <div className={styles.builder}>
              <FruitChoices />
            </div>
          </TextMenuSection>
        </div>
        <div className={styles.column}>
          <TextMenuSection menu={fruitTeas}>
            <div className={styles.builder}>
              <strong>Choose a tea:</strong>
              <p>{teaChoices}</p>
              <FruitChoices />
            </div>
          </TextMenuSection>
          <TextMenuSection menu={coffee} className={styles.coffee} />
        </div>
        <div className={styles.column}>
          <TextMenuSection menu={lemonades} />
          <TextMenuSection menu={hotDrinks} className={styles.hotDrinks} />
        </div>
      </main>
      {debugRegions && <RegionOverlay boardRef={boardRef} />}
    </div>
  );
}
