// src/pages/_app.js
import '../app/globals.css'; // adjust path if your CSS lives elsewhere

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
