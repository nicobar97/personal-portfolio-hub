import styled from 'styled-components';
import { MobileFrame } from '../../components/MobileFrame';
import { getGameCards } from '../../api/GameCard';
import { useQuery } from '@tanstack/react-query';
import { FetchAuthMapError } from '../../model/errors';
import {
  AnimateFade,
  AnimateFadeIn,
  AnimateFadeInDown,
} from '../../components/animations/Animations';
import { Loader } from '../../components/Loader';
import { handleError } from '../../components/errors/ErrorPopup';
import { TabsEnum } from '../../model/Tabs';
import { Either } from 'purify-ts';
import { GameCard } from '../../model/GameCard';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CardShow } from '../../components/cards/CardShow';
import { CardPreview } from '../../components/cards/CardPreview';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 0.5rem;
  overflow: hidden;
  padding: 1.5rem;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 2fr));
  max-width: 100%;
  justify-items: center;
`;

type Props = {
  changeTab: (tab: TabsEnum) => void;
};

export const GameCardsTab: React.FC<Props> = () => {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const query = useQuery<Either<FetchAuthMapError, GameCard[]>, FetchAuthMapError>({
    queryKey: ['gameCards', searchKeyword],
    queryFn: () => getGameCards({ keyword: searchKeyword }).run(),
  });

  const [selected, setSelected] = useState<GameCard | null>(null);

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {query.isSuccess && (
            <AnimateFadeIn trigger={query.isSuccess}>
              <Container>
                <input
                  type="text"
                  placeholder="Search for cards..."
                  onKeyDown={() => setSearchKeyword(keyword)}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <CardGrid>
                  {query.data
                    .map((gameCards) =>
                      gameCards
                        .sort()
                        .map((gameCard) => (
                          <CardPreview card={gameCard} onClick={() => setSelected(gameCard)} />
                        )),
                    )
                    .mapLeft((err: FetchAuthMapError) => (
                      <AnimateFadeInDown trigger={query.isSuccess}>
                        <MobileFrame>{handleError(err)}</MobileFrame>
                      </AnimateFadeInDown>
                    ))
                    .extract()}
                </CardGrid>
                <AnimatePresence>
                  {selected && <CardShow card={selected} onClose={() => setSelected(null)} />}
                </AnimatePresence>
              </Container>
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
