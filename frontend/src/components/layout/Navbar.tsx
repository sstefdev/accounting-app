import { useNavigate, Link } from 'react-router-dom'

import { useAppContext } from '@utils/useAppContext'
import { Button } from '@components/common'
import { LogoSVG, CopySVG } from '@assets/svg'

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'My Account',
    href: '/account',
  },
]

const Navbar = () => {
  const navigate = useNavigate()
  const { account } = useAppContext()

  const copyAccountID = () => {
    navigator.clipboard.writeText(account.account_id)
  }

  return (
    <nav className='navbar flex items-center py-[38px] px-[42px] gap-[50px] mb-[30px]'>
      <div
        className='logo rounded-[16px] bg-[#ffffff38] p-[14.5px] cursor-pointer hover:bg-[#F96160] transition duration-200 ease-in'
        onClick={() => navigate('/')}
      >
        <LogoSVG />
      </div>
      <ul className='links flex items-center gap-[40px] rounded-[16px] bg-[#ffffff38] w-full py-[20px] px-[32px]'>
        {links.map((link) => (
          <li key={link.name} className='text-[18px] '>
            <Link className='hover:underline' to={link.href}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <Button
        text='Copy ID'
        type='button'
        icon={<CopySVG />}
        className='max-w-[130px]'
        onClick={copyAccountID}
      />
    </nav>
  )
}

export default Navbar
