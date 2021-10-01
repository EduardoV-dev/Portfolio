import React from 'react';
import { ISvg } from '../../models/interfaces';
import { manageSVGStyle } from '../../helpers';

function Home(props: ISvg) {
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
        d="M31.336 15.743L17.698 1.31l-.914-.968A1.08 1.08 0 0016 0c-.293 0-.575.123-.784.342L.665 15.743a2.402 2.402 0 00-.496.789c-.114.295-.171.611-.168.93.014 1.316 1.048 2.366 2.29 2.366h1.501V32h24.418V19.828h1.532c.604 0 1.172-.25 1.599-.703.21-.222.377-.486.49-.776a2.5 2.5 0 00.17-.917 2.45 2.45 0 00-.664-1.689zM17.976 29.31h-3.952v-7.624h3.953v7.624zm7.692-12.172V29.31h-5.432v-8.52c0-.827-.632-1.495-1.412-1.495h-5.648c-.78 0-1.412.668-1.412 1.494v8.521H6.332V17.137H2.944l13.06-13.816.815.863 12.24 12.953h-3.391z"
        fill={manageSVGStyle(props.darkmode)}
      />
    </svg>
  )
}

export default Home
