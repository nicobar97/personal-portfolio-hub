import { EitherAsync, Right } from 'purify-ts';

import { mapFetchFactory } from '../service/MappedFetch';
import { FetchAuthMapError } from '../model/errors';
import { GameCard } from '../model/GameCard';

export type GetGameCards = () => EitherAsync<FetchAuthMapError, GameCard[]>;
export type GetGameCard = (id: string) => EitherAsync<FetchAuthMapError, GameCard>;
export const getGameCards: GetGameCards = () =>
  mapFetchFactory().fetch<GameCard[], GameCard[]>(
    `https://nicobar-portfolio-backend-2a94882f04a5.herokuapp.com/api/gamecards/op/all`,
    { method: 'GET' },
    (gameCards) => Right(gameCards),
  );

export const getGameCard: GetGameCard = (id: string) =>
  mapFetchFactory().fetch<GameCard, GameCard>(
    `https://nicobar-portfolio-backend-2a94882f04a5.herokuapp.com/api/gamecards/op/get/${id}`,
    { method: 'GET' },
    (article) => Right(article),
  );
