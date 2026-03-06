import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

const pressArticles = [
  {
    source: 'Fremont Restaurant Week',
    title: "Tea-Rek'z by Skillet'z — Restaurant Week Feature",
    url: 'https://www.fremontrestaurantweek.com/tearekzbyskilletz.html',
    date: 'March 2026',
  },
  {
    source: 'Mercury News',
    title: 'Cafe culture: 10 new coffee and tea shops that are as diverse as the Bay Area is',
    url: 'https://www.mercurynews.com/2026/02/25/cafe-culture-10-new-coffee-and-tea-shops-that-are-as-diverse-as-the-bay-area-is/',
    date: 'February 2026',
  },
  {
    source: 'Silicon Valley Business Journal',
    title: "Skillet'z Cafe partners open Tea-Rek'z boba shop in Fremont's Niles district",
    url: 'https://www.bizjournals.com/sanjose/news/2026/01/06/skilletz-niles-fremont-tea-rekz.html',
    date: 'January 2026',
  },
  {
    source: 'NewsBreak',
    title: "Skillet'z Cafe partners open Tea-Rek'z boba shop in Fremont's Niles district",
    url: 'https://www.newsbreak.com/news/4428581825001-skillet-z-cafe-partners-open-tea-rek-z-boba-shop-in-fremont-s-niles-district',
    date: 'January 2026',
  },
];

export default function Press() {
  return (
    <BasicPageLayout
      title="In the News"
      heading="In the News"
      intro="Tea-Rek'z has been featured in local media! Check out some of our recent press coverage:"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {pressArticles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{article.source}</h2>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{article.title}</p>
            <span style={{ fontSize: '0.85rem', color: '#999' }}>{article.date}</span>
          </a>
        ))}
      </div>
    </BasicPageLayout>
  );
}
