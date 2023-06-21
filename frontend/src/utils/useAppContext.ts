import { useContext } from 'react'

import { IAppContextState } from '@base/types'
import { AccountingAppContext } from './context'

export const useAppContext = () => {
  const appContext = useContext(AccountingAppContext)

  if (!appContext) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }

  return appContext as IAppContextState
}
