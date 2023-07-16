export const Tabs = {
  Home: 'home',
  Menu: 'menu',
  Info: 'info',
  ReadArticle: 'read-article'
};

export type TabsEnum = (typeof Tabs)[keyof typeof Tabs];
