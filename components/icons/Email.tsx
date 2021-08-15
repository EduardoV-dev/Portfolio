import React from 'react'; 

function Email(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 3H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zm-1.1 1L8 7.39 3.1 4h9.8zM2 12V4.455L7.715 8.41a.5.5 0 00.57 0L14 4.455V12H2z"
        fill="#F2F2F2"
      />
    </svg>
  )
}

export default Email
