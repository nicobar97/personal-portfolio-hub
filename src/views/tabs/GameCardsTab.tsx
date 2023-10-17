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
import { AnimatePresence, motion } from 'framer-motion';

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

const Card = styled(motion.div)`
  display: inline-flex;
  width: 20%;
  min-width: 8rem;
  min-height: 8rem;
  margin: 0.5rem;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.background};
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset ${(props) => props.theme.background}99 2px 2px 30px;

  &:hover {
    transform: scale(1.05);
  }
`;

const OpenCardContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const OpenCard = styled(motion.div)`
  display: flex;
  width: 20%;
  min-width: 25rem;
  min-height: 35rem;
  margin: 0.5rem;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.background};
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset ${(props) => props.theme.background}99 2px 2px 30px;
`;

const CardTitle = styled(motion.h2)`
  font-size: 1rem;
  margin: 0;
`;

const CardRarity = styled(motion.h3)`
  font-size: 0.5rem;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.text};
`;

const CardImage = styled(motion.img)`
  width: 100%;
  max-height: 10rem;
  object-fit: cover;
  border-radius: 5px;
`;

const OpenCardTitle = styled(motion.h2)`
  font-size: 1.5rem;
  margin: 0;
`;

const OpenCardRarity = styled(motion.h3)`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.text};
`;

const OpenCardImage = styled(motion.img)`
  max-height: 20rem;
  border-radius: 5px;
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.text};
`;

const Container = styled.div`
  display: flex;
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
  const query = useQuery<Either<FetchAuthMapError, GameCard[]>, FetchAuthMapError>({
    queryKey: ['gameCards'],
    queryFn: () => getGameCards().run(),
  });

  const [selected, setSelected] = useState<GameCard | null>(null);

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {query.isSuccess && (
            <AnimateFadeIn trigger={query.isSuccess}>
              <Container>
                <CardGrid>
                  {query.data
                    .map((gameCards) =>
                      gameCards.sort().map((gameCard) => (
                        <Card
                          key={gameCard.id}
                          layoutId={gameCard.id}
                          onClick={() => setSelected(gameCard)}
                        >
                          <CardRarity>{gameCard.rarity}</CardRarity>
                          <CardTitle>{gameCard.name}</CardTitle>
                          <CardImage
                            src={`${gameCard.image.en}?auto=format&dpr=1&fit=crop&w=256`}
                            alt={gameCard.name}
                          />
                        </Card>
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
                  {selected && (
                    <OpenCardContainer>
                      <OpenCard layoutId={selected.id}>
                        <OpenCardRarity>{selected.rarity}</OpenCardRarity>
                        <OpenCardTitle>{selected.name}</OpenCardTitle>
                        <OpenCardImage
                          src={`${selected.image.en}?auto=format&dpr=1&w=1280`}
                          alt={selected.name}
                        />
                        <CloseButton onClick={() => setSelected(null)}>Close</CloseButton>
                      </OpenCard>
                    </OpenCardContainer>
                  )}
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
