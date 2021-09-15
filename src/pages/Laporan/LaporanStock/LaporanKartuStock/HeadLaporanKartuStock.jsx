import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { AxiosMasterGet } from "../../../../axios";
import {
  ReanderField,
  ReanderSelect,
} from "../../../../components/notification/notification";

class HeadLaporanKartuStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listJenis: [],
      listKategori: [],
      listGudang: [],
    };
  }
  componentDidMount() {
    AxiosMasterGet("kategori/get/all").then((res) =>
      this.setState({
        listKategori:
          res &&
          res.data.map((list) => {
            let data = {
              value: list.kode_kategori,
              name: list.nama_kategori,
            };
            return data;
          }),
      })
    );

    AxiosMasterGet("lokasi-gudang/get/all").then((res) =>
      this.setState({
        listGudang:
          res &&
          res.data.map((list) => {
            let data = {
              value: list.kode_lokasi_gudang,
              name: list.nama_lokasi_gudang,
            };
            return data;
          }),
      })
    );
  }
  getJenis(hasil) {
    this.props.change("kode_jenis", "");
    AxiosMasterGet("jenis/get/by-kode-kategori/" + hasil).then((res) =>
      this.setState({
        listJenis:
          res &&
          res.data.map((list) => {
            let data = {
              value: list.kode_jenis,
              name: list.nama_jenis,
            };
            return data;
          }),
      })
    );
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
              name="kode_kategori"
              component={ReanderSelect}
              options={this.state.listKategori}
              type="text"
              label="Kategori"
              placeholder="Masukan Kategori"
              onChange={(data) => this.getJenis(data)}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="kode_jenis"
              component={ReanderSelect}
              options={this.state.listJenis}
              type="text"
              label="Jenis"
              placeholder="Masukan Jenis"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="kode_lokasi"
              component={ReanderSelect}
              options={this.state.listGudang}
              type="text"
              label="Lokasi"
              placeholder="Masukan Lokasi"
            />
          </div>
          {/* <div className="col-lg-3">
            <Field
              name="tanggal_awal"
              component={ReanderField}
              type="date"
              label="Dari Tanggal"
              placeholder="Masukan Tanggal Awal"
            />
          </div> */}
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

HeadLaporanKartuStock = reduxForm({
  form: "HeadLaporanKartuStock",
  enableReinitialize: true,
})(HeadLaporanKartuStock);
export default connect((state) => {
  return {
    onSend: state.datamaster.onSend,
  };
})(HeadLaporanKartuStock);
