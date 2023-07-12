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
};

export type PageStatusEnum = (typeof PageStatus)[keyof typeof PageStatus];
