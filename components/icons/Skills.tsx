import React from 'react';
import { ISvg } from '../../models/interfaces';
import { manageSVGStyle } from '../../styles/helpers';

function Skills(props: ISvg) {
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
        d="M6 16.4c0-.318.158-.623.44-.848A1.708 1.708 0 017.5 15.2c.398 0 .78.126 1.06.352.282.225.44.53.44.848 0 .318-.158.623-.44.849a1.708 1.708 0 01-1.06.351c-.398 0-.78-.126-1.06-.352-.282-.225-.44-.53-.44-.848zM7.5 20c-.398 0-.78.126-1.06.352-.282.224-.44.53-.44.848 0 .318.158.623.44.849.28.225.662.351 1.06.351s.78-.126 1.06-.351c.282-.226.44-.53.44-.849 0-.318-.158-.623-.44-.848A1.708 1.708 0 007.5 20zM6 26c0-.318.158-.623.44-.849A1.708 1.708 0 017.5 24.8c.398 0 .78.126 1.06.351.282.226.44.53.44.849 0 .318-.158.623-.44.849a1.708 1.708 0 01-1.06.351c-.398 0-.78-.126-1.06-.351-.282-.226-.44-.53-.44-.849zm7.5-10.8c-.398 0-.78.126-1.06.352-.282.225-.44.53-.44.848 0 .318.158.623.44.849.28.225.662.351 1.06.351h11c.398 0 .78-.126 1.06-.352.282-.225.44-.53.44-.848 0-.318-.158-.623-.44-.848a1.709 1.709 0 00-1.06-.352h-11zm-1.5 6c0-.318.158-.623.44-.848A1.709 1.709 0 0113.5 20h11c.398 0 .78.126 1.06.352.282.224.44.53.44.848 0 .318-.158.623-.44.849a1.709 1.709 0 01-1.06.351h-11c-.398 0-.78-.126-1.06-.351-.282-.226-.44-.53-.44-.849zm1.5 3.6c-.398 0-.78.126-1.06.351-.282.226-.44.53-.44.849 0 .318.158.623.44.849.28.225.662.351 1.06.351h11c.398 0 .78-.126 1.06-.351.282-.226.44-.53.44-.849 0-.318-.158-.623-.44-.849a1.709 1.709 0 00-1.06-.351h-11zm17.328-14.538L19.17.938a.979.979 0 00-.098-.064A1.23 1.23 0 0119 .826a4.097 4.097 0 00-.438-.288 1.43 1.43 0 00-.16-.07l-.096-.04-.1-.046c-.108-.05-.218-.1-.332-.139a4.808 4.808 0 00-1.248-.22 1.388 1.388 0 01-.118-.012A1.507 1.507 0 0016.344 0H4C2.94 0 1.922.337 1.172.937.422 1.537 0 2.351 0 3.2v25.6c0 .849.421 1.663 1.172 2.263.75.6 1.767.937 2.828.937h24c1.06 0 2.078-.337 2.828-.937.75-.6 1.172-1.414 1.172-2.263V12.525c0-.849-.422-1.663-1.172-2.263zM29 28.8a.73.73 0 01-.293.566A1.14 1.14 0 0128 29.6H4a1.14 1.14 0 01-.707-.234A.729.729 0 013 28.8V3.2c0-.212.105-.416.293-.566A1.14 1.14 0 014 2.4h12v7.2c0 .849.421 1.663 1.172 2.263.75.6 1.767.937 2.828.937h9v16zM19 4.194l7.756 6.206H20a1.14 1.14 0 01-.707-.234A.73.73 0 0119 9.6V4.194z"
        fill={manageSVGStyle(props.darkmode)}
      />
    </svg>
  )
}

export default Skills