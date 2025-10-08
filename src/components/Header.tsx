import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { BUSINESS, PAGES } from '@/config';

import { geist, margarine } from '@/config/fonts';

import { useTheme } from '@/context/ThemeContext';

import { createPhoneUrl } from '@/utils/urls';

import styles from '@/styles/Layout.module.css';

import MobileMenu from './MobileMenu';

export default function Header() {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoSrc = '/images/logos/tearekz_logo_transparent.png';

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link
          href={PAGES.home.path}
          className={styles.logo}
          aria-label={`${BUSINESS.name} - Return to Home`}
        >
          <Image
            src={logoSrc}
            alt={`${BUSINESS.name} Logo`}
            title={`${BUSINESS.name} - ${BUSINESS.branding.slogan}`}
            width={100}
            height={100}
            priority
            loading="eager"
            quality={100}
            loader={({ src }) => src}
          />
        </Link>
        <nav className={`${styles.nav} ${margarine.className} ${styles.desktopNav}`}>
          {Object.values(PAGES)
            .filter((page) => page.showInNav)
            .map((page) => (
              <Link
                key={page.path}
                href={page.path}
                {...(page.openInNewTab && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                {page.name}
              </Link>
            ))}
        </nav>
        <div className={`${styles.headerActions} ${geist.className}`}>
          <div className={styles.phone}>
            <a href={createPhoneUrl(BUSINESS.location.phone)}>{BUSINESS.location.phone}</a>
          </div>
          <Link href="/order-online" className={styles.orderButton}>
            Order Online
          </Link>
          <button
            className={styles.hamburgerButton}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
