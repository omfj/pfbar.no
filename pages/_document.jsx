import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="no">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#fbcfe8" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
