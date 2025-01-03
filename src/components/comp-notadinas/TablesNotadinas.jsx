"use client";
import React, { useEffect, useState } from "react";
import InitTable from "@/libs/datatables-config";
import Link from "next/link";
import { createRoot } from "react-dom/client";
import EditNotaDinas from "./EditNotaDinas";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import moment from "moment-timezone";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

const TablesNotadinas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // state untuk loading
  const [editData, setEditData] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  const ambilData = async () => {
    try {
      const response = await fetch("/api/v1/notadinas/getnota");
      if (!response.ok) {
        throw new Error("gagal fetch data");
      }
      const hasil = await response.json();
      setData(hasil);
    } catch (error) {
      console.error("error saat mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditData = (id) => {
    const edit = data.find((item) => item.id === id);
    setEditData(edit);
  };

  const handleDeleteData = async (id) => {
    Swal.fire({
      title: "Anda yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#72bf78",
      cancelButtonColor: "#c62e2e",
      confirmButtonText: "Ya, hapus data!",
      color: "#D9D9D9",
      background: "#212529",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/v1/notadinas/delete?id=${id}`, {
            method: "DELETE",
          });

          await response.json();
          if (!response.ok) {
            throw new Error("gagal hapus data");
          }

          Swal.fire({
            title: "Berhasil",
            text: "Data berhasil dihapus",
            icon: "success",
            confirmButtonColor: "#72bf78",
            color: "#D9D9D9",
            background: "#212529",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
            ambilData();
          });
        } catch (error) {
          console.error("error saat menghapus data:", error);
          Swal.fire("Gagal", "data gagal dihapus", "error");
        }
      }
    });
  };

  const action = (rowData) => {
    return (
      <div>
        <button
          className="btn btn-sm action-edit col-md-12 mt-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => handleEditData(rowData.id)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm action-delete col-md-12 mt-2"
          onClick={() => handleDeleteData(rowData.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  const WaktuJakarta = (rowData) => {
    const UTCwaktu = new Date(rowData.tgl_input);
    const waktuJakarta = moment(UTCwaktu)
      .tz("Asia/Jakarta")
      .format("DD-MM-YYYY - HH:mm:ss");
    return waktuJakarta;
  };



  // ambil data saat komponen dimuat
  useEffect(() => {
    ambilData();
  }, []);

  // useEffect modal
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      {/* modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Nota Dinas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditNotaDinas data={editData} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="datatables" data-bs-theme="dark">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <InputText
                    placeholder="Cari data"
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                  />
                  <DataTable
                    value={data}
                    globalFilter={globalFilter}
                    emptyMessage="Tidak ada data"
                    loading={loading}
                    paginator
                    tableStyle={{ minWidth: '50rem' }}
                    rows={1}
                    responsiveLayout="scroll"
                    className='DataTable'
                
                  >
                    <Column
                      field="id"
                      header="No"
                      sortable
                      body={(rowData, options) => options.rowIndex + 1}
                    />
                    <Column field="tgl_surat" header="Tanggal Surat" sortable/>
                    <Column field="no_surat" header="Nomor Surat" sortable/>
                    <Column field="kepada" header="Kepada" sortable/>
                    <Column field="perihal" header="Hal" sortable/>
                    <Column
                      field="tgl_input"
                      header="Tanggal Input"
                      body={WaktuJakarta}
                      sortable
                    />
                    <Column
                      field="notadinas_pdf"
                      header="File"
                      body={(rowData) => (
                        <Link href={rowData.notadinas_pdf} target="_blank" className='btn-addtopdf'>
                          <FaEye className="icon-viewpdf"/>
                        </Link>
                      )}
                    />
                    <Column field="action" header="Action" body={action} />
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablesNotadinas;
