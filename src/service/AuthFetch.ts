import { Either, EitherAsync, Left, Right } from 'purify-ts';

import { AuthToken } from '../model/Authentication';
import {
  ApiError,
  AuthError,
  AuthFetchError,
  FetchAuthMapError,
  MappingError,
} from '../model/Errors';
import { AuthService } from './AuthService';

export type AuthFetch = {
  fetch: FetchWithAuth;
};

export type GenericMapper<K, T> = (input: K) => Either<MappingError, T>;

export type FetchWithAuth = <K, T>(
  url: string,
  config: RequestInit,
  mapper: GenericMapper<K, T>,
) => EitherAsync<FetchAuthMapError, T>;

export const authFetchFactory = (authService: AuthService): AuthFetch => ({
  fetch: fetchWithAuth(authService),
});

const fetchWithAuth =
  (authService: AuthService): FetchWithAuth =>
  <K, T>(url: string, config: RequestInit, mapper: GenericMapper<K, T>) =>
    EitherAsync.liftEither(
      authService.getAuth().toEither<AuthError>({
        type: 'auth_error',
        code: '0',
        message: 'Missing auth token',
      }),
    )
      .map((auth) => fetchEither<K>(url, config, auth))
      .join()
      .map((res) => mapper(res))
      .join()
      .mapLeft((err) => err);

const fetchEither = <K>(
  url: string,
  config: RequestInit,
  auth: AuthToken,
): Promise<Either<FetchAuthMapError, K>> =>
  fetch(url, {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${auth.jwt}`,
    },
  })
    .then((res) =>
      res.status === 401
        ? Left({
            type: 'auth_fetch_error',
            code: res.status.toString() ?? '0',
            message: 'Unauthorized',
          } as AuthFetchError)
        : res.status < 400
        ? Right(res.json() as K)
        : Left({
            type: 'api_error',
            code: res.status.toString(),
            message: res.statusText,
          } as ApiError),
    )
    .catch((err) =>
      Left({
        type: 'auth_fetch_error',
        code: err.status ?? '0',
        message: err.message ?? 'Unknown Error on AuthService',
      }),
    );
