import styled from 'styled-components';
import { MobileFrame } from '../../components/MobileFrame';
import { AnimatedBox } from '../../components/AnimatedBox';
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

const Text = styled.div`
  cursor: text;
`;

const Image = styled.img`
  max-width: 22rem;
`;

type Props = {
  changeTab: (tab: TabsEnum) => void;
};

export const GameCardsTab: React.FC<Props> = () => {
  const query = useQuery<Either<FetchAuthMapError, GameCard[]>, FetchAuthMapError>({
    queryKey: ['gameCards'],
    queryFn: () => getGameCards().run(),
  });

  return (
    <AnimateFade>
      <Content>
        <MobileFrame>
          {query.isSuccess && (
            <AnimateFadeIn trigger={query.isSuccess}>
              {query.data
                .map((gameCards) =>
                  gameCards.sort().map((gameCard) => (
                    <AnimatedBox>
                      <Title>{gameCard.name}</Title>
                      <Text>
                        {gameCard.rarity} - {gameCard.rarity}
                      </Text>
                      <Image src={gameCard.image.en}></Image>
                    </AnimatedBox>
                  )),
                )
                .mapLeft((err: FetchAuthMapError) => (
                  <AnimateFadeInDown trigger={query.isSuccess}>
                    <MobileFrame>{handleError(err)}</MobileFrame>
                  </AnimateFadeInDown>
                ))
                .extract()}
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
