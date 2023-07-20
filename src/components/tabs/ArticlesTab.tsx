import styled from 'styled-components';
import genArticleIcon from '../../assets/icons/ai-write.png';
import { MobileFrame } from '../MobileFrame';
import { AnimatedBox } from '../animations/AnimatedBox';
import { useThemeStore } from '../../stores/useThemeStore';
import { getArticles } from '../../api/Article';
import { useQuery } from '@tanstack/react-query';
import { SimpleArticle } from '../../model/Article';
import { FetchAuthMapError } from '../../model/errors';
import { AnimateFadeIn, AnimateFadeInDown } from '../animations/Animations';
import { LoaderContainer, Loader } from '../Loader';
import { handleError } from '../errors/ErrorPopup';
import { BubbleButton } from '../BubbleButton';
import { Tabs, TabsEnum } from '../../model/Tabs';
import { Either } from 'purify-ts';

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

type Props = {
  openArticle: (articleId: string) => void;
  changeTab: (tab: TabsEnum) => void;
};

export const ArticlesTab: React.FC<Props> = (props: Props) => {
  const themeStyle = useThemeStore();

  const query = useQuery<Either<FetchAuthMapError, SimpleArticle[]>, FetchAuthMapError>({
    queryKey: ['articles'],
    queryFn: () => getArticles().run(),
  });

  return (
    <Content>
      <MobileFrame>
        {query.isSuccess &&
          query.data
            .map((articles) =>
              articles
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map((article) => (
                  <AnimateFadeIn trigger={query.isSuccess}>
                    <Clickable onClick={() => props.openArticle(article.id)}>
                      <AnimatedBox themestyle={themeStyle.style}>
                        <Info>On {parseDate(article.date)}</Info>
                        <Title onClick={() => props.openArticle(article.id)}>{article.title}</Title>
                        <Text>{article.content}</Text>
                        <Info>
                          <strong>Tags:</strong> {article.tags.join(', ')}
                        </Info>
                        <Info>
                          Read it in <strong>{article.estimatedReadingTimeMinutes} minutes</strong>
                        </Info>
                      </AnimatedBox>
                    </Clickable>
                    <BubbleContainer>
                      <BubbleButton
                        onBubbleClick={() => props.changeTab(Tabs.GenerateArticle)}
                        rounded={true}
                        scale={1.2}
                        darkModeInvert={false}
                        iconSrc={genArticleIcon}
                        style={themeStyle.style}
                        label="Generate"
                        borderSize={1}
                      />
                    </BubbleContainer>
                  </AnimateFadeIn>
                )),
            )
            .mapLeft((err: FetchAuthMapError) => (
              <AnimateFadeInDown trigger={query.isSuccess}>
                <MobileFrame>{handleError(err)}</MobileFrame>
              </AnimateFadeInDown>
            ))
            .extract()}

        {query.isError && (
          <AnimateFadeInDown trigger={query.isError}>
            <MobileFrame>{handleError(query.error)}</MobileFrame>
          </AnimateFadeInDown>
        )}
        {query.isLoading && (
          <AnimateFadeInDown trigger={query.isLoading}>
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
