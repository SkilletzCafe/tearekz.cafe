import { CSSProperties, ReactNode } from 'react';

import styles from '@/styles/TVMenuBoard.module.css';

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
  semanticClassName?: string;
  subhead?: ReactNode;
  debugLabel?: string;
};

export function Section({
  title,
  tone = 'green',
  children,
  className = '',
  semanticClassName = '',
  subhead,
  debugLabel,
}: SectionProps) {
  return (
    <section
      className={`${styles.section} ${semanticClassName} ${className}`.trim()}
      data-debug-region={debugLabel}
    >
      <div className={`${styles.sectionTitle} ${styles[tone]}`}>{title}</div>
      {subhead && <div className={styles.subhead}>{subhead}</div>}
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

export function Item({ code, children, description, className = '' }: ItemProps) {
  return (
    <div className={`${styles.item} ${className}`}>
      <div className={styles.itemLine}>
        <span className={styles.code}>{code}</span>
        <span className={styles.itemName}>{children}</span>
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
}

export function Colored({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className={styles.colored} style={{ color }}>
      {children}
    </span>
  );
}

export function GradientText({
  from,
  to,
  children,
}: {
  from: string;
  to: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`${styles.colored} ${styles.gradientText}`}
      style={{ '--gradient-from': from, '--gradient-to': to } as CSSProperties}
    >
      {children}
    </span>
  );
}

export function Price({ children }: { children: ReactNode }) {
  return <span className={styles.price}>{children}</span>;
}

export const FRUIT_COLORS = {
  ginger: 'var(--menu-color-ginger)',
  hibiscus: 'var(--menu-color-hibiscus)',
  lychee: 'var(--menu-color-lychee)',
  mango: 'var(--menu-color-mango)',
  passionfruit: 'var(--menu-color-passionfruit)',
  peach: 'var(--menu-color-peach)',
  pineapple: 'var(--menu-color-pineapple)',
  purple: 'var(--menu-color-purple)',
  raspberry: 'var(--menu-color-raspberry)',
  rose: 'var(--menu-color-rose)',
  strawberry: 'var(--menu-color-strawberry)',
} as const;

export const CREAM_COLORS = {
  brulee: 'var(--menu-color-brulee)',
  iceCream: 'var(--menu-color-ice-cream)',
  jasmine: 'var(--menu-color-jasmine-cream)',
  matcha: 'var(--menu-color-matcha-cream)',
  pistachio: 'var(--menu-color-pistachio-cream)',
  raspberry: 'var(--menu-color-raspberry-cream)',
  seaSaltCheese: 'var(--menu-color-sea-salt-cheese)',
} as const;

export const TEA_COLORS = {
  assam: '#7a4b21',
  jasmine: CREAM_COLORS.jasmine,
  lychee: FRUIT_COLORS.lychee,
  magnolia: '#3e7a3b',
  peach: FRUIT_COLORS.peach,
  rooibos: '#a86f17',
  white: '#6f7f4a',
} as const;

export const TOPPING_COLORS = {
  crystal: 'var(--menu-color-crystal)',
  brownSugar: 'var(--menu-color-brown-sugar)',
  taro: 'var(--menu-color-purple)',
} as const;

export function Emoji({ children }: { children: ReactNode }) {
  return (
    <span className={styles.emoji} aria-hidden="true">
      {children}
    </span>
  );
}

export function ToppingItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className={styles.toppingItem}>
      <span className={styles.toppingIcon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.toppingText}>{children}</span>
    </p>
  );
}

type ProductPhoto = {
  alt: string;
  captionClassName: string;
  code: string;
  imageClassName: string;
  src: string;
};

export function ProductPhotoCluster({
  className,
  photos,
}: {
  className: string;
  photos: ProductPhoto[];
}) {
  return (
    <div className={`${styles.productPhotoSlot} ${className}`} aria-hidden="true">
      {photos.map((photo) => (
        <span key={photo.code}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`${styles.productPhoto} ${photo.imageClassName}`}
            src={photo.src}
            alt={photo.alt}
          />
          <span className={`${styles.photoCaption} ${photo.captionClassName}`}>{photo.code}</span>
        </span>
      ))}
    </div>
  );
}
