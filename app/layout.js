// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../app/page/firebase/AuthContext";
import "../app/arabic/i18n.js";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Domehq",
  description: "Technology that you needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Client-side provider only */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
