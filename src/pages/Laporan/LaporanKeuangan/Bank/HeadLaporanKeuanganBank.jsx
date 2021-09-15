import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getBank } from "../../../../actions/datamaster_action";
import { getToday } from "../../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../../components/notification/notification";

class HeadLaporanKeuanganBank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getBank());
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
              name="no_ac"
              component={ReanderSelect}
              options={this.props.listbank.map((list) => {
                let data = {
                  value: list.no_ac,
                  name: `${list.atas_nama}-${list.no_ac}(${list.nama_bank})`,
                };
                return data;
              })}
              type="text"
              label="Nomor Rekening"
              placeholder="Masukan Nomor Rekening"
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

HeadLaporanKeuanganBank = reduxForm({
  form: "HeadLaporanKeuanganBank",
  enableReinitialize: true,
})(HeadLaporanKeuanganBank);
export default connect((state) => {
  return {
    listbank: state.datamaster.listbank,
    onSend: state.datamaster.onSend,
  };
})(HeadLaporanKeuanganBank);
