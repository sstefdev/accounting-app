import { CreateTransaction, TransactionList } from '@components/transaction'

const Home = () => (
  <div className='flex gap-[100px] h-100 w-full'>
    <CreateTransaction />
    <TransactionList title='Transaction History' />
  </div>
)

export default Home
