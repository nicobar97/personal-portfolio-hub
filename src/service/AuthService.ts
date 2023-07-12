import { Just, Maybe } from 'purify-ts';

import { Configuration } from '../configuration/ViteConfiguration';
import { AuthToken } from '../model/Authentication';

export type AuthService = {
  getAuth: GetAuth;
  setAuth: SetAuth;
};

export type GetAuth = () => Maybe<AuthToken>;
export type SetAuth = (auth: AuthToken) => Maybe<void>;

export const authServiceFactory = (config: Configuration, storage: Storage): AuthService => ({
  getAuth: getAuth(config, storage),
  setAuth: setAuth(config, storage),
});

const getAuth =
  (config: Configuration, storage: Storage): GetAuth =>
  () =>
    Maybe.fromNullable(storage.getItem(config.auth.jwtTokenKey)).chain((jwt) =>
      Maybe.fromNullable(storage.getItem(config.auth.refreshTokenKey)).chain((refresh) =>
        Just({ jwt: fixToken(jwt), refresh: fixToken(refresh) }),
      ),
    );

const setAuth =
  (config: Configuration, storage: Storage): SetAuth =>
  (auth: AuthToken) =>
    Maybe.encase(() => storage.setItem(config.auth.jwtTokenKey, auth.jwt)).chain(() =>
      Maybe.encase(() => storage.setItem(config.auth.refreshTokenKey, auth.refresh)),
    );

const fixToken = (token: string) => token.replaceAll('"', '');
