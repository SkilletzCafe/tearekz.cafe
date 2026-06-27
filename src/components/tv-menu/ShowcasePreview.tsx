import { useEffect, useState } from 'react';

import { SHOWCASE_IMAGES } from '@/data/drink-images/showcaseImages';

import styles from '@/styles/TVMenuBoard.module.css';

const SHOWCASE_INTERVAL_MILLIS = 5 * 1000;

export function ShowcasePreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (SHOWCASE_IMAGES.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % SHOWCASE_IMAGES.length);
    }, SHOWCASE_INTERVAL_MILLIS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={`${styles.showcaseWidget} showcase-slideshow-widget`}
      aria-hidden="true"
      data-debug-region="Showcase slideshow"
    >
      {SHOWCASE_IMAGES.map((image, index) => (
        <div
          key={image.src}
          className={`${styles.showcaseSlide} ${index === activeIndex ? styles.showcaseSlideActive : ''}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} className={styles.showcaseImage} />
          <div className={styles.showcaseName}>{image.name}</div>
        </div>
      ))}
    </div>
  );
}
