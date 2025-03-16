import "~/styles/globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { PostHogProvider } from './_providers/posthog-provider'

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Drive tutorial",
  description: "Google Drive but mine",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ClerkProvider>
          <PostHogProvider>
            {children}
          </PostHogProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
