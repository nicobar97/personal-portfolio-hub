export const config: Configuration = {
  environment: import.meta.env.VITE_ENVIRONMENT,
  baseUrl: import.meta.env.VITE_API_BASE_URL,
};

export type Configuration = {
  environment: string;
  baseUrl: string;
};
