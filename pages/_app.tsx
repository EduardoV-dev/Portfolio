import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import AOS from 'aos';
import AppContext from '../hooks/context/AppContext';
import '../styles/global.scss';
import 'aos/dist/aos.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => AOS.init(), []);

  return (
    <AppContext>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>
      <Component {...pageProps} />
    </AppContext>
  );
}
export default MyApp;
