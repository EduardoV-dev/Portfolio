import { SVGProps } from 'react';

const TailwindCSS = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={64}
    height={64}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 27.4c1.867-7.467 6.533-11.2 14-11.2 11.2 0 12.6 8.4 18.2 9.8 3.733.933 7-.467 9.8-4.2C58.133 29.267 53.467 33 46 33c-11.2 0-12.6-8.4-18.2-9.8-3.733-.933-7 .467-9.8 4.2ZM4 44.2C5.867 36.733 10.533 33 18 33c11.2 0 12.6 8.4 18.2 9.8 3.733.933 7-.467 9.8-4.2-1.867 7.467-6.533 11.2-14 11.2-11.2 0-12.6-8.4-18.2-9.8-3.733-.933-7 .467-9.8 4.2Z"
      fill="#44A8B3"
    />
  </svg>
);

export default TailwindCSS;
