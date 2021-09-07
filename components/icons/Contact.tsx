import React from 'react';
import { ISvg } from '../../models/interfaces';
import { manageSVGStyle } from '../../styles/helpers';

function Contact(props: ISvg) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M16.638 16h9.739M6.899 16a4.268 4.268 0 01-2.952-1.172A3.917 3.917 0 012.725 12c0-1.06.44-2.078 1.222-2.828A4.268 4.268 0 016.9 8c1.107 0 2.168.421 2.951 1.172A3.917 3.917 0 0111.073 12c0 1.06-.44 2.078-1.223 2.828A4.268 4.268 0 016.899 16zm5.565 8v-2.667c0-3-2.486-5.333-5.616-5.333h.076c-3.13 0-5.59 2.333-5.59 5.333V24h11.13zm4.174-14.667h16.695-16.695zm0 13.334H30.55 16.638z"
          stroke={manageSVGStyle(props.darkmode)}
          strokeWidth={2}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill={manageSVGStyle(props.darkmode)} d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Contact
