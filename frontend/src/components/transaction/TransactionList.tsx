import Skeleton from 'react-loading-skeleton'
import { useLocation } from 'react-router-dom'

import { Transaction as TransactionType } from '@types'
import { useAppContext } from '@utils/useAppContext'
import { Transaction } from '.'

interface TransactionListProps {
  title?: string
  profileTransactions?: boolean
}

const TransactionList = ({ title, profileTransactions }: TransactionListProps) => {
  const { pathname } = useLocation()
  const { transactions, account, loading } = useAppContext()
  const transactionsToShow = profileTransactions ? account.transactions : transactions

  const dateSort = (a: TransactionType, b: TransactionType) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  }

  return (
    <div className='flex flex-col w-full'>
      <h2 className='text-2xl font-bold mb-[20px]'>{title}</h2>
      <div className='flex flex-col gap-[32px] bg-[#d2d0d03b] rounded-[16px] h-full p-[20px] overflow-y-scroll max-h-[450px]'>
        {loading ? (
          Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={index}
              height={index === 0 && pathname !== '/account' ? 84 : 48}
              baseColor='#DBE2E9'
              highlightColor='#FFD0CF'
              borderRadius={8}
              duration={0.3}
              containerTestId='skeleton-component'
            />
          ))
        ) : transactionsToShow?.length > 0 ? (
          transactionsToShow
            .sort((a, b) => dateSort(a, b))
            .map((transaction, index) => (
              <Transaction
                {...transaction}
                account_id={
                  profileTransactions ? account.account_id : transaction.account.account_id
                }
                key={transaction.transaction_id}
                first={index === 0 && pathname !== '/account'}
                balance={transaction?.account?.balance}
              />
            ))
        ) : (
          <p className='text-center font-mono'>No transactions</p>
        )}
      </div>
    </div>
  )
}

export default TransactionList
