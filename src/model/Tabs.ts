type Home = 'home';
const home: Home = 'home';
type Menu = 'menu';
const menu: Menu = 'menu';
type Info = 'info';
const info: Info = 'info';
type Articles = 'articles';
const articles: Articles = 'articles';
type ReadArticle = 'readArticle';
const readArticle: ReadArticle = 'readArticle';

export const Tabs = {
  Home: home,
  Menu: menu,
  Info: info,
  ReadArticle: readArticle,
  Articles: articles,
};

export type TabsEnum = (typeof Tabs)[keyof typeof Tabs];
