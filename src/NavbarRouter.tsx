import { InfoView } from './views/InfoView';
import { MeView } from './views/MeView';
import { ArticleListView } from './views/ArticleListView';
import { ReadArticleView } from './views/ReadArticleView';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GenerateArticleView } from './views/GenerateArticleView';
import { MenuView } from './views/MenuView';
import { MangaListView } from './views/MangaList';
import { ChapterListView } from './views/ChapterListView';
import { ReadMangaChapterView } from './views/ReadMangaChapterView';
import { ParamWrapper } from './components/misc/ParamsWrapper';
import { ErrorPopup } from './components/errors/ErrorPopup';
import { OpCardGridView } from './views/OpCardGridView';
import { Loader } from './components/misc/Loader';
import { DynamicBubbleNavbar } from './components/navbar/DynamicBubbleNavbar';
import { Routes as MyRoutes } from './Routes';

export const NavbarRouter: React.FC = () => {
  return (
    <DynamicBubbleNavbar>
      <Routes>
        <Route path={MyRoutes.Me} element={<MeView />} />
        <Route path={MyRoutes.Menu} element={<MenuView />} />
        <Route path={MyRoutes.ArticleList} element={<ArticleListView />} />
        <Route
          path={MyRoutes.ReadArticle}
          element={
            <ParamWrapper paramKey="articleId">
              {(articleId) => <ReadArticleView articleId={articleId} />}
            </ParamWrapper>
          }
        />
        <Route path={MyRoutes.GenerateArticle} element={<GenerateArticleView />} />
        <Route path={MyRoutes.OpCardList} element={<OpCardGridView />} />
        <Route path={MyRoutes.Info} element={<InfoView />} />
        <Route path={MyRoutes.MangaList} element={<MangaListView />} />
        <Route
          path={MyRoutes.ChapterList}
          element={
            <ParamWrapper paramKey="mangaId">
              {(mangaId) => <ChapterListView mangaId={mangaId} />}
            </ParamWrapper>
          }
        />
        <Route
          path={MyRoutes.ReadArticle}
          element={
            <ParamWrapper paramKey="articleId">
              {(articleId) => <ReadArticleView articleId={articleId} />}
            </ParamWrapper>
          }
        />
        <Route
          path={MyRoutes.ReadMangaChapter}
          element={
            <ParamWrapper paramKey="chapterId">
              {(chapterId) => <ReadMangaChapterView chapterId={chapterId} />}
            </ParamWrapper>
          }
        />
        <Route path={MyRoutes.Loader} element={<Loader />} />

        <Route path={MyRoutes.Absolute} element={<Navigate to={MyRoutes.Me} />} />

        <Route
          path={MyRoutes.Catchall}
          element={<ErrorPopup title={'Page not found'} message={'this is not a valid url'} />}
        />
      </Routes>
    </DynamicBubbleNavbar>
  );
};
