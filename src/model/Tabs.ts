export const Tabs = {
  Home: 'home',
  Menu: 'menu',
  Info: 'info',
};

export type TabsEnum = (typeof Tabs)[keyof typeof Tabs];
