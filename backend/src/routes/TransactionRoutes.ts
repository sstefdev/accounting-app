import { Route } from '@app-types'
import { config } from '@src/config'
import { TransactionController } from '@controller/index'

export const TransactionRoutes: Route[] = [
  {
    method: 'get',
    path: `${config.apiPrefix}/transaction/:id`,
    controller: TransactionController,
    action: 'one',
  },
  {
    method: 'get',
    path: `${config.apiPrefix}/transaction`,
    controller: TransactionController,
    action: 'all',
  },
  {
    method: 'post',
    path: `${config.apiPrefix}/transaction`,
    controller: TransactionController,
    action: 'create',
  },
]
