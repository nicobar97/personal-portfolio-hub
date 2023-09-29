import styled from 'styled-components';
import { MobileFrame } from '../../components/MobileFrame';
import { AnimatedBox } from '../../components/AnimatedBox';
import { getArticle } from '../../api/Article';
import { useQuery } from '@tanstack/react-query';
import { Article } from '../../model/Article';
import { FetchAuthMapError } from '../../model/errors';
import {
  AnimateFade,
  AnimateFadeIn,
  AnimateFadeInDown,
} from '../../components/animations/Animations';
import { handleError } from '../../components/errors/ErrorPopup';
import { Either } from 'purify-ts';
import { Loader } from '../../components/Loader';

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
};

export const ReadArticleTab: React.FC<Props> = (props: Props) => {
  const query = useQuery<Either<FetchAuthMapError, Article>, FetchAuthMapError>({
    queryKey: ['article', props.articleId],
    queryFn: () => getArticle(props.articleId).run(),
  });

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {query.isError && (
            <AnimateFadeInDown trigger={query.isError}>
              <MobileFrame>{handleError(query.error)}</MobileFrame>
            </AnimateFadeInDown>
          )}
          {query.isLoading && (
            <AnimateFadeInDown trigger={query.isLoading}>
              <MobileFrame>
                <Loader />
              </MobileFrame>
            </AnimateFadeInDown>
          )}
          {query.isSuccess &&
            query.data &&
            query.data
              .map((article) => (
                <AnimateFadeIn trigger={query.isSuccess}>
                  <AnimatedBox>
                    <Title>{article.title}</Title>
                    <SubSubTitle>
                      Read it in {article.estimatedReadingTimeMinutes} minutes
                    </SubSubTitle>
                    <div>{splitArticleSection(article.content)}</div>
                    <Info>
                      <strong>Tags:</strong> {article.tags.join(', ')}
                    </Info>
                    <Info>
                      <strong>Generated on:</strong> {parseDate(article.date)}
                    </Info>
                  </AnimatedBox>
                </AnimateFadeIn>
              ))
              .mapLeft((error) => (
                <AnimateFadeInDown trigger={query.isSuccess}>
                  <MobileFrame>{handleError(error)}</MobileFrame>
                </AnimateFadeInDown>
              ))
              .extract()}
        </MobileFrame>
      </Content>
    </AnimateFade>
  );
};

const splitArticleSection = (content: string) =>
  content.split('\n\n').map((section) => <Section>{section}</Section>);
