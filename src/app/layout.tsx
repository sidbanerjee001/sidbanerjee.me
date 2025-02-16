import type { Metadata } from "next";
import { inter } from "./Vars/font";
import "./globals.css";

import { Provider } from 'react-wrap-balancer' 

export const metadata: Metadata = {
  title: "Sid Banerjee",
  description: "Personal page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body
          className={`${inter.variable} ${inter.variable} antialiased`}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
  );
}
