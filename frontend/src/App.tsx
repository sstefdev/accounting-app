import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Wrapper } from '@components/layout'
import AppContextProvider from '@utils/context'
import { Home, MyAccount } from '@containers/index'

const App = () => (
  <AppContextProvider>
    <Router>
      <Wrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<MyAccount />} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Wrapper>
    </Router>
  </AppContextProvider>
)

export default App
