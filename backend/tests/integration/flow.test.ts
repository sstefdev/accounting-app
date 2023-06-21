/* eslint-disable no-var */
import 'jest'
import * as express from 'express'
import * as request from 'supertest'
import { AppDataSource } from '@src/data-source'
import { ApplicationRoutes } from '@src/routes/index'
import { generateAccounts } from '@src/scripts/generateAccounts'
import handleRequest from '@src/utils/handleRequest'
import { config } from '@src/config'
import { Account } from '@src/entity'

let app: express.Application
let db: typeof AppDataSource
let accountId: Account['account_id']

const generateAccountId = async (): Promise<Account> => {
  const response = await request(app).get(`${config.apiPrefix}/account/random`)
  const account = response.body

  if (account.balance === 0) {
    return account
  } else {
    const response = await request(app).get(`${config.apiPrefix}/account/random`)
    return response.body
  }
}

beforeAll(async () => {
  app = express()
  app.use(express.json())
  db = await AppDataSource.initialize()
  await generateAccounts(AppDataSource)
  for (const route of ApplicationRoutes) {
    await handleRequest(app, route)
  }
})

describe('Transaction Management Backend - Level 3', () => {
  it('Provides a functional healthcheck', async () => {
    const response = await request(app).get(`${config.apiPrefix}/ping`)
    expect(response.status).toBe(200)
  })

  it('should create a transaction, read it, and fetch the updated account balance', async () => {
    const account = await generateAccountId()
    accountId = account.account_id

    // Create a transaction
    const createTransactionResponse = await request(app)
      .post(`${config.apiPrefix}/transaction`)
      .send({
        account_id: accountId,
        amount: 7,
        type: 'deposit',
      })

    expect(createTransactionResponse.status).toBe(201)
    expect(createTransactionResponse.body.transaction_id).toBeDefined()
    const transactionId = createTransactionResponse.body.transaction_id

    // Read the created transaction
    const getTransactionResponse = await request(app).get(
      `${config.apiPrefix}/transaction/${transactionId}`,
    )
    expect(getTransactionResponse.status).toBe(200)
    expect(getTransactionResponse.body.transaction_id).toBe(transactionId)
    expect(getTransactionResponse.body.account.account_id).toBe(accountId)
    expect(getTransactionResponse.body.amount).toBe(7)

    // Fetch the updated account balance
    const getAccountResponse = await request(app).get(`${config.apiPrefix}/account/${accountId}`)
    expect(getAccountResponse.status).toBe(200)
    expect(getAccountResponse.body.account_id).toBe(accountId)
    expect(getAccountResponse.body.balance).toBe(7)
  })

  it('should create transaction with negative amounts', async () => {
    const account = await generateAccountId()
    accountId = account.account_id

    // Create a transaction with positive amount
    const createPositiveTransactionResponse = await request(app)
      .post(`${config.apiPrefix}/transaction`)
      .send({
        account_id: accountId,
        amount: 4,
        type: 'deposit',
      })

    expect(createPositiveTransactionResponse.status).toBe(201)
    expect(createPositiveTransactionResponse.body.transaction_id).toBeDefined()

    // Fetch the account balance after positive transaction
    const getPositiveAccountResponse = await request(app).get(
      `${config.apiPrefix}/account/${accountId}`,
    )
    expect(getPositiveAccountResponse.status).toBe(200)
    expect(getPositiveAccountResponse.body.account_id).toBe(accountId)
    expect(getPositiveAccountResponse.body.balance).toBe(4)

    // Create a transaction with negative amount
    const createNegativeTransactionResponse = await request(app)
      .post(`${config.apiPrefix}/transaction`)
      .send({
        account_id: accountId,
        amount: 3,
        type: 'withdraw',
      })

    expect(createNegativeTransactionResponse.status).toBe(201)
    expect(createNegativeTransactionResponse.body.transaction_id).toBeDefined()

    // Fetch the account balance after negative transaction
    const getNegativeAccountResponse = await request(app).get(
      `${config.apiPrefix}/account/${accountId}`,
    )
    expect(getNegativeAccountResponse.status).toBe(200)
    expect(getNegativeAccountResponse.body.account_id).toBe(accountId)
    expect(getNegativeAccountResponse.body.balance).toBe(1)
    db.close()
  })
})
