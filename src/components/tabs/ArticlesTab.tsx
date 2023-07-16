import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { AnimatedBox } from '../animations/AnimatedBox';
import { useThemeStore } from '../../stores/useThemeStore';
import { getArticles } from '../../api/Article';
import { useQuery } from '@tanstack/react-query';
import { SimpleArticle } from '../../model/Article';
import { FetchAuthMapError } from '../../model/errors';
import { PageStatus } from '../../model/Page';
import { useState } from 'react';
import { AnimateFadeIn, AnimateFadeInDown } from '../animations/Animations';
import { LoaderContainer, Loader } from '../Loader';
import { handleError } from '../errors/ErrorPopup';
// import { TabState, useTabStore } from '../../stores/useTabStore';
// import { Tabs, TabsEnum } from '../../model/Tabs';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  overflow-x: hidden;
  margin-top: 0.5rem;
  padding: 1.5rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

// const MainTitle = styled.h1`
//   margin: 0rem;
// `;

const Title = styled.h2`
  margin: 0rem;
`;

// const SubTitle = styled.h3`
//   margin: 0rem;
// `;

const SubSubTitle = styled.h4`
  margin: 0rem;
`;

const Info = styled.p`
  margin: 0rem;
  font-style: italic;
`;

export type PageState = LoadingState | SuccessState | ErrorState;

type LoadingState = {
  status: 'loading';
};

type SuccessState = {
  status: 'success';
  articles: SimpleArticle[];
  articleId: string | null;
};

type ErrorState = {
  status: 'error';
  error: FetchAuthMapError;
};

const parseDate = (date: Date) =>
  date.toLocaleString('en-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Rome', // Time zone set to Italy
  });

// const handleArticleOpen = (articleId: string, setCurrentTab: (tab: TabsEnum) => {
//   window.history.pushState(null, '', `/article/${articleId}`);
//   tab.setTab(Tabs.ReadArticle, { articleId });
// };
type Props = {
  openArticle: (articleId: string) => void;
};

export const ArticlesTab: React.FC<Props> = (props: Props) => {
  const themeStyle = useThemeStore();

  const [pageState, setPageState] = useState<PageState>({ status: 'loading' });
  const query = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles().run(),
  });

  query.data &&
    query.data
      .map((data: SimpleArticle[]) => {
        if (pageState.status !== PageStatus.SUCCESS) {
          setPageState({ status: PageStatus.SUCCESS, articles: data, articleId: null });
        }
        return null;
      })
      .mapLeft((err: FetchAuthMapError) => {
        if (pageState.status !== PageStatus.ERROR) {
          setPageState({ status: PageStatus.ERROR, error: err });
        }
        return null;
      })
      .extract();

  if (pageState.status === PageStatus.SUCCESS) console.log(pageState.articles);

  return (
    <Content>
      <MobileFrame>
        {pageState.status === PageStatus.SUCCESS && (
          <AnimateFadeIn trigger={pageState.status === PageStatus.SUCCESS}>
            {pageState.articles
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((article) => (
                <AnimatedBox themestyle={themeStyle.style}>
                  // TODO
                  <Title onClick={() => props.openArticle(article.id)}>{article.title}</Title>
                  <SubSubTitle>
                    Read it in {article.estimatedReadingTimeMinutes} minutes
                  </SubSubTitle>
                  <div>{article.content}</div>
                  <Info>
                    <strong>Tags:</strong> {article.tags.join(', ')}
                  </Info>
                  <Info>
                    <strong>Generated on:</strong> {parseDate(article.date)}
                  </Info>
                </AnimatedBox>
              ))}
          </AnimateFadeIn>
        )}
        {pageState.status === PageStatus.ERROR && (
          <AnimateFadeInDown trigger={pageState.status === PageStatus.ERROR}>
            <MobileFrame>{handleError(pageState.error)}</MobileFrame>
          </AnimateFadeInDown>
        )}
        {pageState.status === PageStatus.LOADING && (
          <AnimateFadeInDown trigger={pageState.status === PageStatus.LOADING}>
            <MobileFrame>
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            </MobileFrame>
          </AnimateFadeInDown>
        )}
      </MobileFrame>
    </Content>
  );
};
