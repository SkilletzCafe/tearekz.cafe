import { useEffect, useRef, useState } from 'react';

import { GetStaticProps } from 'next';

import { MenuData, MenuItemState, MenuOptionGroupsData } from '@/types/menu';

import { margarine } from '@/config/fonts';
import { MenuTab } from '@/config/menuTabs';

import { BasicPageLayout } from '@/components/BasicPageLayout';
import { RestaurantSchema } from '@/components/RestaurantSchema';
import { ScrollToTop } from '@/components/ScrollToTop';
import { MenuCategorySwitcher } from '@/components/menu/MenuCategorySwitcher';
import { MenuItem } from '@/components/menu/MenuItem';
import { MenuSections } from '@/components/menu/MenuSections';

import { getMainMenus, imageLoader } from '@/utils/menu';
import { loadMenuData, loadMenuOptionGroupsData } from '@/utils/menu_static';

import styles from '@/styles/Menu.module.css';

interface MenuPageProps {
  menuData: MenuData;
  menuOptionGroupsData: MenuOptionGroupsData;
}

export default function Menu({ menuData, menuOptionGroupsData }: MenuPageProps) {
  // Tea-Rek'z only serves boba tea - no tab navigation needed
  const [selectedTab] = useState<MenuTab>("Tea-Rek'z");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(-1);
  const [itemStates, setItemStates] = useState<Record<string, MenuItemState>>({});
  const navRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const categoryRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  // Find the boba tea toppings option group
  const bobaToppingsGroup = menuOptionGroupsData.optionGroups.find(
    (group) => group.guid === '9145a88a-16f0-4a02-bccd-d227ed2e8f87'
  );

  // Get Tea-Rek'z menu
  const teaRekzMenu = menuData.menus.find((menu) => menu.name === "Tea-Rek'z 🧋🦖");

  // Create a special "Toppings" group for Tea-Rek'z if we have the data
  const createTeaRekzWithToppings = () => {
    if (!teaRekzMenu || !bobaToppingsGroup) return teaRekzMenu;

    // Create a copy of the Tea Rek'z menu
    const teaRekzWithToppings = {
      ...teaRekzMenu,
      groups: [...teaRekzMenu.groups],
    };

    // Add the Toppings group if it doesn't already exist
    if (!teaRekzWithToppings.groups.find((g) => g.name === 'Toppings')) {
      const toppingsGroup = {
        name: 'Toppings 🌈',
        guid: 'toppings-special-group',
        description: 'Customize your bubble tea with these delicious toppings',
        items: bobaToppingsGroup.items.map((item) => ({
          name: item.name,
          guid: item.guid,
          description: item.description,
          price: item.price,
          imageUrl: null,
        })),
      };

      // Insert Toppings after the first group (House Favorites)
      teaRekzWithToppings.groups.push(toppingsGroup);
    }

    return teaRekzWithToppings;
  };

  const teaRekzMenuWithToppings = createTeaRekzWithToppings();

  // Define excluded menu groups by selected tab
  const excludedGroups: Partial<Record<MenuTab, string[]>> = {
    "Tea-Rek'z": ['Grab n Go', 'Archived Items (Not Displayed)'],
    // Add other exclusions as needed
  };

  // Set up intersection observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemId = entry.target.getAttribute('data-item-id');
          if (itemId) {
            setItemStates((prev) => ({
              ...prev,
              [itemId]: {
                ...prev[itemId],
                isVisible: entry.isIntersecting,
              },
            }));
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);


  // Add parallax effect to category headings
  useEffect(() => {
    const handleScroll = () => {
      categoryRefs.current.forEach((ref) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        // Only apply effect when heading is in view
        if (rect.top < viewHeight && rect.bottom > 0) {
          const distance = rect.top - viewHeight / 2;
          const parallax = distance * 0.1; // Adjust this value to control parallax intensity
          ref.style.transform = `translateY(${parallax}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle image load completion
  const handleImageLoad = (itemId: string) => {
    setItemStates((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        isLoaded: true,
      },
    }));
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = 200;
      navRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scrollNav('left');
    } else if (e.key === 'ArrowRight') {
      scrollNav('right');
    }
  };

  const handleMenuItemKeyDown = (e: React.KeyboardEvent, index: number, totalItems: number) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % totalItems;
        setFocusedItemIndex(nextIndex);
        menuItemsRef.current[nextIndex]?.focus();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + totalItems) % totalItems;
        setFocusedItemIndex(prevIndex);
        menuItemsRef.current[prevIndex]?.focus();
        break;
    }
  };

  // Get the Tea-Rek'z menu
  const menus = teaRekzMenuWithToppings ? [teaRekzMenuWithToppings] : [];
  const totalMenuItems = menus.reduce((total, menu) => {
    return total + menu.groups.reduce((groupTotal, group) => groupTotal + group.items.length, 0);
  }, 0);

  // Get category options for MenuCategorySwitcher
  const getCategoryOptions = () => {
    const currentMenu = menus[0];
    if (!currentMenu) return [];

    const excludedGroupNames = excludedGroups[selectedTab] || [];

    const groups = currentMenu.groups
      .filter((g) => g.items && g.items.length > 0)
      .filter((g) => !excludedGroupNames.includes(g.name));

    return groups.map((g) => ({ key: g.guid, label: g.name }));
  };

  const categoryOptions = getCategoryOptions();

  // Get sections for MenuSections
  const getSections = () => {
    const currentMenu = menus[0];
    if (!currentMenu) return [];

    const excludedGroupNames = excludedGroups[selectedTab] || [];

    return currentMenu.groups.filter((g) => !excludedGroupNames.includes(g.name));
  };

  const sections = getSections();
  // Get items for a group
  const getItems = (g: any) => {
    return g.items;
  };

  return (
    <BasicPageLayout title="Menu" heading="Our Menu" intro="Explore our delicious boba tea and specialty drinks">
      <div className={styles.menuContainer}>
        {/* Category navigation */}
        <MenuCategorySwitcher
          options={categoryOptions}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          navRef={navRef}
          onKeyDown={handleKeyDown}
        />
        <div id="menu-items" className={styles.menuContent} role="tabpanel" aria-label="Menu items">
          <MenuSections
            sections={sections}
            selected={selectedCategory}
            getItems={getItems}
            itemStates={itemStates}
            menuItemsRef={menuItemsRef}
            observerRef={observerRef}
            handleImageLoad={handleImageLoad}
            handleMenuItemKeyDown={handleMenuItemKeyDown}
            totalMenuItems={totalMenuItems}
            categoryRefs={categoryRefs}
          />
        </div>
      </div>
      <ScrollToTop />
    </BasicPageLayout>
  );
}

export const getStaticProps: GetStaticProps<MenuPageProps> = async () => {
  const menuData = loadMenuData();
  const menuOptionGroupsData = loadMenuOptionGroupsData();

  return {
    props: {
      menuData,
      menuOptionGroupsData,
    },
  };
};
