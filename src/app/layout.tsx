import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata: Metadata = {
  title: "Dakesh",
  description: "Trade it - Don't Waste it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;700&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
