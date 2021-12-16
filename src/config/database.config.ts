import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

const commonSettings: TypeOrmModuleOptions = {
  type: 'postgres',
  migrationsRun: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migrations' },
};
const dbUrl = process.env.DATABASE_URL;
const production: TypeOrmModuleOptions = {
  url: dbUrl,
  synchronize: false,
  ssl: {
    enabled: process.env.DB_SSL ? true : false,
    rejectUnauthorized: false,
  },
};
const development: TypeOrmModuleOptions = {
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  synchronize: true,
};
const DatabaseConfig: TypeOrmModuleOptions = Object.assign(
  {},
  commonSettings,
  dbUrl ? production : development,
);

export default DatabaseConfig;
