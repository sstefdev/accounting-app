import type { Config } from 'jest'

export default async (): Promise<Config> => {
  return {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ['dotenv/config'],
    roots: ['./'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'd.ts'],
    moduleNameMapper: {
      '@base/(.*)': `${__dirname}`,
      '@src/(.*)': `${__dirname}/src/$1`,
      '@types': `${__dirname}/types.d.ts`,
      '@assets/(.*)': `${__dirname}/src/assets/$1`,
      '@libs/(.*)': `${__dirname}/src/libs/$1`,
      '@utils/(.*)': `${__dirname}/src/utils/$1`,
      '@containers/(.*)': `${__dirname}/src/containers/$1`,
      '@components/(.*)': `${__dirname}/src/components/$1`,
    },
  }
}
