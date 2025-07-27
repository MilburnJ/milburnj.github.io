// src/app/layout.js


export const scrollRestoration = 'manual';

import './globals.css';

export const metadata = {
  title: 'Jakeb Milburn • ML Engineer',
  description: 'Portfolio of Jakeb Milburn – Machine Learning & AI Engineer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white antialiased
                       h-screen overflow-y-auto
                       snap-y snap-mandatory">
        {children}
      </body>
    </html>
  );
}
