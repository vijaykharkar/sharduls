const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'SHARDUL-GE',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  isDev: import.meta.env.VITE_APP_ENV === 'development' || import.meta.env.DEV,
  isProd: import.meta.env.VITE_APP_ENV === 'production',
};

export default env;
