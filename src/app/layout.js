import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "../../src/app/components/Providers"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shabuj Global - Study Abroad Guidance & Services",
  description: "Shabuj Global provides comprehensive education and guidance for students planning to study abroad. Explore programs, events, and resources.",
  keywords: "study abroad, education, guidance, student services, international universities",
  authors: [{ name: "Shabuj Global", url: "https://yourwebsite.com" }],
  creator: "Shabuj Global",
  publisher: "Shabuj Global",
  robots: "index, follow",
  openGraph: {
    title: "Shabuj Global - Study Abroad Guidance & Services",
    description: "Comprehensive guidance and resources for students planning to study abroad.",
    url: "https://yourwebsite.com",
    siteName: "Shabuj Global",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shabuj Global",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shabuj Global - Study Abroad Guidance & Services",
    description: "Comprehensive guidance and resources for students planning to study abroad.",
    site: "@YourTwitterHandle",
    creator: "@YourTwitterHandle",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme='light'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
