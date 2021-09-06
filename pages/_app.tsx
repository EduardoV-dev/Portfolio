import type { AppProps } from 'next/app';
import AppContext from '../hooks/context/AppContext';
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Component {...pageProps} />
    </AppContext>
  );
}
export default MyApp;
