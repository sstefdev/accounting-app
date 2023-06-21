import { AccountRoutes } from './AccountRoutes'
import { HealthCheckRoutes } from './HealthCheckRoutes'
import { TransactionRoutes } from './TransactionRoutes'

export const ApplicationRoutes = [...AccountRoutes, ...TransactionRoutes, ...HealthCheckRoutes]
