"use client";
import Image from "next/image";
import logo from "@/app/img/logoLogistik.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigasibar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenDisposisi, setIsDropdownOpenDisposisi] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const pathname = usePathname();

  if(pathname === '/admin/auth') return null

  useEffect(() => {
    if (pathname === "/admin") {
      setActiveMenu("Dashboard");
      setActiveSubMenu(null);
    } else if (pathname.startsWith("/admin/notadinas")) {
      setActiveMenu("Nota Dinas");

      if (pathname === "/admin/notadinas") {
        setActiveSubMenu("Nota keluar");
      } else if (pathname === "/admin/notadinas/input") {
        setActiveSubMenu("Input");
      } else if (pathname === "/admin/notadinas/pengajuan") {
        setActiveSubMenu("Pengajuan");
      } else if (pathname === "/admin/notadinas/arsip") {
        setActiveSubMenu("Arsip");
      }
    } else if (pathname.startsWith("/admin/disposisi")) {
      setActiveMenu("Disposisi");

      if (pathname === "/admin/disposisi") {
        setActiveSubMenu("Disposisi masuk");
      } else if (pathname === "/admin/disposisi/input") {
        setActiveSubMenu("Input disposisi");
      }
    }
  }, [pathname]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpenDisposisi(false);
  };

  const toggleDropdownDisposisi = () => {
    setIsDropdownOpenDisposisi(!isDropdownOpenDisposisi);
    setIsDropdownOpen(false);
  };

  const handleSubMenuClick = () => {
    setIsDropdownOpen(false);
    setIsDropdownOpenDisposisi(false);
  };

  const menuActiveClass = (menu) => (activeMenu === menu ? "active" : "");
  const submenuActiveClass = (submenu) => (activeSubMenu === submenu ? "active" : "");

  return (
    <div className="fixed-top">
      <nav className="navbar">
        <div className="container">
          <a className="navbar-brand d-flex justify-content-center align-items-center" href="/">
            <Image src={logo} alt="logo" width={56} height={65} />
            <div className="d-flex flex-column mx-2">
              <span>BAGIAN LOGISTIK</span>
              <span>POLRES KARIMUN</span>
            </div>
          </a>
        </div>
      </nav>
      <nav className="navbar-nav shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Link href="/admin" className={`pointer ${menuActiveClass("Dashboard")}`}>
              Dashboard
            </Link>
            <div className="dropdown">
              <div
                className={`pointer dropdown-toggle ${menuActiveClass("Nota Dinas")}`}
                onClick={toggleDropdown}
              >
                {activeMenu === "Nota Dinas" ? activeSubMenu : "Nota Dinas"}
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu show mt-3">
                  <Link
                    href="/admin/notadinas"
                    className={`dropdown-item ${submenuActiveClass("Nota keluar")}`}
                    onClick={handleSubMenuClick}
                  >
                    Nota keluar
                  </Link>
                  <Link
                    href="/admin/notadinas/input"
                    className={`dropdown-item ${submenuActiveClass("Input")}`}
                    onClick={handleSubMenuClick}
                  >
                    Input
                  </Link>
                  <Link
                    href="/admin/notadinas/pengajuan"
                    className={`dropdown-item ${submenuActiveClass("Pengajuan")}`}
                    onClick={handleSubMenuClick}
                  >
                    Pengajuan
                  </Link>
                  <Link
                    href="/admin/notadinas/arsip"
                    className={`dropdown-item ${submenuActiveClass("Arsip")}`}
                    onClick={handleSubMenuClick}
                  >
                    Arsip
                  </Link>
                </div>
              )}
            </div>
            <div className="dropdown">
              <div
                className={`pointer dropdown-toggle ${menuActiveClass("Disposisi")}`}
                onClick={toggleDropdownDisposisi}
              >
                {activeMenu === "Disposisi" ? activeSubMenu : "Disposisi"}
              </div>
              {isDropdownOpenDisposisi && (
                <div className="dropdown-menu show mt-3">
                  <Link
                    href="/admin/disposisi"
                    className={`dropdown-item ${submenuActiveClass("Disposisi masuk")}`}
                    onClick={handleSubMenuClick}
                  >
                    Disposisi masuk
                  </Link>
                  <Link
                    href="/admin/disposisi/input"
                    className={`dropdown-item ${submenuActiveClass("Input disposisi")}`}
                    onClick={handleSubMenuClick}
                  >
                    Input disposisi
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigasibar;
