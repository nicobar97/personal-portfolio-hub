import { InfoView } from './views/InfoView';
import { NicobarView } from './views/NicobarView';
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
import { OpCardListView } from './views/OpCardListView';
import { Loader } from './components/misc/Loader';
import { DynamicBubbleNavbar } from './components/navbar/DynamicBubbleNavbar';

export const NavbarRouter: React.FC = () => {
  return (
    <DynamicBubbleNavbar>
      <Routes>
        <Route path="/cv" element={<NicobarView />} />
        <Route path="/menu" element={<MenuView />} />
        <Route path="/articles/" element={<ArticleListView />} />
        <Route
          path="/articles/read/:articleId"
          element={
            <ParamWrapper paramKey="articleId">
              {(articleId) => <ReadArticleView articleId={articleId} />}
            </ParamWrapper>
          }
        />
        <Route path="/articles/generate" element={<GenerateArticleView />} />
        <Route path="/gamecards/op" element={<OpCardListView />} />
        <Route path="/info" element={<InfoView />} />
        <Route path="/manga" element={<MangaListView />} />
        <Route
          path="/articles/read/:articleId"
          element={
            <ParamWrapper paramKey="articleId">
              {(articleId) => <ReadArticleView articleId={articleId} />}
            </ParamWrapper>
          }
        />
        <Route
          path="/manga/chapters/:mangaId"
          element={
            <ParamWrapper paramKey="mangaId">
              {(mangaId) => <ChapterListView mangaId={mangaId} />}
            </ParamWrapper>
          }
        />
        <Route
          path="/manga/chapters/read/:chapterId"
          element={
            <ParamWrapper paramKey="chapterId">
              {(chapterId) => <ReadMangaChapterView chapterId={chapterId} />}
            </ParamWrapper>
          }
        />
        <Route path="/loader" element={<Loader />} />

        <Route path="/" element={<Navigate to="/menu" />} />

        <Route
          path="*"
          element={<ErrorPopup title={'Page not found'} message={'this is not a valid url'} />}
        />
      </Routes>
    </DynamicBubbleNavbar>
  );
};
