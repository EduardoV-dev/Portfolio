import * as React from "react"

function Go(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.009 17.436a8.438 8.438 0 110-16.875 8.438 8.438 0 010 16.875zm5.17-13.608a7.286 7.286 0 10-10.288 10.32A7.286 7.286 0 0014.18 3.828z"
        fill="#5285DA"
      />
      <path
        d="M8.425 12.2l2.638-2.639H4.505V8.436h6.558L8.425 5.797l.795-.795 3.997 3.997-3.997 3.996-.795-.795z"
        fill="#5285DA"
      />
    </svg>
  )
}

export default Go
