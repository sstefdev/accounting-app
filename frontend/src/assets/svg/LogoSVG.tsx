/* eslint-disable @typescript-eslint/no-explicit-any */
const SvgComponent = (props: any) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={50} height={50} viewBox='0 0 24 24' {...props}>
    <defs fill='#000'>
      <style>
        {
          '.cls-1{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:1.91px;stroke-linecap:square}'
        }
      </style>
    </defs>
    <g id='invoice'>
      <path
        fill='#000'
        d='M5.32 9.16h2.86M5.32 12.98h7.63M5.32 16.8h7.63M19.64 22.52H4.36a2.86 2.86 0 0 1-2.86-2.86V2.48L4 4.39l2.59-1.91 2.54 1.91 2.55-1.91 2.54 1.91 2.55-1.91v17.18a2.87 2.87 0 0 0 2.87 2.86Z'
        className='cls-1'
      />
      <path
        fill='#000'
        d='M18.68 10.11h3.82v9.55a2.87 2.87 0 0 1-5.73 0v-9.55h1.91Z'
        style={{
          fill: 'none',
          stroke: '#000',
          strokeMiterlimit: 10,
          strokeWidth: '1.91px',
        }}
      />
    </g>
  </svg>
)
export default SvgComponent
