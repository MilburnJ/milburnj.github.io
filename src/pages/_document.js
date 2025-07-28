// src/pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="dark">
        <Head />
        <body
          className="
            bg-gray-900 
            text-white 
            antialiased 
            h-screen 
            overflow-y-auto 
            snap-y 
            snap-mandatory
          "
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
