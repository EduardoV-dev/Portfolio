import React from 'react';
import { ISvg } from '../models/interfaces';
import { manageSVGStyle } from '../helpers';

function Services(props: ISvg) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M29.714 8h-6.857V2.667c0-.708-.24-1.386-.67-1.886C21.76.281 21.178 0 20.572 0H11.43c-.607 0-1.188.281-1.617.781-.428.5-.67 1.178-.67 1.886V8H2.287c-.606 0-1.188.281-1.617.781C.241 9.281 0 9.96 0 10.667v18.666c0 .708.24 1.386.67 1.886.428.5 1.01.781 1.616.781h27.428c.607 0 1.188-.281 1.617-.781.428-.5.669-1.178.669-1.886V10.667c0-.708-.24-1.386-.67-1.886-.428-.5-1.01-.781-1.616-.781zM11.43 2.667h9.142V8H11.43V2.667zM2.286 29.333V10.667h27.428v18.666H2.286z"
        fill={manageSVGStyle(props.darkmode)}
      />
    </svg>
  )
}

export default Services
