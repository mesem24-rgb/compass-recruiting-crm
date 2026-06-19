import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compass Group Recruiting CRM",
  description: "Custom recruiting CRM for Compass Group Recruiting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
