import Link from 'next/link';

import { PAGES } from '@/config';

import { margarine } from '@/config/fonts';

import Layout from '@/components/Layout';

import styles from '@/styles/Catering.module.css';

export default function CateringPage() {
  return (
    <Layout
      title="We Cater!"
      description="Bring TEA-REK'Z to your next event! We offer boba catering for parties, meetings, weddings, schools, and more."
    >
      <div className={styles.page}>
        <h1 className={margarine.className}>We Cater!</h1>
        <p className={styles.intro}>
          Bring TEA-REK&apos;Z to your next event! We offer boba catering for parties, meetings,
          weddings, schools, and more.
        </p>

        <p>Choose the option that works best for your event:</p>
        <ul className={styles.options}>
          <li>
            <strong>Individually sealed drinks</strong>, ready to grab and enjoy.
          </li>
          <li>
            <strong>1-gallon beverage packs</strong>, with syrups, sauces, and toppings served on
            the side so guests can customize each drink.
          </li>
        </ul>

        <p>
          <Link href={PAGES.contact.path} className={styles.contactLink}>
            Contact us for a custom quote.
          </Link>
        </p>
        <div className={styles.notice}>
          <p>
            <strong>48 hours&apos; notice is preferred.</strong>
          </p>
          <p>
            <strong>
              For orders serving 50+ guests, please contact us at least 1 week in advance.
            </strong>
          </p>
        </div>
      </div>
    </Layout>
  );
}
