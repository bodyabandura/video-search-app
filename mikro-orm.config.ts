/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig({
  path: '.env',
});

const config: Options = {
  driver: PostgreSqlDriver,
  clientUrl: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  driverOptions: {
    connection: {
      ssl: { rejectUnauthorized: false },
    },
  },
};

export default config;
