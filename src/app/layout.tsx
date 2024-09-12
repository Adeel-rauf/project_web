import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
// import Footer from "./components/footer";
import Head from "next/head";

export const metadata: Metadata = {
  title: "myWebsite",
  description: "A lawyer's website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap"
          rel="stylesheet"
          />
      </Head>
      <body className="bg-gray-100 text-gray-900">
        {/* Navbar Component */}
        <Navbar />

        {/* Main content section with better accessibility */}
        <main className="">
          {children}
        </main>

        {/* Footer component for consistent styling */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
