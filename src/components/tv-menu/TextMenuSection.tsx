import { ReactNode } from 'react';

import { TVMenuSectionData } from '@/data/tvMenu';

import styles from '@/styles/TVTextMenu.module.css';

export function TextMenuSection({
  menu,
  className = '',
  children,
}: {
  menu: TVMenuSectionData;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`${styles.section} ${className}`}
      aria-label={menu.title}
      data-debug-region={menu.title}
    >
      <header className={styles.sectionHeader}>
        <h2>{menu.title}</h2>
        {menu.subtitle && <p className={styles.subtitle}>{menu.subtitle}</p>}
      </header>
      <ul className={styles.items}>
        {menu.items.map((item) => (
          <li key={item.code} className={styles.item} data-menu-code={item.code}>
            <span className={styles.code}>{item.code}</span>
            <div className={styles.itemCopy}>
              <span>{item.name}</span>
              {item.qualifier && <small className={styles.qualifier}> {item.qualifier}</small>}
              {item.description && <p className={styles.description}>{item.description}</p>}
            </div>
            <span className={styles.price}>{item.price}</span>
          </li>
        ))}
      </ul>
      {children}
    </section>
  );
}
