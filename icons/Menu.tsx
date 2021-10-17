import React from 'react';

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 4a4 4 0 11-8 0 4 4 0 018 0zM8 16a4 4 0 11-8 0 4 4 0 018 0zM4 32a4 4 0 100-8 4 4 0 000 8zM20 4a4 4 0 11-8 0 4 4 0 018 0zM16 20a4 4 0 100-8 4 4 0 000 8zM20 28a4 4 0 11-8 0 4 4 0 018 0zM28 8a4 4 0 100-8 4 4 0 000 8zM32 16a4 4 0 11-8 0 4 4 0 018 0zM28 32a4 4 0 100-8 4 4 0 000 8z"
        fill="#5285DA"
      />
    </svg>
  )
}

export default Menu