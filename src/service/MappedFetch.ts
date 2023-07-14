import { Either, EitherAsync, Left, Right } from 'purify-ts';

import { ApiError, FetchMapError, MappingError } from '../model/Errors';

export type MapFetch = {
  fetch: FetchWithMappings;
};

export type GenericMapper<K, T> = (input: K) => Either<MappingError, T>;

export type FetchWithMappings = <K, T>(
  url: string,
  config: RequestInit,
  mapper: GenericMapper<K, T>,
) => EitherAsync<FetchMapError, T>;

export const mapFetchFactory = (): MapFetch => ({
  fetch: mapFetch(),
});

const mapFetch =
  (): FetchWithMappings =>
  <K, T>(url: string, config: RequestInit, mapper: GenericMapper<K, T>) =>
    EitherAsync.fromPromise(() => fetchEither<K>(url, config))
      .map((res) => mapper(res))
      .join()
      .mapLeft((err) => err);

const fetchEither = <K>(url: string, config: RequestInit): Promise<Either<FetchMapError, K>> =>
  fetch(url, {
    ...config,
  })
    .then((res) =>
      res.status < 400
        ? Right(res.json() as K)
        : Left({
            type: 'api_error',
            code: res.status.toString(),
            message: res.statusText,
          } as ApiError),
    )
    .catch((err) =>
      Left({
        type: 'api_error',
        code: err.status ?? '0',
        message: err.message ?? 'Unknown Error on AuthService',
      }),
    );
