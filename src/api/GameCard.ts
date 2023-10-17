import { EitherAsync, Right } from 'purify-ts';

import { mapFetchFactory } from '../service/MappedFetch';
import { FetchAuthMapError } from '../model/errors';
import { GameCard } from '../model/GameCard';
import { config } from '../configuration/ViteConfiguration';

export type GetGameCards = () => EitherAsync<FetchAuthMapError, GameCard[]>;
export type GetGameCard = (id: string) => EitherAsync<FetchAuthMapError, GameCard>;
export const getGameCards: GetGameCards = () =>
  mapFetchFactory().fetch<GameCard[], GameCard[]>(
    `${config.baseUrl}/api/gamecards/op/all`,
    { method: 'GET' },
    (gameCards) =>
      Right(
        gameCards.map((card) => ({
          ...card,
          image: {
            en: `${card.image.en.replace(
              'https://en.onepiece-cardgame.com',
              'https://nicobar97backend.imgix.net',
            )}`,
            jp: card.image.jp,
          },
        })),
      ),
  );

export const getGameCard: GetGameCard = (id: string) =>
  mapFetchFactory().fetch<GameCard, GameCard>(
    `${config.baseUrl}/api/gamecards/op/get/${id}`,
    { method: 'GET' },
    (card) => Right(card),
  );
