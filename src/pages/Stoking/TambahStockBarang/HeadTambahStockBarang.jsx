import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { showModal } from "../../../actions/datamaster_action";
import { getToday } from "../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { getNoTambahStock } from "../../../actions/stocking_action";

class HeadTambahStockBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listShelving: [],
    };
  }
  componentDidMount() {
    this.props.change("tanggal", getToday());
    this.props.dispatch(getNoTambahStock());
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <div className="row">
            <div className="col-lg-3">
              <Field
                name="no_tambah"
                component={ReanderField}
                type="text"
                label="Nomor Tambah"
                placeholder="Masukan Nomor Tambah"
                readOnly
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="tanggal"
                component={ReanderField}
                type="date"
                label="Tanggal"
                placeholder="Masukan Tanggal"
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
                label="Lokasi Shelving"
                placeholder="Pilih Lokasi Shelving"
                onChange={(e) => localStorage.setItem("lokasi_shelving", e)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-6">
              <div className="text-left">
                <button className="btn btn-primary">
                  {this.props.onSend ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                      Menyimpan
                    </>
                  ) : (
                    <>
                      Simpan <i className="fa fa-paper-plane ml-3 "></i>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => this.props.dispatch(showModal())}
                  onKeyPress={(e) => {
                    e.key === "Enter" && this.props.dispatch(showModal());
                  }}
                >
                  Tambah Barang <i className="fa fa-plus ml-3"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
HeadTambahStockBarang = reduxForm({
  form: "permintaanBarang",
  enableReinitialize: true,
})(HeadTambahStockBarang);
export default connect((state) => {
  return {
    initialValues: {
      tanggal: getToday(),
    },
    onSend: state.datamaster.onSend,
    listSelfing: state.datamaster.listselfing,
    noTambahStock: state.stocking.noTambahStock,
  };
})(HeadTambahStockBarang);
