import styled from 'styled-components';
import { MobileFrame } from '../components/misc/MobileFrame';
import { useQuery } from '@tanstack/react-query';
import { FetchAuthMapError, FetchMapError } from '../model/errors';
import {
  AnimateFade,
  AnimateFadeIn,
  AnimateFadeInDown,
} from '../components/animations/Animations';
import { FullPageDotLoader } from '../components/misc/FullPageDotLoader';
import { handleError } from '../components/errors/ErrorPopup';
import { Either } from 'purify-ts';
import { getChapter } from '../api/Manga';
import { Chapter, SupportedProviders } from '../model/Manga';
// import { useNavbarStore } from '../stores/useNavbarStore';
// import { Bubbles } from '../model/Bubbles';
// import { arraysAreEqual } from '../Utils';

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

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const Title = styled.h3``;

type Props = {
  chapterId: string;
};

export const ReadMangaChapterView: React.FC<Props> = (props: Props) => {
  const provider = SupportedProviders.TCBScans;
  const query = useQuery<Either<FetchMapError, Chapter>, FetchMapError>({
    queryKey: ['chapter', props.chapterId, provider],
    queryFn: () => getChapter(provider, atob(props.chapterId)).run(),
  });

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {query.isSuccess &&
            query.data
              .map((chapter) => (
                <AnimateFadeIn trigger={query.isSuccess}>
                  <Title>{chapter.title}</Title>
                  {chapter.pages.map((page) => (
                    <Image src={page.url} />
                  ))}
                </AnimateFadeIn>
              ))
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
                <FullPageDotLoader />
              </MobileFrame>
            </AnimateFadeInDown>
          )}
        </MobileFrame>
      </Content>
    </AnimateFade>
  );
};
