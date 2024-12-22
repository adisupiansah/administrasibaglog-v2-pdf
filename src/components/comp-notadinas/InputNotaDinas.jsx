"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";

const InputNotaDinas = () => {
  const [formData, setFormData] = useState({
    tgl_surat: "",
    no_surat: "",
    kepada: "",
    perihal: "",
    type_notadinas: "",
  });
  const [file, setFile] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile (e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validasi form
    if (!formData.tgl_surat || !formData.no_surat || !formData.kepada || !formData.perihal || !formData.type_notadinas || !file) {
      Swal.fire({
        title: "Error",
        text: "Harap lengkapi semua form!",
        icon: "error",
        confirmButtonColor: "#72bf78",
        confirmButtonText: "OK",
        color: "#D9D9D9",
        background: "#212529",
      });
      return;
    }
  
    try {
      // buat objek FormData untuk mengirim data & file
      const formDataObj = new FormData()
      formDataObj.append('tgl_surat', formData.tgl_surat)
      formDataObj.append('no_surat', formData.no_surat);
      formDataObj.append('kepada', formData.kepada);
      formDataObj.append('perihal', formData.perihal);
      formDataObj.append('type_notadinas', formData.type_notadinas);
      formDataObj.append('notadinas_pdf', file); // tambahkan file ke FormData

      const response = await fetch("/api/v1/notadinas/input", {
        method: "POST",
        body: formDataObj, // Gunakan FormData sebagai Body
      });
  
      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          title: "Berhasil",
          text: "Data berhasil tersimpan",
          icon: "success",
          confirmButtonColor: "#72bf78",
          confirmButtonText: "OK",
          color: "#D9D9D9",
          background: "#212529",
        }).then(() => {
          window.location.href = "/notadinas";
        })

        // Reset form setelah berhasil menyimpan data
        setFormData({
          tgl_surat: "",
          no_surat: "",
          kepada: "",
          perihal: "",
          type_notadinas: "",
        });
        setFile(null);
      } else {
        const error = await response.json();
        Swal.fire({
          title: "Error",
          text: error.message || "Terjadi kesalahan saat menyimpan data",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan pada server",
        icon: "error",
      });
    }
  };

  return (
    <div className="input-notadinas">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-5">
              <div className="card-body">
                <h2 className="card-title text-center">
                  INPUT NOMOR SURAT KELUAR
                </h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <input
                    type="date"
                    className="form-control"
                    name="tgl_surat"
                    value={formData.tgl_surat}
                    onChange={handleChange}
                    placeholder="Tanggal surat"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="no_surat"
                    value={formData.no_surat}
                    onChange={handleChange}
                    placeholder="Nomor surat"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="kepada"
                    value={formData.kepada}
                    onChange={handleChange}
                    placeholder="Kepada"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="perihal"
                    value={formData.perihal}
                    onChange={handleChange}
                    placeholder="Hal.."
                  />

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="type_notadinas"
                    value={formData.type_notadinas}
                    onChange={handleChange}
                  >
                    <option value="">Pilih Type Nota Dinas</option>
                    <option value="notadinas biasa">notadinas biasa</option>
                    <option value="notadinas BMP">notadinas BMP</option>
                    <option value="notadinas Harwat">notadinas Harwat</option>
                  </select>

                  <input 
                  type="file"
                  name="notadinas_pdf"
                  accept='application/pdf'
                  className="form-control"
                  onChange={handleFileChange}
                  />

                  <div className="button-inputnotadinas d-flex justify-content-between flex-columns">
                    <button className="btn col-md-5" type="submit">submit</button>
                    <button
                      className="btn reset col-md-5"
                      onClick={(e) =>{
                        e.preventDefault();
                        setFormData({
                          tgl_surat: "",
                          no_surat: "",
                          kepada: "",
                          perihal: "",
                          type_notadinas: "",
                        })
                        setFile(null)
                      }
                        
                      }
                    >
                      reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputNotaDinas;