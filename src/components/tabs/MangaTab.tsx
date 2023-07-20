import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { AnimatedBox } from '../animations/AnimatedBox';
import { useThemeStore } from '../../stores/useThemeStore';
import { useQuery } from '@tanstack/react-query';
import { FetchAuthMapError, FetchMapError } from '../../model/errors';
import { AnimateFadeIn, AnimateFadeInDown } from '../animations/Animations';
import { LoaderContainer, Loader } from '../Loader';
import { handleError } from '../errors/ErrorPopup';
import { TabsEnum } from '../../model/Tabs';
import { Either } from 'purify-ts';
import { getMangas } from '../../api/Manga';
import { MangaList, SupportedProvider } from '../../model/Manga';

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

type Props = {
  openManga: (url: string) => void;
  changeTab: (tab: TabsEnum) => void;
  provider: SupportedProvider;
};

export const MangaTab: React.FC<Props> = (props: Props) => {
  const themeStyle = useThemeStore();

  const query = useQuery<Either<FetchMapError, MangaList>, FetchMapError>({
    queryKey: ['mangas'],
    queryFn: () => getMangas(props.provider).run(),
  });

  return (
    <Content>
      <MobileFrame>
        {query.isSuccess &&
          query.data
            .map((mangaList) =>
              mangaList.mangas.map((manga) => (
                <AnimateFadeIn trigger={query.isSuccess}>
                  <Clickable
                    onClick={() => {
                      console.log(manga.url);
                      return props.openManga(manga.url);
                    }}
                  >
                    <AnimatedBox themestyle={themeStyle.style}>
                      <Title onClick={() => props.openManga(manga.url)}>{manga.title}</Title>
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
