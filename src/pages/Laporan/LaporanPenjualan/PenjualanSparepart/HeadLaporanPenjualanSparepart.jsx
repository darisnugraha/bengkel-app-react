import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getKategori } from "../../../../actions/datamaster_action";
import { getToday } from "../../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../../components/notification/notification";

class HeadLaporanPenjualanSparepart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getKategori());
    this.props.change("tanggal_awal", getToday());
    this.props.change("tanggal_akhir", getToday());
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
              name="kriteria_sparepart"
              component={ReanderSelect}
              options={this.props.listkategori.map((list) => {
                let data = {
                  value: list.kode_kategori,
                  name: list.nama_kategori,
                };
                return data;
              })}
              type="text"
              label="Kriteria Sparepart"
              placeholder="Masukan Kriteria Sparepart"
            />
          </div>

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

HeadLaporanPenjualanSparepart = reduxForm({
  form: "HeadLaporanPenjualanSparepart",
  enableReinitialize: true,
})(HeadLaporanPenjualanSparepart);
export default connect((state) => {
  return {
    listkategori: state.datamaster.listkategori,
    onSend: state.datamaster.onSend,
  };
})(HeadLaporanPenjualanSparepart);
