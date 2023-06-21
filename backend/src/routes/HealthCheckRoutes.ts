import { Route } from '@app-types'
import { config } from '@src/config'
import { HealthCheckController } from '@controller/index'

export const HealthCheckRoutes: Route[] = [
  {
    method: 'get',
    path: `${config.apiPrefix}/ping`,
    controller: HealthCheckController,
    action: 'check',
  },
]
