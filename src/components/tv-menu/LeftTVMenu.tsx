import { useRef } from 'react';

import styles from '@/styles/TVMenuBoard.module.css';

import {
  MatchaSection,
  MilkDrinksSection,
  MilkTeasSection,
  PureTeasSection,
  SignaturesSection,
} from './LeftTVMenuSections';
import { CreamTopsBox, ToppingsBox } from './TVMenuAddOns';
import { RegionOverlay } from './TVMenuDebug';
import { ScreenFooter } from './TVMenuFooter';

export function LeftTVMenu({ debugRegions = false }: { debugRegions?: boolean }) {
  const boardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={boardRef} className={`${styles.board} ${styles.leftBoard}`}>
      <main className={styles.leftGrid}>
        <div className={`${styles.menuColumn} ${styles.leftCol1}`}>
          <SignaturesSection />
        </div>

        <div className={`${styles.menuColumn} ${styles.leftCol2}`}>
          <MilkTeasSection />

          <PureTeasSection />
        </div>

        <div className={`${styles.menuColumn} ${styles.leftCol3}`}>
          <MilkDrinksSection />

          <MatchaSection />
        </div>

        <aside className={`${styles.menuColumn} ${styles.leftAside}`}>
          <CreamTopsBox />

          <ToppingsBox />
        </aside>
      </main>
      <ScreenFooter />
      {debugRegions && <RegionOverlay boardRef={boardRef} />}
    </div>
  );
}
