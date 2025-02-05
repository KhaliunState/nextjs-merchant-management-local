// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon links */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" href="/favicon-64x64.png" sizes="64x64" />
        <link rel="icon" href="/favicon-180x180.png" sizes="180x180" />
        {/* You can add a PWA manifest link here if you're building a PWA */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
