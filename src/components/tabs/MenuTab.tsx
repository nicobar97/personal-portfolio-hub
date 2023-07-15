import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { AnimatedBox } from '../animations/AnimatedBox';
import { useThemeStore } from '../../stores/useThemeStore';
import { getArticles } from '../../api/Article';
import { useQuery } from '@tanstack/react-query';
import { Article } from '../../model/Article';
import { FetchAuthMapError } from '../../model/errors';
import { PageStatus } from '../../model/Page';
import { useState } from 'react';
import { AnimateFadeIn, AnimateFadeInDown } from '../animations/Animations';
import { LoaderContainer, Loader } from '../Loader';
import { handleError } from '../errors/ErrorPopup';

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
`;

const MainTitle = styled.h1`
  margin: 0rem;
`;

// const Title = styled.h2`
//   margin: 0rem;
// `;

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
  articles: Article[];
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

export const MenuTab: React.FC = () => {
  const themeStyle = useThemeStore();
  const [pageState, setPageState] = useState<PageState>({ status: 'loading' });
  const query = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles().run(),
  });

  query.data &&
    query.data
      .map((data: Article[]) => {
        if (pageState.status !== PageStatus.SUCCESS) {
          setPageState({ status: PageStatus.SUCCESS, articles: data });
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

  return (
    <Content>
      <MobileFrame>
        {pageState.status === PageStatus.ERROR && (
          <AnimateFadeInDown trigger={pageState.status === PageStatus.ERROR}>
            <MobileFrame>{handleError(pageState.error)}</MobileFrame>
          </AnimateFadeInDown>
        )}

        <AnimateFadeInDown trigger={pageState.status === PageStatus.LOADING}>
          <MobileFrame>
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          </MobileFrame>
        </AnimateFadeInDown>
        {pageState.status === PageStatus.SUCCESS && (
          <AnimateFadeIn trigger={pageState.status === PageStatus.SUCCESS}>
            {pageState.articles
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((article) => (
                <AnimatedBox themeStyle={themeStyle.style}>
                  <MainTitle>{article.title}</MainTitle>
                  <SubSubTitle>
                    Read it in {article.estimatedReadingTimeMinutes} minutes
                  </SubSubTitle>
                  <div>{article.formatted_content}</div>
                  <Info>
                    <strong>Tags:</strong> {article.tags.join(', ')}
                  </Info>
                  <Info>
                    <strong>Related Fields:</strong> {article.relatedTopicsTags.join(', ')}
                  </Info>
                  <Info>
                    <strong>Generated on:</strong> {parseDate(article.date)}
                  </Info>
                </AnimatedBox>
              ))}
          </AnimateFadeIn>
        )}
      </MobileFrame>
    </Content>
  );
};
