import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import LayoutShell from "./LayoutShell";

export const metadata: Metadata = {
  title: "BioShield | Digital Farm Biosecurity",
  description: "Comprehensive biosecurity management portal for Pig and Poultry farms.",
  manifest: "/manifest.json",
  // viewport and themeColor are handled via metadata object in modern Next.js
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body>
        <Providers>
          <LayoutShell>
            {children}
          </LayoutShell>
        </Providers>

        <style dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 768px) {
            div > div { margin-left: 0 !important; }
          }
        `}} />
      </body>
    </html>
  );
}
