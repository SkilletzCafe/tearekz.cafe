import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MenuItem } from '@/types/menu';

import { TVBase } from '@/components/TVBase';

import { getFeaturedItems, getMainMenus } from '@/utils/menu';
import { loadMenuData } from '@/utils/menu_static';

interface TVRekzPageProps {
  featuredItems: MenuItem[];
}

export default function TV({ featuredItems }: TVRekzPageProps) {
  return (
    <>
      <Head>
        <title>Tea-Rek&apos;z TV Display | Featured Boba Tea & Drinks</title>
      </Head>
      <TVBase
        items={featuredItems}
        logoPath="/images/logos/tearekz_logo_transparent.png"
        logoAlt="Tea-Rek'z Logo"
        logoWidth={240}
        logoHeight={240}
        minDelayMillis={5000}
        maxDelayMillis={30000}
        defaultDelayMillis={8000}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<TVRekzPageProps> = async () => {
  const menuData = loadMenuData();

  // Get only Tea-Rek'z menu items for the Tea-Rek'z TV display
  // Note: There are two Tea-Rek'z menus in the data (M-W and Th-Sun) for different
  // visibility purposes (DoorDash vs in-store Kiosk). For programmatic menu purposes,
  // we use the Th-Sun menu as it represents the full menu.
  const filteredMenus = getMainMenus(menuData, {
    only: ["Tea-Rek'z 🧋🦖 Th-Sun 9am-9pm"],
  });

  // Create a temporary menuData object with filtered menus for getFeaturedItems
  const filteredMenuData = { ...menuData, menus: filteredMenus };
  const featuredItems = getFeaturedItems(filteredMenuData, {
    excludeGroups: ['Grab n Go'],
  });

  return {
    props: {
      featuredItems,
    },
  };
};
