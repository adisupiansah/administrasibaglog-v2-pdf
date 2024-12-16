"use client"
import React, {useEffect, useRef} from 'react'
import { Chart, registerables} from 'chart.js'

Chart.register(...registerables); // Registrasi semua modul Chart.js

const BarChart = () => {

  const chartRef = useRef(null)
  const chartPolaRef = useRef(null)

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')
    const data = {
      labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      datasets: [
        {
        label: 'Nota Dinas Keluar',
        data: [7, 19, 20, 5, 20, 3, 11, 9, 1, 20, 10, 15],
        backgroundColor: 'rgb(198, 46, 46)',
        borderColor: 1,
        }, 
        {
          label: 'Disposisi Masuk',
          data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 25, 30, 35],
          backgroundColor: 'rgb(114,191,120)',
          borderColor: 1,
        },
        
  ]
    }

    const cpr = chartPolaRef.current.getContext('2d')
    const dataPola ={
      labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      datasets: [
        {
        label: 'Nota Dinas Keluar (BMP, Harwat)',
        data: [7, 19, 20, 5, 20, 3, 11, 9, 1, 20, 10, 15],
        backgroundColor: 'rgb(250, 188, 63)',
        borderColor: 1,
        }, 
        {
          label: 'Disposisi Masuk (BMP, Harwat)',
          data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 25, 30, 35],
          backgroundColor: 'rgb(38, 102, 207)',
          borderColor: 1,
        },
        
  ]
    }

  const options = {
    responsive: true,
    scales:{
      y: {
        beginAtZero: true,
      }
    }
  }

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options,
  })

  const myChartPolar = new Chart(cpr, {
    type: 'bar',
    data: dataPola,
    options: options,
  })
  return () => {
    myChart.destroy();
    myChartPolar.destroy();
  }
  }, [])

  return (
    <div className="mychart">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12 card-mychart d-flex justify-content-center align-items-center">
              <div className="w-100">
                <div className="card-bod">
                    <canvas ref={chartRef} className='charts'></canvas>
                </div>
              </div>
          </div>
          <div className="col-md-6 col-sm-12">
              <div className="card card-mychartPolar">
                <div className="card-bod">
                    <canvas ref={chartPolaRef} className='chartPola'></canvas>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarChart
