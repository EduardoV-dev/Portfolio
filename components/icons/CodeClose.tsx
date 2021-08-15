import React from 'react';

function CodeClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26.195 4.117a1.25 1.25 0 00-2.39-.735l-10 32.5a1.25 1.25 0 102.39.736l10-32.5zm-14.06 6.248a1.25 1.25 0 010 1.77L4.268 20l7.867 7.865a1.252 1.252 0 01-1.77 1.77l-8.75-8.75a1.25 1.25 0 010-1.77l8.75-8.75a1.25 1.25 0 011.77 0zm15.73 0a1.25 1.25 0 000 1.77L35.733 20l-7.868 7.865a1.252 1.252 0 001.77 1.77l8.75-8.75a1.25 1.25 0 000-1.77l-8.75-8.75a1.25 1.25 0 00-1.77 0z"
        fill="#5285DA"
      />
    </svg>
  )
}

export default CodeClose
