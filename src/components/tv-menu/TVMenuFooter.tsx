import styles from '@/styles/TVMenuBoard.module.css';

function SymbolLegend() {
  return (
    <div className={styles.legend} data-debug-region="Symbol legend">
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
  );
}

function DrinkOptions() {
  return (
    <div
      className={`${styles.options} ${styles.drinkOptions} drink-options`}
      data-debug-region="Drink options"
    >
      <div className={`${styles.optionGroup} ${styles.sweetenerOptions}`}>
        <div className={styles.optionRow}>
          <span className={styles.optionLabel}>Sweetness Options:</span> 100% · 75% · 50% · 25% ·
          10% · 0%{' '}
          <span className={styles.optionExplainer}>(Some drinks contain built-in cane sugar)</span>
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
          <span className={styles.optionLabel}>Additional Boosts 💪:</span> Whey Protein 🥛 +$2 ·
          Pea Protein 🫛 +$2 · Creatine ⚡ +$1
        </div>
      </div>
    </div>
  );
}

export function ScreenFooter() {
  return (
    <footer className={styles.screenFooter} data-debug-region="Footer bar">
      <SymbolLegend />
      <DrinkOptions />
      <div className={styles.footerLogoWrap} data-debug-region="Footer logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/menu/tv-native/tearekz-logo-cropped.png" alt="Tea-Rek'z" />
      </div>
    </footer>
  );
}
