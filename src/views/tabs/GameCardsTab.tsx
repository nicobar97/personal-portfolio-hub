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
import { CardShow } from '../../components/cards/CardShow';

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
  padding: .5rem;
  &:hover {
    transform: scale(1.05);
  }
`;

const CardHeader = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: .5rem;
  padding-top: 0rem;
`;

const OverTitle = styled(motion.h5)`
  font-size: 0.5rem;
  margin: 0;
`;

const Title = styled(motion.h2)`
  font-size: .8rem;
  margin: 0;
`;

const SubTitle = styled(motion.h3)`
  font-size: 0.4rem;
  margin: 0;
`;

// const CardTitle = styled(motion.h2)`
//   font-size: 1rem;
//   margin: 0;
// `;

// const CardRarity = styled(motion.h3)`
//   font-size: 0.5rem;
//   margin: 0.5rem 0;
//   color: ${(props) => props.theme.text};
// `;

const CardImage = styled(motion.img)`
  width: 100%;
  border-radius: 0.5rem;
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
                          <CardHeader>
                            <OverTitle>{gameCard.slug}</OverTitle>
                            <Title>{gameCard.name}</Title>
                            <SubTitle>{gameCard.set}</SubTitle>
                          </CardHeader>
                          <CardImage
                            src={`${gameCard.image.en}?auto=format&dpr=1&fit=crop&w=256`}
                            alt={gameCard.name}
                            loading="lazy"
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
                    <CardShow card={selected} onClose={() => setSelected(null)}></CardShow>
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
