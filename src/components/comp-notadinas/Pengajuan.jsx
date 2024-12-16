"use client";
import React, { useEffect } from "react";
import InitTable from "@/libs/datatables-config";
import { createRoot } from "react-dom/client";
import Link from "next/link";

const PengajuanNotaDinas = () => {

  const Dashboard = () => {
    return (
      <Link href="#" className="btn back-dashboard">
        Dashboard 
      </Link>
    );
  };

  useEffect(() => {
    let tombolBack = document.createElement('div')
    let root = createRoot(tombolBack)
    root.render(<Dashboard />);
    InitTable("#tablepengajuan", {
      language: {
        info: "Halaman _PAGE_ dari _PAGES_",
        infoEmpty: "tidak ada catatan yang tersedia",
        infoFiltered: "(difilter dari _MAX_ data)",
        lengthMenu: "_MENU_ banyak halaman",
        zeroRecords: "Data tidak ditemukan",
      },
      layout: {
        topStart: [
          {
            search: {
              placeholder: "Cari data",
            }
          },
        ],
        topEnd: tombolBack,
      },
    });
  }, []);

  return (
    <div className="pengajuan-notadinas" data-bs-theme="dark">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <table className="table table-striped p-3 " id="tablepengajuan">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Office</th>
                      <th>Age</th>
                      <th>Start date</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tiger Nixon</td>
                      <td>System Architect</td>
                      <td>Edinburgh</td>
                      <td>61</td>
                      <td>2011-04-25</td>
                      <td>$320,800</td>
                    </tr>
                    <tr>
                      <td>Garrett Winters</td>
                      <td>Accountant</td>
                      <td>Tokyo</td>
                      <td>63</td>
                      <td>2011-07-25</td>
                      <td>$170,750</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PengajuanNotaDinas;
