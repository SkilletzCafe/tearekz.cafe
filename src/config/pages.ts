interface Page {
  path: string;
  name: string;
  showInNav: boolean;
  openInNewTab?: boolean;
}

export const PAGES: Record<string, Page> = {
  home: {
    path: '/',
    name: 'Home',
    showInNav: true,
  },
  menu: {
    path: '/menu',
    name: 'Menu',
    showInNav: true,
  },
  contact: {
    path: '/contact',
    name: 'Contact',
    showInNav: true,
  },
  orderOnline: {
    path: '/order-online',
    name: 'Order Online',
    showInNav: false,
  },
} as const;

export const SITE_URL = 'https://tearekz.cafe';
