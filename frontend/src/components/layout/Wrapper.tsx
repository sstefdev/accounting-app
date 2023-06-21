import { ReactNode } from 'react'
import { Navbar, Footer } from '@components/layout'

type WrapperProps = {
  children: ReactNode
}

const Wrapper = ({ children }: WrapperProps) => (
  <div className='container-bg min-h-screen flex flex-col justify-center'>
    <div className='wrapper rounded-[16px] bg-[#ffffff38] container flex flex-col mx-auto'>
      <Navbar />
      <main className='flex px-[42px] h-full'>{children}</main>
      <Footer />
    </div>
  </div>
)

export default Wrapper
