import type { Metadata } from "next";
import MainNavigation from "@/components/main-navigation/main-navigation";
import { ReactNode } from "react";
import Providers from "@/components/lib/providers/providers";
import { getServerSession } from 'next-auth';

// DON'T DO THIS - FIND ALTERNATIVE - OK FOR development
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import "./globals.css";

// default metadata
export const metadata: Metadata = {
  title: "Mantra Store - The biggest store in India",
  description: "Mantra Store - shop from our wide variety of products. Have them delivered within 2 hours at your doorstep.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getServerSession(/*authOptions*/);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
      </head>
      <body
        className="antialiased"
      >
        <Providers session={session}>
          <MainNavigation />
          <div className="max-w-screen-xl mx-auto mt-12 px-4">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
