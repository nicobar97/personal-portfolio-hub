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
import { FullPageDotLoader } from '../components/misc/FullPageDotLoader';
import { handleError } from '../components/errors/ErrorPopup';
import { Either } from 'purify-ts';
import { getMangas } from '../api/Manga';
import { MangaList, SupportedProviders } from '../model/Manga';
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

const Image = styled.img`
  max-width: 22rem;
`;

const Info = styled.p`
  margin: 0rem;
  font-style: italic;
  cursor: text;
`;

const getMangaChapterListUrl = (chapterListId: string) => Routes.ChapterList.replace(':mangaId', btoa(chapterListId));

export const MangaListView: React.FC = () => {
  const navigate = useNavigate();
  const provider = SupportedProviders.TCBScans;
  const query = useQuery<Either<FetchMapError, MangaList>, FetchMapError>({
    queryKey: ['mangas', provider, provider],
    queryFn: () => getMangas(provider).run(),
  });

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {query.isSuccess &&
            query.data
              .map((mangaList) =>
                mangaList.mangas.map((manga) => (
                  <AnimateFadeIn trigger={query.isSuccess}>
                    <Clickable onClick={() => navigate(getMangaChapterListUrl(manga.url))}>
                      <AnimatedBox>
                        <Title>{manga.title}</Title>
                        <Info>
                          <strong>Provider:</strong> {manga.provider}
                        </Info>
                        <Image src={manga.image} />
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
                <FullPageDotLoader />
              </MobileFrame>
            </AnimateFadeInDown>
          )}
        </MobileFrame>
      </Content>
    </AnimateFade>
  );
};
