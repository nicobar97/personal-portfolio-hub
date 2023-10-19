import styled from 'styled-components';
import { MobileFrame } from '../components/misc/MobileFrame';
import { AnimatedBox } from '../components/animations/AnimatedBox';
import { useQuery } from '@tanstack/react-query';
import { FetchAuthMapError, FetchMapError } from '../model/errors';
import {
  AnimateFade,
  AnimateFadeIn,
  AnimateFadeInDown,
} from '../components/animations/Animations';
import { Loader } from '../components/misc/Loader';
import { handleError } from '../components/errors/ErrorPopup';
import { Either } from 'purify-ts';
import { getChapters } from '../api/Manga';
import { ChapterList, SupportedProviders } from '../model/Manga';
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

const Title = styled.h2`
  margin: 0rem;
  cursor: pointer;
`;

const Clickable = styled.div`
  cursor: pointer;
`;

const Info = styled.p`
  margin: 0rem;
  font-style: italic;
  cursor: text;
`;

type Props = {
  mangaId: string;
};

const getChapterUrl = (chapterId: string) =>
  Routes.ReadMangaChapter.replace(':chapterId', btoa(chapterId));

export const ChapterListView: React.FC<Props> = (props: Props) => {
  const provider = SupportedProviders.TCBScans;

  const navigate = useNavigate();
  const query = useQuery<Either<FetchMapError, ChapterList>, FetchMapError>({
    queryKey: ['chapters', props.mangaId, provider],
    queryFn: () => getChapters(provider, atob(props.mangaId)).run(),
  });

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {query.isSuccess &&
            query.data
              .map((mangaList) =>
                mangaList.chapters.map((chapter) => (
                  <AnimateFadeIn trigger={query.isSuccess}>
                    <Clickable onClick={() => navigate(getChapterUrl(chapter.url))}>
                      <AnimatedBox>
                        <Title>{chapter.title}</Title>
                        <Info>
                          <strong>Provider:</strong> {chapter.provider}
                        </Info>
                      </AnimatedBox>
                    </Clickable>
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
                <Loader />
              </MobileFrame>
            </AnimateFadeInDown>
          )}
        </MobileFrame>
      </Content>
    </AnimateFade>
  );
};
