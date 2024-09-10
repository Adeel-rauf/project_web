import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar"; 
// import Footer from "./components/footer";
{/* <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400&display=swap" rel="stylesheet" /> */}
<>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet" />
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
/>
</>
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
      <body className="bg-gray-100 text-gray-900">
        {/* Navbar Component */}
        <Navbar />

        {/* Main content section with better accessibility */}
        <main className="container mx-auto px-4 py-6 min-h-screen">
          {children}
        </main>

        {/* Footer component for consistent styling */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
