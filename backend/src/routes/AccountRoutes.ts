import { Route } from '@app-types'
import { config } from '@src/config'
import { AccountController } from '@controller/index'

export const AccountRoutes: Route[] = [
  {
    method: 'get',
    path: `${config.apiPrefix}/account/random`,
    controller: AccountController,
    action: 'random',
  },
  {
    method: 'get',
    path: `${config.apiPrefix}/account/:id`,
    controller: AccountController,
    action: 'one',
  },
  {
    method: 'post',
    path: `${config.apiPrefix}/account`,
    controller: AccountController,
    action: 'create',
  },
]
