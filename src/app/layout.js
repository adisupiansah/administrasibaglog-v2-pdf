import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.css";
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/libs/fontawesome';
import "./globals.css";
import Navigasibar from "@/components/Navigasi/Navigasibar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  // LOGAD (LOGISTIK ADMINISTRASI)
  title: "SILOGAD RESKARIMUN",
  description: "SILOGAD - SISTEM INFORMASI LOGISTIK DAN ADMINISTRASI RESKARIMUN",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigasibar/>
      </body>
        {children}
    </html>
  );
}
