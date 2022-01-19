import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

type Props = {};

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="I develop great web pages and applications as a Front end Developer, always delivering quality work and best practices"
          />
          <meta
            name="keywords"
            content="Front end Developer, Web pages, React, Next, Web applications"
          />
          <meta
            name="og:title"
            content="Eduardo Varela | Front end Developer"
          />
          <meta
            name="og:description"
            content="I develop great web pages and applications as a Front end Developer, always delivering quality work and best practices"
          />
          <meta name="og:type" content="website" />
          <meta name="og:locale" content="en" />
          <meta
            name="og:site_name"
            content="Eduardo Varela | Front end Developer"
          />
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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Ephesis&family=Raleway:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
