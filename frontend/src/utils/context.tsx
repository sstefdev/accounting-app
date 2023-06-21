/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useEffect, useState } from 'react'
import { Account, IAppContextState, Transaction, TransactionRequest } from '@base/types'
import apiHandler from '@libs/axiosHandler'

export const AccountingAppContext = createContext<Partial<IAppContextState>>({})

interface AppContextProviderProps {
  children: ReactNode
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [account, setAccount] = useState<Account>({
    account_id: '',
    balance: 0,
    transactions: [],
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const getSingleAccount = async (accountId: string) => {
    try {
      setLoading(true)
      const response = await apiHandler<Account>({ method: 'get' }, `account/${accountId}`)
      setAccount(response)
    } catch (error: any) {
      console.error('Error fetching single account:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getRandomAccount = async () => {
    try {
      setLoading(true)
      const response = await apiHandler<Account>({ method: 'get' }, 'account/random')
      setAccount(response)
    } catch (error: any) {
      console.error('Error fetching random account:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getAllTransactions = async () => {
    try {
      setLoading(true)
      const response = await apiHandler<Transaction[]>({ method: 'get' }, 'transaction')
      setTransactions(response)
    } catch (error: any) {
      console.error('Error fetching transactions:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const transactionSubmit = async (data: TransactionRequest) => {
    try {
      setLoading(true)
      await apiHandler<Transaction>(
        {
          method: 'post',
          data,
        },
        'transaction',
      )
    } catch (error: any) {
      if (account.balance < data.amount) setError('Insufficient balance')
      else setError(error.message)
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (account.account_id.length < 1) {
      Promise.all([getRandomAccount(), getAllTransactions()])
    }
  }, [account])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (error) {
      timeoutId = setTimeout(() => {
        setError('')
      }, 3000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [error])

  return (
    <AccountingAppContext.Provider
      value={{
        account,
        transactions,
        loading,
        error,
        setTransactions,
        setLoading,
        setError,
        getAllTransactions,
        getSingleAccount,
        transactionSubmit,
      }}
    >
      {children}
    </AccountingAppContext.Provider>
  )
}

export default AppContextProvider
