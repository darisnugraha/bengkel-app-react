import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { AxiosMasterGet } from "../../../../axios";
import { getToday } from "../../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../../components/notification/notification";

class HeadLaporanPermintaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDivisi: [],
    };
  }
  componentDidMount() {
    this.props.change("tanggal_awal", getToday());
    this.props.change("tanggal_akhir", getToday());
    AxiosMasterGet("divisi/get/all").then((res) =>
      this.setState({
        listDivisi:
          res &&
          res.data.map((list) => {
            let data = {
              value: list.kode_divisi,
              name: list.nama_divisi,
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
          <div className="col-lg-4">
            <Field
              name="tanggal_awal"
              component={ReanderField}
              type="date"
              label="Dari Tanggal"
              placeholder="Masukan Tanggal Awal"
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="tanggal_akhir"
              component={ReanderField}
              type="date"
              label="Sampai Tanggal"
              placeholder="Masukan Sampai Tanggal"
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="divisi"
              component={ReanderSelect}
              options={this.state.listDivisi}
              type="text"
              label="Divisi"
              placeholder="Masukan Divisi"
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

HeadLaporanPermintaan = reduxForm({
  form: "HeadLaporanPermintaan",
  enableReinitialize: true,
})(HeadLaporanPermintaan);
export default connect((state) => {
  return {
    onSend: state.datamaster.onSend,
  };
})(HeadLaporanPermintaan);
