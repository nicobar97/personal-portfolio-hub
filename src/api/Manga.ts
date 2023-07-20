import { EitherAsync, Right } from 'purify-ts';
import { mapFetchFactory } from '../service/MappedFetch';
import { FetchMapError } from '../model/errors';
import { Chapter, ChapterList, MangaList, SupportedProvider } from '../model/Manga';

export type GetMangas = (provider: SupportedProvider) => EitherAsync<FetchMapError, MangaList>;
export type GetChapters = (
  provider: SupportedProvider,
  url: string,
) => EitherAsync<FetchMapError, ChapterList>;
export type GetChapter = (
  provider: SupportedProvider,
  url: string,
) => EitherAsync<FetchMapError, Chapter>;

export const getMangas: GetMangas = (provider: SupportedProvider) =>
  mapFetchFactory().fetch<MangaList, MangaList>(
    `https://nicobar-portfolio-backend-2a94882f04a5.herokuapp.com/api/manga/list`,
    { method: 'POST', body: JSON.stringify({ provider }) },
    (mangas) => Right(mangas),
  );

export const getChapters: GetChapters = (provider: SupportedProvider, url: string) =>
  mapFetchFactory().fetch<ChapterList, ChapterList>(
    `https://nicobar-portfolio-backend-2a94882f04a5.herokuapp.com/api/manga/chapter/list`,
    { method: 'POST', body: JSON.stringify({ provider, url }) },
    (mangas) => Right(mangas),
  );

export const getChapter: GetChapter = (provider: SupportedProvider, url: string) =>
  mapFetchFactory().fetch<Chapter, Chapter>(
    `https://nicobar-portfolio-backend-2a94882f04a5.herokuapp.com/api/manga/read`,
    { method: 'POST', body: JSON.stringify({ provider, url }) },
    (mangas) => Right(mangas),
  );
