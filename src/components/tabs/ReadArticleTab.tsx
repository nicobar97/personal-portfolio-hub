import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { AnimatedBox } from '../animations/AnimatedBox';
import { useThemeStore } from '../../stores/useThemeStore';
import { getArticle } from '../../api/Article';
import { useQuery } from '@tanstack/react-query';
import { Article } from '../../model/Article';
import { FetchAuthMapError } from '../../model/errors';
import { PageStatus, PageStatusEnum } from '../../model/Page';
import { useEffect, useState } from 'react';
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
  margin-top: 0.5rem;
  padding: 1.5rem;
  overflow-x: hidden;
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

const Section = styled.div`
  margin-top: 1rem;
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
  article: Article;
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

type Props = {
  articleId: string;
  status: PageStatusEnum;
};

export const ReadArticleTab: React.FC<Props> = (props: Props) => {
  const themeStyle = useThemeStore();
  const [pageState, setPageState] = useState<PageState>({ status: PageStatus.LOADING });

  const query = useQuery({
    queryKey: ['article'],
    queryFn: () => getArticle(props.articleId).run(),
  });

  useEffect(() => {
    query.refetch();
  }, [props]);

  query.data &&
    query.data
      .map((data: Article) => {
        if (pageState.status !== PageStatus.SUCCESS) {
          setPageState({ status: PageStatus.SUCCESS, article: data });
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
        {pageState.status === PageStatus.LOADING && (
          <AnimateFadeInDown trigger={pageState.status === PageStatus.LOADING}>
            <MobileFrame>
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            </MobileFrame>
          </AnimateFadeInDown>
        )}
        {pageState.status === PageStatus.SUCCESS && (
          <AnimateFadeIn trigger={pageState.status === PageStatus.SUCCESS}>
            <AnimatedBox themestyle={themeStyle.style}>
              <Title>{pageState.article.title}</Title>
              <SubSubTitle>
                Read it in {pageState.article.estimatedReadingTimeMinutes} minutes
              </SubSubTitle>
              <div>
                {pageState.article.content.split('\n\n').map((section) => (
                  <Section>{section}</Section>
                ))}
              </div>
              <Info>
                <strong>Tags:</strong> {pageState.article.tags.join(', ')}
              </Info>
              <Info>
                <strong>Generated on:</strong> {parseDate(pageState.article.date)}
              </Info>
            </AnimatedBox>
          </AnimateFadeIn>
        )}
      </MobileFrame>
    </Content>
  );
};
