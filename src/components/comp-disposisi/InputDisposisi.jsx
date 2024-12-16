import React from "react";

const InputDisposisi = () => {
  return (
    <div className="input-disposisi">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-5">
              <div className="card-body">
                <h2 className="card-title text-center">
                  INPUT DISPOSISI
                </h2>
                <form action="">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Tanggal surat"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nomor disposisi"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nomor surat"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Hal..."
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Satfung"
                  />
                  <div className="button-InputDisposisi d-flex justify-content-between flex-columns">
                    <button className="btn col-md-5">submit</button>
                    <button className="btn reset col-md-5">reset</button>
                    
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

export default InputDisposisi;
