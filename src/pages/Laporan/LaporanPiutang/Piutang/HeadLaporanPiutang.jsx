import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

class HeadLaporanPiutang extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary" disabled={this.props.onSend}>
                {this.props.onSend ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                    Menyiapkan Laporan
                  </>
                ) : (
                  <>
                    Lihat Data <i className="fa fa-print ml-3 "></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

HeadLaporanPiutang = reduxForm({
  form: "HeadLaporanPiutang",
  enableReinitialize: true,
})(HeadLaporanPiutang);
export default connect((state) => {
  return {
    onSend: state.datamaster.onSend,
  };
})(HeadLaporanPiutang);
