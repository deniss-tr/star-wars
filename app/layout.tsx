"use client";
import "./globals.css";
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import { ModalProvider } from './context/ErrorModalContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <ModalProvider>
            <div className="lg:max-w-screen-md m-auto">
              {children}
            </div>
          </ModalProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
