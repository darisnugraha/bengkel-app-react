import React, { Component } from "react";

class FooterKomplainService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-2">
            <div className="form-group">
              <label htmlFor="">Grand Total Sparepart</label>
              <input
                type="number"
                onChange={this.handlerChange("total_sparepart")}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-group">
              <label htmlFor="">Grand Total Jasa</label>
              <input
                type="number"
                onChange={this.handlerChange("total_jasa")}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-1">
            <div className="form-group">
              <label htmlFor="">Discount ( % )</label>
              <input
                type="number"
                onChange={this.handlerChange("jumlah_discount")}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group">
              <label htmlFor="">Total Biaya Seluruh</label>
              <input
                type="number"
                value={this.state.total}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterKomplainService;
