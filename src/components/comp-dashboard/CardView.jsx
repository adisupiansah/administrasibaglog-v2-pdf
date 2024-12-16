import React from 'react'

const CardView = () => {
  return (
    <div className='card-view'>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        NOTA DINAS KELUAR
                    </h5>
                    <h1 className='title-ndkeluar'>90</h1>
                    <div className="card-text">Nota dinas keluar sebanyak <span className='text-danger'>90</span></div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        DISPOSISI MASUK
                    </h5>
                    <h1 className='title-disposisi'>150</h1>
                    <div className="card-text-disposisi">Disposisi masuk sebanyak <span className=''>150</span></div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        DISPOSISI MASUK (BMP, RANMOR)
                    </h5>
                    <h1 className='title-ndranmor'>120</h1>
                    <div className="card-text-ndranmor">Disposisi masuk BMP dan Ranmor sebanyak <span className=''>120</span></div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        NOTA DINAS KELUAR (BMP, HARWAT)
                    </h5>
                    <h1 className='title-ndharwat'>20</h1>
                    <div className="card-text-ndharwat">Nota dinas keluar BMP dan Harwat sebanyak <span className=''>20</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CardView
