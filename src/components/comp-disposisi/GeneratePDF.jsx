import React from "react";
import { jsPDF } from "jspdf";
import templateImage from '../../app/img/template.jpg'

const GeneratePDF = ({ id }) => {
  // Fungsi untuk mendapatkan data disposisi berdasarkan ID
  const getDataById = async (id) => {
    try {
      const response = await fetch(`/api/v1/disposisi/getdisposisi?id=${id}`); // Endpoint untuk data berdasarkan ID
      if (!response.ok) {
        throw new Error("Gagal mengambil data disposisi");
      }
      const hasil = await response.json();
      return hasil;
    } catch (error) {
      console.error("Error saat mengambil data disposisi:", error);
      throw error;
    }
  };

  const hasilPDF = async () => {
    try {
      // Ambil data berdasarkan ID
      const contohData = await getDataById(id);
  
      // Buat dokumen PDF
      const doc = new jsPDF("p", "mm", "a4");
  
      // Tambahkan gambar template sebagai latar belakang
      const img = new Image();
      img.src = templateImage.src; // Gunakan properti src dari object templateImage
      img.onload = () => {
        doc.addImage(img, "JPEG", 0, 0, 210, 297); // Gambar template memenuhi ukuran A4 (210x297 mm)
  
        // ===== Lembar Disposisi =====
        doc.setFontSize(14);
        doc.text("LEMBAR DISPOSISI", 85, 40);
  
        // ===== Tabel Kiri =====
        doc.setFontSize(12);
        doc.text("SATFUNG :", 15, 65);
        doc.text(contohData.satfung || "-", 40, 65); // Data dinamis
  
        doc.text("SURAT DARI :", 15, 72);
        doc.text(contohData.satfung || "-", 40, 72); // Data dinamis
  
        doc.text("NOMOR SURAT :", 15, 79);
        doc.text(contohData.no_surat || "-", 40, 79); // Data dinamis
  
        doc.text("TANGGAL SURAT :", 15, 86);
        doc.text(contohData.tgl_surat || "-", 40, 86); // Data dinamis
  
        doc.text("PERIHAL :", 15, 93);
        const perihalText = doc.splitTextToSize(contohData.perihal || "-", 150); // Pecah teks panjang
        doc.text(perihalText, 40, 93); // Data dinamis multi-line
  
        // Membuka di tab baru
        const pdfBlobURL = doc.output("bloburl"); // Membuat blob URL
        window.open(pdfBlobURL, "_blank"); // Membuka di tab baru
      };
    } catch (error) {
      console.error("Error saat membuat PDF:", error);
    }
  };
  
  

  return (
    <button className="btn btn-primary" onClick={hasilPDF}>
      Print
    </button>
  );
};

export default GeneratePDF;
