import React from 'react';

function Figma(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M42.667 42.667c5.89 0 10.666-4.776 10.666-10.667s-4.775-10.667-10.666-10.667S32 26.11 32 32s4.776 10.667 10.667 10.667z"
        fill="#19BCFE"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.333 64A10.667 10.667 0 0032 53.333V42.667H21.333a10.666 10.666 0 100 21.333z"
        fill="#09CF83"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.333 42.667H32V21.333H21.333a10.666 10.666 0 100 21.334z"
        fill="#A259FF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.333 21.333H32V0H21.333a10.666 10.666 0 100 21.333z"
        fill="#F24E1E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.667 21.333H32V0h10.667a10.667 10.667 0 010 21.333z"
        fill="#FF7262"
      />
    </svg>
  )
}

export default Figma
