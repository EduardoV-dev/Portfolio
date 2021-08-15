import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/SEO/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/SEO/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/SEO/favicon-16x16.png"
        />
        <link rel="manifest" href="/SEO/site.webmanifest" />
        <title>Eduardo Varela | Front end Developer</title>
      </Head>
      <h1>Portfolio</h1>
    </>
  );
};

export default Home;
