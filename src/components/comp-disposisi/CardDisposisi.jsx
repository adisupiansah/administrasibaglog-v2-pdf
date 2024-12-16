import React from 'react'
import ChartDisposisi from './ChartDisposisi'


const CardDisposisi = () => {
  return (
    <div className='card-disposisi'>
      <div className="container">
        <div className="row ">
  
            <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="card disposisi w-100">
                    <div className="card-body">
                        <h5 className="card-title p-2">
                            SELURUH DISPOSISI
                        </h5>
                        <div className="d-flex justify-content-center align-items-center">
                          <h1 className='card-text py-3'>412</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center ">
                <div className="card disposisi w-100">
                    <div className="card-body">
                        <h5 className="card-title-bmp p-2">
                            BANYAK DISPOSISI HARWAT, BMP
                        </h5>
                        <div className="d-flex justify-content-center align-items-center">
                          <h1 className='card-text-bmp py-3'>197</h1>
                        </div>
                    </div>
                </div>
            </div>
           


            <div className="col-md-4 col-sm-12">
             <ChartDisposisi/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CardDisposisi
