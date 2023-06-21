import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Account, Transaction } from '@entity/index'
import { config } from './config'

export const AppDataSource = new DataSource({
  ...config.db,
  synchronize: true,
  logging: false,
  entities: [Account, Transaction],
  migrations: ['./migrations/*.ts'],
})
