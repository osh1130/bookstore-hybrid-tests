import dotenv from 'dotenv';
dotenv.config();

type Environment = 'production' | 'staging' | 'local' | 'ci';

const baseEnvUrl = {
      local: {
        api: 'https://demoqa.com',
        home: 'https://demoqa.com',
      },
      production: {
        api: 'https://demoqa.com',
        home: 'https://demoqa.com',
      },
      staging: {
        api: 'https://demoqa.com',
        home: 'https://demoqa.com',
      },
      ci: {
        prefix: 'https://demoqa',
        suffix: '.com',
      },
} as const;

const ENV = (process.env.ENV || 'local') as Environment;

if (!['production', 'staging', 'local', 'ci'].includes(ENV)) {
  throw new Error(`Invalid ENV value: ${ENV}`);
}

function getHomeUrl(env: Environment): string {
    if (env === 'ci') return '';
    return baseEnvUrl[env].home;
  }

export const config = {
  env: ENV,
  baseURL: process.env.BASE_URL || getHomeUrl(ENV),
};

export const BASE_URL = config.baseURL;
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
