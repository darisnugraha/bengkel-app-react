import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderSelect } from "../../../../components/notification/notification";
import {
  getDiskon,
  getInfoBarang,
  getJenis,
  getSelfing,
} from "../../../../actions/datamaster_action";

class HeadLaporanKartuStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKategori: "",
      listJenis: [],
    };
  }
  componentDidMount() {
    this.props.dispatch(getDiskon());
    this.props.dispatch(getSelfing());
    this.props.dispatch(getJenis());
    this.props.dispatch(getInfoBarang());
  }

  getJenis(data) {
    this.setState({
      listJenis: this.props.listJenis.filter(
        (fil) => fil.kode_kategori === data
      ),
    });
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
              options={this.props.listDiskon.map((data) => {
                return {
                  value: data.kode_kategori,
                  name: data.nama_kategori,
                };
              })}
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
              options={this.state.listJenis.map((data) => {
                return {
                  value: data.kode_jenis,
                  name: data.nama_jenis,
                };
              })}
              type="text"
              label="Jenis"
              placeholder="Masukan Jenis"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="kode_lokasi_shelving"
              component={ReanderSelect}
              options={this.props.listSelfing.map((data) => {
                return {
                  value: data.kode_lokasi_selving,
                  name: data.nama_lokasi_selving,
                };
              })}
              type="text"
              label="Lokasi"
              placeholder="Masukan Lokasi"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="kode_barcode"
              component={ReanderSelect}
              options={this.props.listInfoBarang.map((data) => {
                return {
                  value: data.kode_barcode,
                  name: data.kode_barcode,
                };
              })}
              type="text"
              label="Kode Barcode"
              placeholder="Masukan Kode Barcode"
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
    listJenis: state.datamaster.listjenis,
    listSelfing: state.datamaster.listselfing,
    listDiskon: state.datamaster.listDiskon,
    listInfoBarang: state.datamaster.listInfoBarang,
  };
})(HeadLaporanKartuStock);
