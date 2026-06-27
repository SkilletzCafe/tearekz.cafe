import { Geist, Margarine, Roboto_Condensed } from 'next/font/google';

export const margarine = Margarine({
  weight: '400',
  subsets: ['latin'],
});

export const geist = Geist({
  subsets: ['latin'],
});

export const tvMenu = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-tv-menu',
});
