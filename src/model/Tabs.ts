type Home = 'home';
const home: Home = 'home';
type Menu = 'menu';
const menu: Menu = 'menu';
type ProjectInfo = 'projectInfo';
const projectInfo: ProjectInfo = 'projectInfo';
type Cv = 'cv';
const cv: Cv = 'cv';
type Info = 'info';
const info: Info = 'info';
type Articles = 'articles';
const articles: Articles = 'articles';
type ReadArticle = 'readArticle';
const readArticle: ReadArticle = 'readArticle';
const generateArticle: GenerateArticle = 'generateArticle';
type GenerateArticle = 'generateArticle';
type Mangas = 'mangas';
const mangas: Mangas = 'mangas';
type Chapters = 'chapters';
const chapters: Chapters = 'chapters';
type ReadChapter = 'readChapter';
const readChapter: ReadChapter = 'readChapter';
type Cards = 'cards';
const cards: Cards = 'cards';

export const Tabs = {
  Home: home,
  Menu: menu,
  Info: info,
  ProjectInfo: projectInfo,
  Cv: cv,
  Articles: articles,
  ReadArticle: readArticle,
  GenerateArticle: generateArticle,
  Mangas: mangas,
  Chapters: chapters,
  ReadChapter: readChapter,
  Cards: cards,
};

export type TabsEnum = (typeof Tabs)[keyof typeof Tabs];
