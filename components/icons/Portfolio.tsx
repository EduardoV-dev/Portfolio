import React from 'react';
import { ISvg } from '../../models/interfaces';
import { manageSVGStyle } from '../../helpers';

function Portfolio(props: ISvg) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27 7V6a3.009 3.009 0 00-3-3H4a3.009 3.009 0 00-3 3v16a3.009 3.009 0 003 3h1"
        stroke={manageSVGStyle(props.darkmode)}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M28.126 8H8.874A2.874 2.874 0 006 10.874v15.252A2.874 2.874 0 008.874 29h19.252A2.874 2.874 0 0031 26.126V10.874A2.874 2.874 0 0028.126 8z"
        stroke={manageSVGStyle(props.darkmode)}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d="M23.308 15.637a1.916 1.916 0 001.923-1.91c0-1.054-.861-1.909-1.924-1.909a1.916 1.916 0 00-1.923 1.91c0 1.054.861 1.909 1.924 1.909z"
        stroke={manageSVGStyle(props.darkmode)}
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <path
        d="M21.384 23.26l-5.447-5.399a1.933 1.933 0 00-2.636-.075L6 24.227M16.577 29l7.412-7.358a1.937 1.937 0 012.591-.117L31 25.182"
        stroke={manageSVGStyle(props.darkmode)}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Portfolio
