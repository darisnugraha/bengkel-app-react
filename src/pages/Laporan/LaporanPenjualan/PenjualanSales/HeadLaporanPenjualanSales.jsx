import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getSales } from "../../../../actions/datamaster_action";
import { getToday } from "../../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../../components/notification/notification";

class HeadLaporanPenjualanSales extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.change("tanggal_awal", getToday());
    this.props.change("tanggal_akhir", getToday());
    this.props.dispatch(getSales());
  }
  listSales() {
    let hasil = this.props.listsales
      .filter((list) => list.kode_divisi === "SLS")
      .map((list) => {
        let data = {
          value: list.kode_pegawai,
          name: list.nama_pegawai,
        };
        return data;
      });
    hasil.push({ value: "SEMUA", name: "SEMUA" });
    return hasil;
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
          <div className="col-lg-3">
            <Field
              name="tanggal_awal"
              component={ReanderField}
              type="date"
              label="Dari Tanggal"
              placeholder="Masukan Tanggal Awal"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="tanggal_akhir"
              component={ReanderField}
              type="date"
              label="Sampai Tanggal"
              placeholder="Masukan Sampai Tanggal"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="kode_sales"
              component={ReanderSelect}
              options={this.listSales()}
              type="text"
              label="Kode Sales"
              placeholder="Masukan Kode Sales"
            />
          </div>
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

HeadLaporanPenjualanSales = reduxForm({
  form: "HeadLaporanPenjualanSales",
  enableReinitialize: true,
})(HeadLaporanPenjualanSales);
export default connect((state) => {
  return {
    listsales: state.datamaster.listsales,
    onSend: state.datamaster.onSend,
  };
})(HeadLaporanPenjualanSales);
