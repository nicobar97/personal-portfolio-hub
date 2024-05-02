import { MeView } from './views/MeView';
import { ArticleListView } from './views/ArticleListView';
import { ReadArticleView } from './views/ReadArticleView';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GenerateArticleView } from './views/GenerateArticleView';
import { ParamWrapper } from './components/misc/ParamsWrapper';
import { ErrorPopup } from './components/errors/ErrorPopup';
import { FullPageDotLoader } from './components/misc/FullPageDotLoader';
import { Routes as MyRoutes } from './Routes';
import { DynamicBubbleNavbar } from './components/navbar/DynamicBubbleNavbar';
import { Bacon } from './views/Bacon';
import { TrainTableView } from './views/TrainTableView';
import { TrainListView } from './views/TrainListView';

export const NavbarRouter: React.FC = () => {
  return (
    <DynamicBubbleNavbar>
      <Routes>
        <Route path={MyRoutes.Me} element={<MeView />} />
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
        <Route
          path={MyRoutes.ReadArticle}
          element={
            <ParamWrapper paramKey="articleId">
              {(articleId) => <ReadArticleView articleId={articleId} />}
            </ParamWrapper>
          }
        />
        <Route
          path={MyRoutes.TrainTable}
          element={
            <ParamWrapper paramKey="placeId">
              {(placeId) => <TrainTableView placeId={placeId} />}
            </ParamWrapper>
          }
        />
        <Route path={MyRoutes.TrainList} element={<TrainListView />} />
        <Route path={MyRoutes.Loader} element={<FullPageDotLoader />} />
        <Route path={'/bacon'} element={<Bacon />} />
        <Route path={MyRoutes.Absolute} element={<Navigate to={MyRoutes.Me} />} />
        <Route
          path={MyRoutes.Catchall}
          element={<ErrorPopup title={'Page not found'} message={'this is not a valid url'} />}
        />
      </Routes>
    </DynamicBubbleNavbar>
  );
};
