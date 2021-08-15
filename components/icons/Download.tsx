import React from 'react';

function Download(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={15}
      height={18}
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M7.5 11.563L10 8.721m-2.5 2.84V3.04v8.523zm0 0L5 8.723l2.5 2.84zM1.25 12.983l.388 1.765c.068.307.224.58.443.775.22.195.49.3.77.3h9.298c.28 0 .55-.105.77-.3a1.45 1.45 0 00.443-.775l.388-1.765"
        stroke="#F2F2F2"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Download;
