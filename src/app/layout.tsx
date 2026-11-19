import type { Metadata } from "next";
import { inter } from "./Vars/font";
import "./globals.css";

import { Provider } from 'react-wrap-balancer' 

const DESCRIPTION =
  "Sid Banerjee: musician and engineer at UC Berkeley working on audio ML, DSP, and interactive music systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sidbanerjee.me"),
  title: "Sid Banerjee",
  description: DESCRIPTION,
  openGraph: { title: "Sid Banerjee", description: DESCRIPTION, url: "/", type: "website" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.variable} antialiased text-[15px] leading-relaxed text-gray-900`}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
  );
}
