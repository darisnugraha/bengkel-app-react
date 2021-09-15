import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { AxiosMasterGet } from "../../../../axios";
import { getToday } from "../../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../../components/notification/notification";

class HeadLaporanKartuHutangSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupplier: [],
    };
  }
  componentDidMount() {
    this.props.change("tanggal_awal", getToday());
    this.props.change("tanggal_akhir", getToday());
    AxiosMasterGet("supplier/get/all").then((res) =>
      this.setState({
        listSupplier: res.data,
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
          <div className="col-lg-4">
            <Field
              name="kode_supplier"
              component={ReanderSelect}
              options={this.state.listSupplier.map((list) => {
                let data = {
                  value: list.kode_supplier,
                  name: list.nama_supplier,
                };
                return data;
              })}
              type="text"
              label="Nama Supplier"
              placeholder="Masukan Nama Supplier"
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="tanggal_awal"
              component={ReanderField}
              type="date"
              label="Tanggal Awal"
              placeholder="Masukan Tanggal Awal"
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="tanggal_akhir"
              component={ReanderField}
              type="date"
              label="Tanggal Akhir"
              placeholder="Masukan Tanggal Akhir"
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

HeadLaporanKartuHutangSupplier = reduxForm({
  form: "HeadLaporanKartuHutangSupplier",
  enableReinitialize: true,
})(HeadLaporanKartuHutangSupplier);
export default connect((state) => {
  return {
    onSend: state.datamaster.onSend,
  };
})(HeadLaporanKartuHutangSupplier);
