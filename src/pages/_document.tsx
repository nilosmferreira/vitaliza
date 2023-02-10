import { Html, Head, Main, NextScript } from 'next/document';
import 'reflect-metadata';
import '../infra/tsyringer';
export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>Instituto Vitaliza</title>
        <link
          rel='icon'
          type='image/svg+xml'
          href='/favicon.svg'
        />
        <link
          rel='icon'
          type='image/png'
          href='/favicon.png'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
