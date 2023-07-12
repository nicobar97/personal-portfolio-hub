import { Maybe } from 'purify-ts';

const authKeys = (env: string) => {
  switch (env) {
    case 'development':
      return {
        jwtTokenKey: '',
        refreshTokenKey: '',
      };
  }
  return null;
};

export const config: Configuration = {
  environment: import.meta.env.VITE_ENVIRONMENT,
  auth: Maybe.fromNullable(authKeys(import.meta.env.VITE_ENVIRONMENT)).orDefault({
    jwtTokenKey: '',
    refreshTokenKey: '',
  }),
};

export type Configuration = {
  environment: string;
  auth: {
    jwtTokenKey: string;
    refreshTokenKey: string;
  };
};
