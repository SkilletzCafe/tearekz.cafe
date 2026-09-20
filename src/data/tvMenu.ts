// TV menu copy approved in the September 19, 2026 menu references.
// Keep the TV menus as native HTML text, never flattened menu images.
export interface TVMenuItem {
  code: string;
  name: string;
  price: string;
  qualifier?: string;
  description?: string;
}

export interface TVMenuSectionData {
  title: string;
  subtitle?: string;
  items: TVMenuItem[];
}

export const icedTeas: TVMenuSectionData = {
  title: 'Iced Teas',
  items: [
    { code: '1', name: 'Jasmine Green', price: '$6' },
    { code: '2', name: 'Magnolia Green', price: '$6' },
    { code: '3', name: 'Lychee Black', price: '$6' },
    { code: '4', name: 'White Peach Oolong', price: '$6' },
  ],
};

export const hotTeas: TVMenuSectionData = {
  title: 'Hot Teas',
  items: [
    { code: '11', name: 'Black Tea', qualifier: '(Decaf Available)', price: '$6' },
    { code: '12', name: 'Lychee Black', price: '$6' },
    { code: '13', name: 'Roasted Oolong', price: '$6' },
    { code: '14', name: 'Four Seasons Jade Oolong', price: '$6' },
    { code: '15', name: 'Jasmine Green', price: '$6' },
    { code: '16', name: 'Magnolia Green', price: '$6' },
  ],
};

export const milkTeas: TVMenuSectionData = {
  title: 'Milk Teas',
  subtitle: 'Iced or Hot · Dairy or Oat',
  items: [
    {
      code: '20',
      name: 'Brown Sugar Milk Tea',
      description: '(Decaf Available)',
      price: '$8',
    },
    { code: '21', name: 'Black Milk Tea', qualifier: '(Decaf Available)', price: '$7' },
    { code: '22', name: 'Lychee Black Milk Tea', price: '$7' },
    { code: '23', name: 'Roasted Oolong Milk Tea', price: '$7' },
    { code: '24', name: 'White Peach Oolong Milk Tea', price: '$7' },
    { code: '25', name: 'Jasmine Green Milk Tea', price: '$7' },
    { code: '26', name: 'Magnolia Green Milk Tea', price: '$7' },
    { code: '27', name: 'Classic Thai Tea', qualifier: '(Iced Only)', price: '$7' },
    { code: '28', name: 'Crème Brûlée Thai Tea', qualifier: '(Iced Only)', price: '$8' },
    { code: '29', name: 'Masala Chai Tea', qualifier: '(Decaf Available)', price: '$7' },
  ],
};

export const matcha: TVMenuSectionData = {
  title: 'Matcha',
  subtitle: 'Iced or Hot · Dairy or Oat',
  items: [
    { code: '31', name: 'Matcha Latte', price: '$7' },
    { code: '32', name: 'Brown Sugar Matcha Latte', price: '$7.5' },
    { code: '33', name: 'Strawberry Matcha Latte', price: '$8' },
    { code: '34', name: 'Mango Matcha Latte', price: '$8' },
    { code: '35', name: 'Raspberry Cream Matcha Latte', description: '(Iced Only)', price: '$8' },
  ],
};

export const milkDrinks: TVMenuSectionData = {
  title: 'Milk Drinks',
  subtitle: 'Iced Only · Dairy or Oat · Caffeine-Free',
  items: [
    { code: '41', name: 'Tiger Milk', qualifier: '(with boba)', price: '$7' },
    { code: '42', name: 'Crème Brûlée Tiger Milk', qualifier: '(with boba)', price: '$8' },
    { code: '43', name: 'Strawberry Milk', price: '$7' },
    { code: '44', name: 'Korean Mango Milk', price: '$7' },
    { code: '45', name: 'Horchata de Avena', description: 'oat milk horchata', price: '$7' },
  ],
};

