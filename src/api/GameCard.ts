import { EitherAsync, Right } from 'purify-ts';

import { mapFetchFactory } from '../service/MappedFetch';
import { FetchAuthMapError } from '../model/errors';
import { GameCard } from '../model/GameCard';
import { config } from '../configuration/ViteConfiguration';

export type GameCardFilters = {
  keyword?: string;
  types?: string;
  sets?: string;
  rarities?: string;
  features?: string;
  colors?: string;
  attributes?: string;
};

export type GetGameCards = (
  filters?: GameCardFilters,
) => EitherAsync<FetchAuthMapError, GameCard[]>;
export type GetGameCard = (id: string) => EitherAsync<FetchAuthMapError, GameCard>;
export const getGameCards: GetGameCards = (filters?: GameCardFilters) =>
  mapFetchFactory().fetch<GameCard[], GameCard[]>(
    `${config.baseUrl}/api/gamecards/op/all${getFilters(filters)}`,
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

const getFilters = (filters?: GameCardFilters) =>
  `${filters?.keyword ? `&keyword=${filters.keyword}` : ''}${
    filters?.types ? `&types=${filters.types}` : ''
  }${filters?.sets ? `&sets=${filters.sets}` : ''}${
    filters?.rarities ? `&rarities=${filters.rarities}` : ''
  }${filters?.features ? `&features=${filters.features}` : ''}${
    filters?.colors ? `&colors=${filters.colors}` : ''
  }${filters?.attributes ? `&attributes=${filters.attributes}` : ''}`;
