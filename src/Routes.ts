export const Routes = {
  ArticleList: '/articles/',
  ReadArticle: '/articles/read/:articleId',
  GenerateArticle: '/articles/generate',
  Cv: '/cv',
  Menu: '/menu',
  MangaList: '/manga',
  ChapterList: '/manga/chapters/:mangaId',
  ReadMangaChapter: '/manga/chapters/read/:chapterId',
  Info: '/info',
  OpCardList: '/gamecards/op',
  Loader: '/loader',
} as const;
export type RoutesEnum = (typeof Routes)[keyof typeof Routes];
