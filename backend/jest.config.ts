import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    roots: ['./'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '@src/(.*)': `${__dirname}/src/$1`,
      '@controller/(.*)': `${__dirname}/src/controller/$1`,
      '@entity/(.*)': `${__dirname}/src/entity/$1`,
      '@routes/(.*)': `${__dirname}/src/routes/$1`,
      '@utils/(.*)': `${__dirname}/src/utils/$1`,
      '@middlewares/(.*)': `${__dirname}/src/middlewares/$1`,
      '@app-types/(.*)': '../types.d.ts',
    },
  }
}
