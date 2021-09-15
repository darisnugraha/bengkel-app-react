import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { getBank, getParameter } from "../../../actions/datamaster_action";
import { getToday } from "../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  locale: "id-ID",
});
class HeadTambahBank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getBank());
    this.props.dispatch(getParameter());
    this.props.change("tanggal", getToday());
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
              name="tanggal"
              component={ReanderField}
              type="date"
              label="Tanggal"
              placeholder="Masukan Tanggal"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="no_ac"
              component={ReanderSelect}
              options={this.props.listbank.map((list) => {
                let data = {
                  value: list.no_ac,
                  name: `${list.no_ac} - ${list.atas_nama}`,
                };
                return data;
              })}
              type="text"
              label="Kategori"
              placeholder="Masukan Kategori"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="jumlah"
              component={ReanderField}
              type="telp"
              label="Jumlah"
              placeholder="Masukan Jumlah"
              {...currencyMask}
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="kategori"
              component={ReanderSelect}
              options={this.props.listparameter.map((list) => {
                let data = {
                  value: list.kategori,
                  name: list.kategori,
                };
                return data;
              })}
              type="text"
              label="Kategori"
              placeholder="Masukan Kategori"
            />
          </div>
          <div className="col-lg-12 mb-2">
            <label htmlFor="">Keterangan</label>
            <Field
              name="keterangan"
              component="textarea"
              className="form-control"
              type="text"
              label="Keterangan"
              placeholder="Masukan Keterangan"
            />
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary" disabled={this.props.onSend}>
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
        </div>
      </form>
    );
  }
}

HeadTambahBank = reduxForm({
  form: "HeadTambahBank",
  enableReinitialize: true,
})(HeadTambahBank);
export default connect((state) => {
  return {
    listbank: state.datamaster.listbank,
    listparameter: state.datamaster.listparameter,
    onSend: state.datamaster.onSend,
  };
})(HeadTambahBank);
