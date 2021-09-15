import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getGudang } from "../../../actions/datamaster_action";
import { ReanderField } from "../../../components/notification/notification";

class HeadLihatLaporanStockOpname extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getGudang());
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
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <Field
              name="tanggal_awal"
              component={ReanderField}
              type="date"
              label="Tanggal"
              placeholder="Masukan Tanggal"
            />
          </div>
          <div className="col-lg-3"></div>
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <Field
              name="tanggal_akhir"
              component={ReanderField}
              type="date"
              label="Tanggal"
              placeholder="Masukan Tanggal"
            />
          </div>
          <div className="col-lg-3"></div>
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

HeadLihatLaporanStockOpname = reduxForm({
  form: "HeadLihatLaporanStockOpname",
  enableReinitialize: true,
})(HeadLihatLaporanStockOpname);
export default connect((state) => {
  return {
    listgudang: state.datamaster.listgudang,
    onSend: state.datamaster.onSend,
  };
})(HeadLihatLaporanStockOpname);
