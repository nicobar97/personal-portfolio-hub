import { FetchAuthMapError } from './errors';

const success: Success = 'success';
type Success = 'success';
const loading: Loading = 'loading';
type Loading = 'loading';
const error: Error = 'error';
type Error = 'error';

export const PageStatus = {
  LOADING: loading,
  SUCCESS: success,
  ERROR: error,
} as const;

export type PageStatusEnum = Success | Loading | Error;

export type PageState<T> = LoadingState | SuccessState<T> | ErrorState;

type LoadingState = {
  status: Loading;
};

type SuccessState<T> = {
  status: Success;
  data: T;
};

type ErrorState = {
  status: Error;
  error: FetchAuthMapError;
};
