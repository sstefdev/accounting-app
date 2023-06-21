export const config = {
  apiPrefix: '/v1/api',
  serverPort: process.env.PORT as unknown as number,
  db: {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
}
