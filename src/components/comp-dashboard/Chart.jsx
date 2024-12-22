"use client";
import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); // Registrasi semua modul Chart.js

const BarChart = () => {
  const chartRef = useRef(null);
  const chartPolaRef = useRef(null);
  const chart = useRef(null);
  const chart2 = useRef(null);

  const [hitungSeluruhNotadinas, setHitungSeluruhNotadinas] = useState(0);
  const [hitungHarwatNotadinas, setHitungHarwatNotadinas] = useState(0);
  const [hitungBMPNotadinas, setHitungBMPNotadinas] = useState(0);

  const [hitungSeluruhDisposisi, setHitungSeluruhDisposisi] = useState(0);
  const [hitungHarwatDisposisi, setHitungHarwatDisposisi] = useState(0);
  const [hitungBMPDisposisi, setHitungBMPDisposisi] = useState(0);

  const groupByMonth = (data, dateField) => {
    const groupedData = Array(12).fill(0); // Array untuk 12 bulan
    data.forEach((item) => {
      const date = new Date(item[dateField]);
      const month = date.getMonth(); // 0 = Januari, 11 = Desember
      groupedData[month]++;
    });
    return groupedData;
  };

  const hitungNotadinas = async () => {
    try {
      const response = await fetch("/api/v1/notadinas/getnota");
      const data = await response.json();

      const notadinasByMonth = groupByMonth(data, "tgl_input");
      setHitungSeluruhNotadinas(notadinasByMonth);

      const harwatByMonth = groupByMonth(
        data.filter((item) => item.type_notadinas === "notadinas Harwat"),
        "tgl_input"
      );
      setHitungHarwatNotadinas(harwatByMonth);

      const BMPByMonth = groupByMonth(
        data.filter((item) => item.type_notadinas === "notadinas BMP"),
        "tgl_input"
      );
      setHitungBMPNotadinas(BMPByMonth);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hitungDisposisi = async () => {
    try {
      const response = await fetch("/api/v1/disposisi/getdisposisi");
      const data = await response.json();

      const disposisiByMonth = groupByMonth(data, "tgl_disposisi");
      setHitungSeluruhDisposisi(disposisiByMonth);

      const harwatByMonth = groupByMonth(
        data.filter((item) => item.type_disposisi === "disposisi Harwat"),
        "tgl_disposisi"
      );
      setHitungHarwatDisposisi(harwatByMonth);

      const BMPByMonth = groupByMonth(
        data.filter((item) => item.type_disposisi === "disposisi BMP"),
        "tgl_disposisi"
      );
      setHitungBMPDisposisi(BMPByMonth);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const InisialisasiChart = () => {
    if (chart.current) {
      chart.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const data = {
      labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      datasets: [
        {
          label: "Nota Dinas Keluar",
          data: hitungSeluruhNotadinas,
          backgroundColor: "rgb(198, 46, 46)",
          borderColor: 1,
        },
        {
          label: "Disposisi Masuk",
          data: hitungSeluruhDisposisi,
          backgroundColor: "rgb(114,191,120)",
          borderColor: 1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    // Membuat instance Chart untuk ctx
    chart.current = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    // Grafik kedua
    if(chart2.current){
      chart2.current.destroy();
    }

    const cpr = chartPolaRef.current.getContext("2d");
    const dataPola = {
      labels: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      datasets: [
        {
          label: "Nota Dinas Keluar (Harwat)",
          data: hitungHarwatNotadinas,
          backgroundColor: "rgb(250, 188, 63)",
          borderColor: 1,
        },
        {
          label: "Nota Dinas Keluar (BMP)",
          data: hitungBMPNotadinas,
          backgroundColor: "rgb(197, 145, 0)",
          borderColor: 1,
        },
        {
          label: "Disposisi Masuk (Harwat)",
          data: hitungHarwatDisposisi,
          backgroundColor: "rgb(38, 102, 207)",
          borderColor: 1,
        },
        {
          label: "Disposisi Masuk (BMP)",
          data: hitungBMPDisposisi,
          backgroundColor: "rgb(4, 56, 139)",
          borderColor: 1,
        },
      ],
    };

    const optionsCpr = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Membuat instance Chart untuk cpr
    chart2.current = new Chart(cpr, {
      type: "bar",
      data: dataPola,
      options: optionsCpr,
    });
  };

  useEffect(() => {
    InisialisasiChart();
  }, [hitungSeluruhNotadinas, hitungSeluruhDisposisi]);

  useEffect(() => {
    hitungNotadinas();
    hitungDisposisi();
  }, []);

  return (
    <div className="mychart">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-mychart">
              <div className="card-body">
                <canvas ref={chartRef} className="charts"></canvas>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 my-4">
            <div className="card card-mychartPolar">
              <div className="card-bod">
                <canvas ref={chartPolaRef} className="chartPola"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
