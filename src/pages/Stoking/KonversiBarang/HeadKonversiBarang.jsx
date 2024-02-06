import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { showModal } from "../../../actions/datamaster_action";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { getToday } from "../../../components/notification/function";
import { getNoKonversi } from "../../../actions/stocking_action";

const maptostate = (state) => {
  return {
    initialValues: {
      no_pindah: localStorage.getItem("no_pindah") || "",
      tanggal: getToday(),
    },
    onSend: state.datamaster.onSend,
    listSelfing: state.datamaster.listselfing,
    listSupplier: state.datamaster.listsupplier,
    konversi_temp: state.stocking.konversi_temp,
  };
};
class HeadKonversiBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLokasi: [],
      listSupplier: [],
    };
  }
  componentDidMount() {
    this.props.change("tanggal", getToday());
    this.props.dispatch(getNoKonversi());
  }
  setLokasi(e) {
    this.setState({
      lokasi_pilihan: e,
    });
    localStorage.setItem("lokasi_pilihan", e);
  }
  setSupplier(e) {
    this.setState({
      supplier_pilihan: e,
    });
    localStorage.setItem("supplier_pilihan", e);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className="row">
            <div className="col-lg-3">
              <Field
                name="no_konversi"
                component={ReanderField}
                type="text"
                label="Nomor Konversi"
                placeholder="Masukan Nomor Konversi"
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
                name="lokasi"
                component={ReanderSelect}
                options={this.props.listSelfing.map((data) => {
                  return {
                    value: data.kode_lokasi_selving,
                    name: data.nama_lokasi_selving,
                  };
                })}
                label="LOKASI"
                placeholder="PILIH LOKASI"
                onChange={(e) => this.setLokasi(e)}
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="supplier"
                component={ReanderSelect}
                options={this.props.listSupplier.map((data) => {
                  return {
                    value: data.kode_supplier,
                    name: data.nama_supplier,
                  };
                })}
                label="SUPPLIER"
                placeholder="PILIH SUPPLIER"
                onChange={(e) => this.setSupplier(e)}
              />
            </div>
          </div>
          <div className="col-lg-12 mb-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="text-left">
                  <button
                    className="btn btn-primary"
                    disabled={this.props.konversi_temp.length < 1}
                  >
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
                    disabled={
                      this.state.lokasi_pilihan
                        ? this.state.supplier_pilihan
                          ? false
                          : true
                        : true
                    }
                  >
                    Tambah Barang <i className="fa fa-plus ml-3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
HeadKonversiBarang = reduxForm({
  form: "konversiBarang",
  enableReinitialize: true,
})(HeadKonversiBarang);
export default connect(maptostate, null)(HeadKonversiBarang);
