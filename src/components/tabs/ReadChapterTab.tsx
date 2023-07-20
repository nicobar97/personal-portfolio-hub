import styled from 'styled-components';
import { MobileFrame } from '../MobileFrame';
import { useQuery } from '@tanstack/react-query';
import { FetchAuthMapError, FetchMapError } from '../../model/errors';
import { AnimateFadeIn, AnimateFadeInDown } from '../animations/Animations';
import { LoaderContainer, Loader } from '../Loader';
import { handleError } from '../errors/ErrorPopup';
import { TabsEnum } from '../../model/Tabs';
import { Either } from 'purify-ts';
import { getChapter } from '../../api/Manga';
import { Chapter, SupportedProvider } from '../../model/Manga';

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

type Props = {
  changeTab: (tab: TabsEnum) => void;
  url: string;
  provider: SupportedProvider;
};

export const ReadChapterTab: React.FC<Props> = (props: Props) => {
  const query = useQuery<Either<FetchMapError, Chapter>, FetchMapError>({
    queryKey: ['chapter', props.url],
    queryFn: () => getChapter(props.provider, props.url).run(),
  });

  return (
    <Content>
      <MobileFrame>
        {query.isSuccess &&
          query.data
            .map((chapter) => (
              <AnimateFadeIn trigger={query.isSuccess}>
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
