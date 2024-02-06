import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { showModal } from "../../../actions/datamaster_action";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { getToday } from "../../../components/notification/function";
import { getNoHancur } from "../../../actions/stocking_action";

class HeadHancurBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listShelving: [],
    };
  }
  componentDidMount() {
    this.props.change("tanggal", getToday());
    this.props.dispatch(getNoHancur());
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className="row">
            <div className="col-lg-3">
              <Field
                name="no_hancur"
                component={ReanderField}
                type="text"
                label="Nomor Hancur"
                placeholder="Masukan Nomor Hancur"
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
                label="Lokasi Shelving"
                placeholder="Pilih Lokasi Shelving"
                onChange={(e) => localStorage.setItem("lokasi_hancur", e)}
                loading={this.props.onSend}
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
HeadHancurBarang = reduxForm({
  form: "hancurBarang",
  enableReinitialize: true,
})(HeadHancurBarang);
export default connect((state) => {
  return {
    initialValues: {
      tanggal: getToday(),
    },
    onSend: state.datamaster.onSend,
    listSelfing: state.datamaster.listselfing,
  };
})(HeadHancurBarang);
