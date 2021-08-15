import React from 'react';

function Go(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)" fill="#5285DA">
        <path d="M8.008 15.726a7.5 7.5 0 110-15 7.5 7.5 0 010 15zM12.604 3.63a6.477 6.477 0 10-9.145 9.173 6.477 6.477 0 009.145-9.173z" />
        <path d="M7.489 11.071l2.345-2.345h-5.83v-1h5.83L7.489 5.381l.707-.708 3.552 3.553-3.552 3.552-.707-.707z" />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path
            fill="#fff"
            transform="matrix(1 0 0 -1 0 16.227)"
            d="M0 0h16v16H0z"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Go
