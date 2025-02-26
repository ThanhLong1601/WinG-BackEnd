import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  charset: 'utf8mb4',
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  migrationsTableName: 'content_migration',
};

export const dataSource = new DataSource(config);
export default config;