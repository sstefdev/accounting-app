import Skeleton from 'react-loading-skeleton'
import { useAppContext } from '@utils/useAppContext'

const AccountInfo = () => {
  const { account, loading } = useAppContext()

  return (
    <div className='account-info flex flex-col items-center h-full w-full gap-[20px] max-w-[500px]'>
      <h1 className='text-2xl font-bold text-center'>Account Information</h1>
      {loading ? (
        <Skeleton
          height={48}
          width={389}
          baseColor='#FFFFFF'
          highlightColor='#FFD0CF'
          borderRadius={8}
          duration={0.3}
          containerTestId='skeleton-component'
        />
      ) : account.account_id ? (
        <h3 className='text-[16px] text-center bg-[#d2d0d03d] p-[10px] rounded-[14px] shadow-slate-500 shadow-sm'>
          ID: {account.account_id}
        </h3>
      ) : (
        <p className='text-center font-mono'>No account found</p>
      )}
      <h3 className='text-[24px]'>
        Balance: <span className='text-[28px] font-mono text-emerald-700'>{account.balance}$</span>
      </h3>
    </div>
  )
}

export default AccountInfo
