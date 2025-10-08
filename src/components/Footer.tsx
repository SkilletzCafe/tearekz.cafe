import Link from 'next/link';

import { BUSINESS, FULL_ADDRESS, QUICK_LINKS, SOCIAL_MEDIA } from '@/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { margarine } from '@/config/fonts';

import { useTheme } from '@/context/ThemeContext';

import { createGoogleMapsUrl } from '@/utils/urls';

import styles from '@/styles/Layout.module.css';

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const currentYear = new Date().getFullYear();
  const copyrightYears =
    currentYear > BUSINESS.founding.year ? `${BUSINESS.founding.year}–${currentYear}` : currentYear;

  const socialMediaEntries = Object.entries(SOCIAL_MEDIA).filter(
    ([_, link]) => !link.url.startsWith('[PLACEHOLDER')
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={margarine.className}>Location & Hours</h3>
          <p>
            <a
              href={createGoogleMapsUrl(BUSINESS.name, FULL_ADDRESS)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {FULL_ADDRESS}
            </a>
            <br />
            {BUSINESS.hours.weekday.days}: {BUSINESS.hours.weekday.open} -{' '}
            {BUSINESS.hours.weekday.close}
          </p>
        </div>

        {socialMediaEntries.length > 0 && (
          <div className={styles.footerSection}>
            <h3 className={margarine.className}>Connect With Us</h3>
            <div className={styles.socialLinks}>
              {socialMediaEntries.map(([key, { url, label, icon, title }]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={title}
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className={styles.footerSection}>
          <h3 className={margarine.className}>Quick Links</h3>
          {QUICK_LINKS.map((link) => {
            const LinkComponent = link.isInternal ? Link : 'a';
            return (
              <LinkComponent
                key={link.label}
                href={link.href}
                className={styles.link}
                {...(link.target ? { target: link.target } : {})}
                {...(link.rel ? { rel: link.rel } : {})}
              >
                {link.label}
              </LinkComponent>
            );
          })}
        </div>
      </div>
      <div className={styles.copyright}>
        © {copyrightYears} {BUSINESS.name}. All rights reserved.
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </footer>
  );
}
