import 'reflect-metadata';
import { ConnectionOptions } from 'typeorm';

export let dbOption: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'typeorm_schema',
  entities: ['**/*.entity.ts'],
};
