/* eslint-disable @typescript-eslint/no-explicit-any */
const SvgComponent = (props: any) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={50}
    height={50}
    fill='none'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      stroke='#464455'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10 8V7c0-.943 0-1.414.293-1.707C10.586 5 11.057 5 12 5h5c.943 0 1.414 0 1.707.293C19 5.586 19 6.057 19 7v5c0 .943 0 1.414-.293 1.707C18.414 14 17.943 14 17 14h-1m-9 5h5c.943 0 1.414 0 1.707-.293C14 18.414 14 17.943 14 17v-5c0-.943 0-1.414-.293-1.707C13.414 10 12.943 10 12 10H7c-.943 0-1.414 0-1.707.293C5 10.586 5 11.057 5 12v5c0 .943 0 1.414.293 1.707C5.586 19 6.057 19 7 19Z'
    />
  </svg>
)
export default SvgComponent