export const fruitTeas: TVMenuSectionData = {
  title: 'Fruit Teas',
  subtitle: 'Iced or Hot · Made with all-natural fruit purée',
  items: [
    { code: '51', name: 'Lychee Jasmine Green', price: '$7' },
    { code: '52', name: 'Strawberry Peach Jade Oolong', price: '$7' },
    { code: '53', name: 'Mango Passionfruit Jasmine Green', price: '$7' },
    { code: '54', name: 'Peach Lychee Magnolia Green', price: '$7' },
    { code: '55', name: 'Build Your Own Fruit Tea', price: '$7' },
  ],
};

export const lemonades: TVMenuSectionData = {
  title: 'Smash Lemonades',
  subtitle: 'Iced Only · Caffeine-Free',
  items: [
    { code: '61', name: 'Lemonade', price: '$6' },
    { code: '62', name: 'Strawberry Lemonade', price: '$7' },
    { code: '63', name: 'Mango Lemonade', price: '$7' },
    { code: '64', name: 'Passionfruit Lemonade', price: '$7' },
    { code: '65', name: 'Rose Hibiscus Lemonade', price: '$7' },
    { code: '66', name: 'Ginger Lemonade', price: '$7' },
  ],
};

export const blendedDrinks: TVMenuSectionData = {
  title: 'Blended Drinks',
  subtitle: 'Iced Only',
  items: [
    {
      code: '71',
      name: 'Golden Mango',
      qualifier: 'Caffeine-Free',
      description: '½ lb. organic mango',
      price: '$8',
    },
    {
      code: '72',
      name: 'Jasmine Mango',
      description: '½ lb. organic mango, jasmine tea',
      price: '$8',
    },
    {
      code: '73',
      name: 'Coco Mango',
      qualifier: 'Caffeine-Free',
      description: '½ lb. organic mango, coconut cream',
      price: '$8',
    },
    {
      code: '74',
      name: 'Mangonada',
      qualifier: 'Caffeine-Free',
      description: '½ lb. organic mango, Chamoy and Tajín',
      price: '$8',
    },
    {
      code: '75',
      name: 'Mango Grapefruit Crystal',
      qualifier: 'Caffeine-Free Optional',
      description:
        'organic mango, jasmine tea (optional), coconut cream,\ngrapefruit pulp and crystal boba',
      price: '$8.5',
    },
    {
      code: '76',
      name: 'Dino Freeze (Build Your Own)',
      qualifier: 'Caffeine-Free',
      description: 'icy and refreshing, made with real fruit purée',
      price: '$6.5',
    },
  ],
};

export const coffee: TVMenuSectionData = {
  title: 'Vietnamese Coffee',
  subtitle: 'Iced Only · Dairy, Oat or Coconut',
  items: [
    { code: '81', name: 'Vietnamese Iced Coffee', price: '$7' },
    { code: '82', name: 'Crème Brûlée Vietnamese Iced Coffee', price: '$8' },
    { code: '83', name: 'Pistachio Cream Vietnamese Iced Coffee', price: '$8' },
    {
      code: '84',
      name: 'Dirty Horchata de Avena',
      description: 'oat milk horchata with coffee\n(add caramel +$1)',
      price: '$8',
    },
  ],
};

export const hotDrinks: TVMenuSectionData = {
  title: 'Hot Drinks',
  items: [
    { code: '91', name: 'Hazelnut Hot Chocolate', price: '$6' },
    { code: '92', name: 'Masala Chai Hot Chocolate', price: '$7' },
    { code: '93', name: 'Hot Honey Yuzu Tea', qualifier: 'Caffeine-Free', price: '$5' },
    { code: '94', name: 'Hot Ginger Honey Yuzu Tea', qualifier: 'Caffeine-Free', price: '$6' },
    {
      code: '95',
      name: 'Spiced Apple Cider',
      qualifier: 'Caffeine-Free',
      description: '(add vanilla ice cream +$2)',
      price: '$5',
    },
    {
      code: '96',
      name: 'Caramel Apple Cider',
      qualifier: 'Caffeine-Free',
      description: '(add vanilla ice cream +$2)',
      price: '$6',
    },
  ],
};

export const fruitChoices = 'Strawberry · Mango · Passionfruit · Peach · Lychee';
export const teaChoices = 'Jasmine Green · Magnolia Green · Four Seasons Jade Oolong';
