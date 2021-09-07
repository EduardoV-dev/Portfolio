import type { AppProps } from 'next/app';
import Head from 'next/head';
import AppContext from '../hooks/context/AppContext';
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
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
