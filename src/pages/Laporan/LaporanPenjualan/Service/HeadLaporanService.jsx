import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getKategoriService } from "../../../../actions/datamaster_action";
import { getToday } from "../../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../../components/notification/notification";

class HeadLaporanService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.change("tanggal_awal", getToday());
    this.props.change("tanggal_akhir", getToday());
    this.props.dispatch(getKategoriService());
  }
  render() {
    this.props.listkategoriservice.push({ value: "SEMUA", name: "SEMUA" });
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
              name="kode_jenis"
              component={ReanderSelect}
              options={this.props.listkategoriservice.map((list) => {
                let data = {
                  value: list.id_kategori_service,
                  name: list.jenis_service,
                };
                return data;
              })}
              type="text"
              label="Jenis"
              placeholder="Masukan Jenis"
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

HeadLaporanService = reduxForm({
  form: "HeadLaporanService",
  enableReinitialize: true,
})(HeadLaporanService);
export default connect((state) => {
  return {
    listkategoriservice: state.datamaster.listkategoriservice,
    onSend: state.datamaster.onSend,
  };
})(HeadLaporanService);
