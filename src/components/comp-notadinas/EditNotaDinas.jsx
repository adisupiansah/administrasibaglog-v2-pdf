import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditNotaDinas = ({ data }) => {
  const [formData, setFormData] = useState({
    tgl_surat: "",
    no_surat: "",
    kepada: "",
    perihal: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        tgl_surat: data.tgl_surat || "",
        no_surat: data.no_surat || "",
        kepada: data.kepada || "",
        perihal: data.perihal || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("api/v1/notadinas/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.id, ...formData }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      
      Swal.fire({
        title: "Update Berhasil",
        text: "Data berhasil diedit",
        icon: "success",
        confirmButtonText: "Yes",
        confirmButtonColor: "#72bf78",
        color: '#D9D9D9',
        background: '#212529',
      }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
      });
    } catch (error) {
      console.error("Eror saat edit data:", error);
      alert("TERJADI KESALAHAN SAAT EDIT DATA");
    }
  };
  return (
    <div className='form-editnotadinas'>
      <form onSubmit={handleSubmit}>
        <div className="mt-3">
          <label className="form-label">Tanggal Surat</label>
          <input
            type="date"
            className="form-control"
            name="tgl_surat"
            value={formData.tgl_surat}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Nomor Surat</label>
          <input
            type="text"
            className="form-control"
            name="no_surat"
            value={formData.no_surat}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Kepada</label>
          <input
            type="text"
            className="form-control"
            name="kepada"
            value={formData.kepada}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Perihal</label>
          <input
            type="text"
            className="form-control"
            name="perihal"
            value={formData.perihal}
            onChange={handleInputChange}
          />
        </div>
      <div className='d-flex justify-content-center align-items-center mt-3'>
        <button className='btn btn-editnotadinas col-md-6'>simpan</button>
      </div>
        
      </form>
    </div>
  );
};

export default EditNotaDinas;
