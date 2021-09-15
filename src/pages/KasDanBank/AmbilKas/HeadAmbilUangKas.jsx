import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { getParameter } from "../../../actions/datamaster_action";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  locale: "id-ID",
});
class HeadAmbilUangKas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getParameter());
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
              name="tanggal"
              component={ReanderField}
              type="date"
              label="Tanggal"
              placeholder="Masukan Tanggal"
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="jumlah"
              component={ReanderField}
              type="telp"
              label="Jumlah"
              placeholder="Masukan Jumlah"
              {...currencyMask}
            />
          </div>
          <div className="col-lg-4">
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

HeadAmbilUangKas = reduxForm({
  form: "HeadAmbilUangKas",
  enableReinitialize: true,
})(HeadAmbilUangKas);
export default connect((state) => {
  return {
    listparameter: state.datamaster.listparameter,
    onSend: state.datamaster.onSend,
  };
})(HeadAmbilUangKas);
