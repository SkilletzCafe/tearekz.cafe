import { MenuData } from '@/types/menu';

// Keep the weekend assortment, but use the owner-updated milk-tea copy from
// Toast's weekday group. These groups have separate identities in Toast.
export const getTeaRekzWebsiteMenu = (menuData: MenuData) => {
  const menus = menuData.menus.filter((menu) => menu.name.startsWith("Tea-Rek'z"));
  const menu = menus.find((candidate) => candidate.name.includes('Sun')) || menus[0];
  const milkTeaCopy = menus
    .flatMap((candidate) => candidate.groups)
    .find((group) => group.guid === 'eb68e8ed-691c-4428-a976-fbf271749603');

  if (!menu || !milkTeaCopy) return menu;

  return {
    ...menu,
    groups: menu.groups.map((group) =>
      group.guid === 'f74d6bec-71fd-4075-835b-f62ef9a38ee8'
        ? { ...group, name: milkTeaCopy.name, description: milkTeaCopy.description }
        : group
    ),
  };
};

// Image loader for external images
export const imageLoader = ({ src }: { src: string }) => {
  return src;
};

// Get all menu items that have images for TV display
// This function extracts all menu items from all menus that have associated images
export const getFeaturedItems = (
  menuData: MenuData,
  options?: {
    excludeGroups?: string[]; // Exclude menu groups with these names
  }
) => {
  const { excludeGroups = [] } = options || {};

  const allItems = menuData.menus.flatMap((menu) =>
    menu.groups
      .filter((group) => !excludeGroups.includes(group.name))
      .flatMap(
        (group) => group.items.filter((item) => item.imageUrl)
        // TODO: Add filtering logic for featured items based on business requirements
        // Previous logic: (item.isPopular || Math.random() < 0.3)
        // Consider: item.isFeatured, item.isPopular, or manual curation
      )
  );

  // Deduplicate by GUID to ensure each unique item only appears once
  // (items may appear in multiple groups within the same menu)
  const uniqueItems = Array.from(new Map(allItems.map((item) => [item.guid, item])).values());

  return uniqueItems;
};

// Filter menus with optional inclusion/exclusion parameters
export const getMainMenus = (
  menuData: MenuData,
  options?: {
    only?: string[]; // Only include menus with these exact names
    startsWith?: string; // Only include menus whose name starts with this prefix
    firstMatch?: boolean; // When using startsWith, only return the first match
    exclude?: string[]; // Exclude menus with these names
  }
) => {
  const { only, startsWith, firstMatch = false, exclude = ['Other'] } = options || {};

  let result = [];

  // If 'startsWith' is specified with firstMatch, get only the first matching menu
  if (startsWith && firstMatch) {
    const found = menuData.menus.find((menu) => menu.name.startsWith(startsWith));
    result = found ? [found] : [];
  } else {
    // Otherwise, filter menus based on criteria
    result = menuData.menus.filter((menu) => {
      // If 'startsWith' is specified, match menus by prefix
      if (startsWith) {
        return menu.name.startsWith(startsWith);
      }

      // If 'only' is specified, only include those menus
      if (only) {
        return only.includes(menu.name);
      }

      // Otherwise, exclude the specified menu names
      return !exclude.includes(menu.name);
    });
  }

  return result;
};
