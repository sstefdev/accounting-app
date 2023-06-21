import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer flex justify-between gap-[120px] rounded-bl-[16px] rounded-br-[16px] bg-[#d2d0d03b] mt-auto min-h-[100px] py-[18px] px-[42px] box-shadow[rgba(0, 0, 0, 0.24) 0px 3px 8px]'>
      <h2>©️ 2023 Accounting App</h2>
      <Link
        rel='noreferrer'
        target='_blank'
        to='https://github.com/sstefdev'
        className='hover:underline h-[fit-content] font-mono'
      >
        Author
      </Link>
    </footer>
  )
}

export default Footer
