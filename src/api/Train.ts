import { EitherAsync, Right } from 'purify-ts';

import { mapFetchFactory } from '../service/MappedFetch';
import { FetchAuthMapError } from '../model/errors';
import { config } from '../configuration/ViteConfiguration';
import { TrainTable } from '../model/Train';

export type GetTrainTable = (placeId: string) => EitherAsync<FetchAuthMapError, TrainTable>;

export const getTrainTable: GetTrainTable = (placeId: string) =>
  mapFetchFactory().fetch<TrainTable, TrainTable>(
    `${config.baseUrl}/api/traintable/departures/${placeId}`,
    { method: 'GET' },
    (trainTable) => Right(trainTable),
  );
