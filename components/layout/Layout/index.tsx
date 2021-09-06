import React from 'react';
import Head from 'next/head';
import { Header } from '..';

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FC<IProps> = ({ children }): JSX.Element => {
  return (
    <>
      <Head>
        <title>Eduardo Varela | Front end Developer</title>
      </Head>
      <Header />
      {children}
    </>
  );
};

export default Layout;
