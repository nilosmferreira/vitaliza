import { Html, Head, Main, NextScript } from 'next/document';
import 'reflect-metadata';
import '../infra/tsyringer';
export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
