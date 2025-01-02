import "bootstrap/dist/css/bootstrap.css";
import "@/app/css/admin.css";
import Navigasibar from "@/components/Navigasi/Navigasibar";
import CekClientLogin from "@/libs/CekClientLogin";
import { PrimeReactProvider } from "primereact/api";
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/soho-dark/theme.css';

export const metadata = {
  // LOGAD (LOGISTIK ADMINISTRASI)
  title: "SILOGAD RESKARIMUN",
  description:
    "SILOGAD - SISTEM INFORMASI LOGISTIK DAN ADMINISTRASI RESKARIMUN",
};

        

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="body">
        <PrimeReactProvider>
          <CekClientLogin />
          <Navigasibar />
          {children}
        </PrimeReactProvider>
      </div>
    </>
  );
}
