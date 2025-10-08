interface QuickLink {
  label: string;
  href: string;
  isInternal: boolean;
  target?: string;
  rel?: string;
}

export const QUICK_LINKS: QuickLink[] = [
  {
    label: 'Order Online',
    href: '/order-online',
    isInternal: true,
  },
  {
    label: 'Menu',
    href: '/menu',
    isInternal: true,
  },
  {
    label: 'Contact',
    href: '/contact',
    isInternal: true,
  },
  {
    label: "Skillet'z Cafe",
    href: 'https://skilletz.cafe',
    isInternal: false,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];
