import { EitherAsync, Right } from 'purify-ts';

import { FetchAuthMapError } from '../model/errors';
import { Hello } from '../model/hello';
import { mapFetchFactory } from '../service/MappedFetch';

export type GetHello = (helloId: string) => EitherAsync<FetchAuthMapError, Hello>;

export const getHello: GetHello = (helloId: string) =>
  mapFetchFactory().fetch<Hello, Hello>(`/hello/${helloId}`, { method: 'GET' }, (hello: Hello) =>
    Right(hello),
  );
