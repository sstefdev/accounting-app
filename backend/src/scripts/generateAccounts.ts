import { DataSource } from 'typeorm'
import { Account } from '@entity/index'

export const generateAccounts = async (dataSource: DataSource) => {
  const accountsToGenerate = process.env.ACCOUTS_TO_GENERATE
  try {
    const accountRepository = dataSource.getRepository(Account)

    if ((await accountRepository.count()) > 0) {
      return
    }

    for (let i = 1; i <= Number(accountsToGenerate); i++) {
      const newAccount = accountRepository.create()

      await accountRepository.save(newAccount)
    }

    console.log('Accounts generated successfully.')
  } catch (error) {
    console.error('Error generating accounts:', error)
  }
}
