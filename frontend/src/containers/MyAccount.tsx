import { AccountInfo } from '@components/account'
import { TransactionList } from '@components/transaction'

const MyAccount = () => (
  <div className='account flex w-full gap-[100px]'>
    <AccountInfo />
    <TransactionList title='My Transactions' profileTransactions />
  </div>
)

export default MyAccount
