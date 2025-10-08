import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faXTwitter,
  faYelp,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

interface SocialMediaLink {
  url: string;
  label: string;
  icon: IconDefinition;
  title: string;
}

export const SOCIAL_MEDIA: Record<string, SocialMediaLink> = {
  facebook: {
    url: 'https://www.facebook.com/TeaRekz',
    label: 'Facebook',
    icon: faFacebook,
    title: 'Follow us on Facebook for updates and events',
  },
  instagram: {
    url: 'https://www.instagram.com/tearekz',
    label: 'Instagram',
    icon: faInstagram,
    title: 'See our latest drinks on Instagram',
  },
  yelp: {
    url: 'https://www.yelp.com/biz/tea-rekz-fremont',
    label: 'Yelp',
    icon: faYelp,
    title: 'Read our reviews on Yelp',
  },
  googleBusiness: {
    url: 'https://share.google/hE7YlGJ2KZvkMBan3',
    label: 'Google Business',
    icon: faGoogle,
    title: 'Find us on Google Business',
  },
} as const;
