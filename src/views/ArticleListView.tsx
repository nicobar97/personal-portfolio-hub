import styled from 'styled-components';
import genArticleIcon from '../assets/icons/ai-write.png';
import { MobileFrame } from '../components/misc/MobileFrame';
import { AnimatedBox } from '../components/animations/AnimatedBox';
import { getArticles } from '../api/Article';
import { useQuery } from '@tanstack/react-query';
import { SimpleArticle } from '../model/Article';
import { FetchAuthMapError } from '../model/errors';
import {
  AnimateFade,
  AnimateFadeIn,
  AnimateFadeInDown,
} from '../components/animations/Animations';
import { Loader } from '../components/misc/Loader';
import { handleError } from '../components/errors/ErrorPopup';
import { BubbleButton } from '../components/navbar/BubbleButton';
import { Either } from 'purify-ts';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../Routes';

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

const BubbleContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 2rem;
`;

const Title = styled.h2`
  margin: 0rem;
  cursor: pointer;
`;

const Clickable = styled.div`
  cursor: pointer;
`;

const Text = styled.div`
  cursor: text;
`;

const Info = styled.p`
  margin: 0rem;
  font-style: italic;
  cursor: text;
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

export const ArticleListView: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery<Either<FetchAuthMapError, SimpleArticle[]>, FetchAuthMapError>({
    queryKey: ['articles'],
    queryFn: () => getArticles().run(),
  });

  const getReadArticleUrl = (articleId: string) => Routes.ReadArticle.replace(':articleId', articleId);

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {query.isSuccess && (
            <AnimateFadeIn trigger={query.isSuccess}>
              {query.data
                .map((articles) =>
                  articles
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map((article) => (
                      <Clickable onClick={() => navigate(getReadArticleUrl(article.id))}>
                        <AnimatedBox>
                          <Info>On {parseDate(article.date)}</Info>
                          <Title>{article.title}</Title>
                          <Text>{article.content}</Text>
                          <Info>
                            <strong>Tags:</strong> {article.tags.join(', ')}
                          </Info>
                          <Info>
                            Read it in{' '}
                            <strong>{article.estimatedReadingTimeMinutes} minutes</strong>
                          </Info>
                        </AnimatedBox>
                      </Clickable>
                    )),
                )
                .mapLeft((err: FetchAuthMapError) => (
                  <AnimateFadeInDown trigger={query.isSuccess}>
                    <MobileFrame>{handleError(err)}</MobileFrame>
                  </AnimateFadeInDown>
                ))
                .extract()}
              <BubbleContainer>
                <BubbleButton
                  onBubbleClick={() => navigate(Routes.GenerateArticle)}
                  rounded={true}
                  scale={1.2}
                  darkModeInvert={false}
                  iconSrc={genArticleIcon}
                  label="Generate"
                  borderSize={1}
                />
              </BubbleContainer>
            </AnimateFadeIn>
          )}

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
        </MobileFrame>
      </Content>
    </AnimateFade>
  );
};
