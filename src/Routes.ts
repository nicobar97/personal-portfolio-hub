export const Routes = {
  ArticleList: '/articles/',
  ReadArticle: '/articles/read/:articleId',
  GenerateArticle: '/articles/generate',
  Me: '/me',
  Menu: '/menu',
  MangaList: '/manga',
  ChapterList: '/manga/chapters/:mangaId',
  ReadMangaChapter: '/manga/chapters/read/:chapterId',
  Info: '/info',
  OpCardList: '/gamecards/op',
  Loader: '/loader',
  Absolute: '/',
  Catchall: '*',
} as const;

export type RoutesEnum = (typeof Routes)[keyof typeof Routes];
