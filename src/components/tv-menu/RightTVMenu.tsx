import { useRef } from 'react';

import styles from '@/styles/TVMenuBoard.module.css';

import { ShowcasePreview } from './ShowcasePreview';
import { RegionOverlay } from './TVMenuDebug';
import {
  BlendedDrinksSection,
  CoffeeDrinksSection,
  FruitTeasSection,
  HawaiianShavedIceSection,
  HotDrinksSection,
  SmashLemonadesSection,
} from './TVMenuSections';

export function RightTVMenu({ debugRegions = false }: { debugRegions?: boolean }) {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={boardRef} className={`${styles.board} ${styles.rightBoard}`}>
      <main className={styles.rightGrid}>
        <div className={`${styles.menuColumn} ${styles.rightCol1}`}>
          <FruitTeasSection />

          <SmashLemonadesSection />
        </div>

        <div className={`${styles.menuColumn} ${styles.rightCol2}`}>
          <BlendedDrinksSection />

          <CoffeeDrinksSection />
        </div>

        <div className={`${styles.menuColumn} ${styles.rightCol3}`}>
          <HotDrinksSection />

          <HawaiianShavedIceSection />
        </div>
      </main>
      <ShowcasePreview />
      {debugRegions && <RegionOverlay boardRef={boardRef} />}
    </div>
  );
}
