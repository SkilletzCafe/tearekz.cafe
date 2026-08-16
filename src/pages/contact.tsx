import { BUSINESS, FULL_ADDRESS } from '@/config';
import {
  createGoogleMapsUrl,
  createMailtoUrl,
  createPhoneUrl,
} from '@hacktoolkit/nextjs-htk/utils';

import { margarine } from '@/config/fonts';

import Layout from '@/components/Layout';

import styles from '@/styles/Contact.module.css';

export default function ContactPage() {
  return (
    <Layout title="Contact Us" description={`Get in touch with ${BUSINESS.name}`}>
      <div className={styles.page}>
        <h1 className={margarine.className}>Contact Us</h1>

        <div className={styles.contactInfo}>
          <section>
            <h2>Location</h2>
            <p>
              <a
                href={createGoogleMapsUrl(BUSINESS.name, FULL_ADDRESS)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {FULL_ADDRESS}
              </a>
            </p>
          </section>

          <section>
            <h2>Hours</h2>
            <p>
              {Object.values(BUSINESS.hours).map((hours, index) => (
                <span key={hours.days}>
                  {index > 0 && <br />}
                  {hours.days}: {hours.display}
                </span>
              ))}
            </p>
          </section>

          <section>
            <h2>Phone</h2>
            <p>
              <a href={createPhoneUrl(BUSINESS.location.phone)}>{BUSINESS.location.phone}</a>
            </p>
          </section>

          <section>
            <h2>Email</h2>
            <p>
              <a href={createMailtoUrl(BUSINESS.contact.email)}>{BUSINESS.contact.email}</a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
