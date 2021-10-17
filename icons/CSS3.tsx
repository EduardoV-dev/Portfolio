import React from 'react';

function CSS3(props: React.SVGProps<SVGSVGElement>) {
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
        d="M11.179 8.381h41.64L49.032 51.14 31.955 55.97 14.97 51.136 11.179 8.38zm33.888 8.75l-26.134-.006.422 5.198 20.077.005-.504 5.387H25.76l.477 5.1h12.259l-.725 6.988L32 41.397l-5.859-1.608-.376-4.184h-5.173l.576 7.646L32 46.624l10.653-3.032 2.414-26.461z"
        fill="#0368AE"
      />
    </svg>
  )
}

export default CSS3
