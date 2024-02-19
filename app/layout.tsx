import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
const inter = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"]});


export const metadata: Metadata = {
  title: "Imagisha",
  description: "AI-Powered image generator and editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider appearance={{
	variables: { colorPrimary: '#007d20'}
	}}>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
</ClerkProvider>
  );
}
