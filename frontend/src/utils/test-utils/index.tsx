/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AccountingAppContext } from '../context'
import { screen } from '@testing-library/react'

interface AppWrapperProps {
  children: React.ReactNode
  contextValue: any
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children, contextValue }) => (
  <AccountingAppContext.Provider value={contextValue}>
    <Router>{children}</Router>
  </AccountingAppContext.Provider>
)

export function renderWithAppWrapper(ui: React.ReactElement, contextValue: any): RenderResult {
  return render(ui, {
    wrapper: ({ children }): ReactElement => (
      <AppWrapper contextValue={contextValue}>{children}</AppWrapper>
    ),
  })
}

export const getByTextContent = (text: string) => {
  return screen.getByText((_content, element) => {
    const hasText = (element: any) => element.textContent === text
    const elementHasText = hasText(element)
    const childrenDontHaveText = Array.from(element?.children || []).every(
      (child) => !hasText(child),
    )
    return elementHasText && childrenDontHaveText
  })
}
