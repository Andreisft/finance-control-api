import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';

config({ path: '.env' });

export const TypeOrmModuleCustomOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  synchronize: false,
  migrationsRun: true,
  entities: [__dirname + '/../modules/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
