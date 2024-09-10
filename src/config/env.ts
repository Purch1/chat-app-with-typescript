import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

interface EnvConfig {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
}

const development: EnvConfig = {
  port: Number(process.env.PORT) || 6000,
  databaseUrl: process.env.DEV_MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || ''
};

const production: EnvConfig = {
  port: Number(process.env.PORT) || 8000,
  databaseUrl: process.env.PROD_MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || ''
};

export const env: EnvConfig = process.env.NODE_ENV === 'production' ? production : development;


// import * as dotenv from 'dotenv';

// dotenv.config({ path: '.env' });

// interface EnvConfig {
//   port: number;
//   databaseUrl: string;
//   jwtSecret: string;
// }

// const development: EnvConfig = {
//   port: Number(process.env.PORT) || 6000,
//   databaseUrl: process.env.DEV_MONGO_URI || '',
//   jwtSecret: process.env.JWT_SECRET || ''
// };

// export const env: EnvConfig = development;
