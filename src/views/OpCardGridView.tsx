import styled from 'styled-components';
import { MobileFrame } from '../components/misc/MobileFrame';
import { getGameCards } from '../api/GameCard';
import { useQuery } from '@tanstack/react-query';
import { FetchAuthMapError } from '../model/errors';
import { AnimateFade, AnimateFadeIn, AnimateFadeInDown } from '../components/animations/Animations';
import { FullPageDotLoader } from '../components/misc/FullPageDotLoader';
import { handleError } from '../components/errors/ErrorPopup';
import { Either } from 'purify-ts';
import { GameCard } from '../model/GameCard';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CardShow } from '../components/cards/CardShow';
import { CardPreview } from '../components/cards/CardPreview';

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
  margin-top: 1rem;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 2fr));
  max-width: 100%;
  justify-items: center;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 20rem;
  height: 1rem;
  padding: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 2rem;
  border: none;
  box-shadow: ${(props) => props.theme.shadow} 0px 7px 20px 0px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 0.5rem;
`;

export const OpCardGridView: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selected, setSelected] = useState<GameCard | null>(null);

  const query = useQuery<Either<FetchAuthMapError, GameCard[]>, FetchAuthMapError>({
    queryKey: ['gameCards', searchKeyword],
    queryFn: () => getGameCards({ keyword: searchKeyword }).run(),
  });

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {(searchKeyword || query.isSuccess) && (
            <SearchBarContainer>
              <SearchBar
                type="text"
                placeholder="Search for cards..."
                value={searchKeyword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchKeyword(event.target.value)
                }
              />
            </SearchBarContainer>
          )}
          {query.isSuccess && (
            <AnimateFadeIn trigger={query.isSuccess}>
              <Container>
                <CardGrid>
                  {query.data
                    .map((gameCards) =>
                      gameCards
                        .sort()
                        .map((gameCard) => (
                          <CardPreview card={gameCard} onClick={() => setSelected(gameCard)} />
                        )),
                    )
                    .mapLeft(() => (
                      <AnimateFadeInDown trigger={query.isSuccess}>
                        No card found for keyword: {searchKeyword}
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
                <FullPageDotLoader />
              </MobileFrame>
            </AnimateFadeInDown>
          )}
        </MobileFrame>
      </Content>
    </AnimateFade>
  );
};
