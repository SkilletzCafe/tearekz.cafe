import { BUSINESS, PAGES, QUICK_LINKS, SEO, SOCIAL_MEDIA } from '@/config';
import { defineConfig } from '@nextjs-htk/core';

export default defineConfig({
  site: {
    name: BUSINESS.name,
    title: "Tea-Rek'z | Boba Tea & Specialty Drinks",
    description: SEO.description.default,
    url: 'https://tearekz.cafe',
    author: BUSINESS.name,
  },
  branding: {
    logo: '/images/logos/tearekz_logo_transparent.png',
    slogan: BUSINESS.branding.slogan,
    tagline: BUSINESS.branding.tagline,
  },
  business: {
    location: {
      address: BUSINESS.location.address,
      city: BUSINESS.location.city,
      state: BUSINESS.location.state,
      zip: BUSINESS.location.zip,
      country: BUSINESS.location.country_abbrev,
      phone: BUSINESS.location.phone,
      email: BUSINESS.contact.email,
    },
    hours: BUSINESS.hours,
    founding: BUSINESS.founding,
  },
  navigation: Object.values(PAGES),
  footer: {
    copyright: `© ${new Date().getFullYear()} ${BUSINESS.name}. All rights reserved.`,
    quickLinks: QUICK_LINKS,
  },
  social: SOCIAL_MEDIA,
  theme: {},
  seo: SEO,
});
