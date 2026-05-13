import Link from 'next/link';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

export default function Custom404() {
  return (
    <BasicPageLayout
      title="Page Not Found"
      heading="Page Not Found"
      intro="We couldn't find that page, but the dino menu is still ready."
    >
      <div className={styles.card}>
        <Link href="/" className={styles.link}>
          Back to home
        </Link>
      </div>
    </BasicPageLayout>
  );
}
