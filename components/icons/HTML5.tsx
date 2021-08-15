import React from 'react';

function HTML5(props: React.SVGProps<SVGSVGElement>) {
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
        d="M9.075 6L13.2 52.663 32 58l18.725-5.337L54.931 6H9.075zm37.188 11.069l-.3 2.95-.107 1.219H23.894l.512 5.887H45.35l-.206 1.519-1.325 15.137-.107 1.013-11.687 3.225v.019h-.075l-.019.006v-.006h-.006l-11.788-3.25-.712-9.038h5.694l.406 4.575 6.4 1.731h.025l6.375-1.725.712-7.412h-7.106v-.006H19.125L17.7 17.069l-.106-1.519h28.768l-.1 1.519z"
        fill="#DD4B25"
      />
    </svg>
  )
}

export default HTML5
