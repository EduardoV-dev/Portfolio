import React from 'react';

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 12a4 4 0 11-8 0 4 4 0 018 0v0zM16 24a4 4 0 11-8 0 4 4 0 018 0zM12 40a4 4 0 100-8 4 4 0 000 8v0zM28 12a4 4 0 11-8 0 4 4 0 018 0v0zM24 28a4 4 0 100-8 4 4 0 000 8zM28 36a4 4 0 11-8 0 4 4 0 018 0v0zM36 16a4 4 0 100-8 4 4 0 000 8v0zM40 24a4 4 0 11-8 0 4 4 0 018 0zM36 40a4 4 0 100-8 4 4 0 000 8v0z"
        stroke="#5285DA"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Menu
