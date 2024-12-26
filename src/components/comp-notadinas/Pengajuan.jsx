"use client";
import React, { useEffect, useState } from "react";
import InitTable from "@/libs/datatables-config";
import { createRoot } from "react-dom/client";
import Link from "next/link";
import moment from "moment-timezone";

const PengajuanNotaDinas = () => {
const [data, setData] = useState([])
const [loading, setLoading] = useState(true) // state untuk loading


  const Dashboard = () => {
    return (
      <Link href="/admin" className="btn back-dashboard">
        Dashboard 
      </Link>
    );
  };

  const DataTables = () => {

    let tombolBack = document.createElement('div')
    let root = createRoot(tombolBack)
    root.render(<Dashboard />);

      InitTable("#example", {
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
                },
                pageLength: {
                  menu: [
                    [10, 25, 100, -1],
                    [10, 25, 100, "All"],
                  ],
                },
              },
            ],
            topEnd: [tombolBack],
          },
          scrollX: true,
        });
  }

  const ambilData = async () => {
    try {
      const response = await fetch('/api/client/ambildata')
      if (!response.ok) {
        throw new Error("gagal fetch data")
      }
      const hasil = await response.json()
      setData(hasil)

    } catch (error) {
      console.error("error saat mengambil data:", error);
    } finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!loading && data.length > 0) {
      // Inisialisasi DataTables setelah data tersedia
      const table =  DataTables();
      if (table) {
        table.destroy()
      }
    }
  }, [loading, data]);

  useEffect(() => {
    ambilData()
  }, []);

  return (
    <div className="pengajuan-notadinas" data-bs-theme="dark">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
              {loading ? (
                  <div className="spinner-border text-primary" role="status"/>
                  ) : (
                    <table
                      className="table table-striped table-dark p-3 "
                      id="example"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama</th>
                          <th>Satfung</th>
                          <th>Nomor Pengajuan</th>
                          <th>Hal</th>
                          <th>Tanggal Pengajuan</th>   
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => {
                          // konversi waktu dari UTC ke waktu Jakarta
                          const UTCwaktu = new Date(item.tgl_pengajuan)
                          const waktuJakarta = moment(UTCwaktu).tz('Asia/Jakarta').format('DD-MM-YYYY - HH:mm:ss')

                          return (
                            <tr key={item.id}>
                              <td>{index + 1}</td>                     
                              <td>{item.nama}</td>                     
                              <td>{item.satfung}</td>                     
                              <td>{item.no_pengajuan}</td>                     
                              <td>{item.perihal}</td>                     
                              <td>{waktuJakarta}</td>                     
                          </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PengajuanNotaDinas;
