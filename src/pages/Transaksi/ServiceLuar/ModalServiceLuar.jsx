import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { getSatuan } from "../../../actions/datamaster_action";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});

class ModalServiceLuar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getSatuan());
  }
  setTotal() {
    this.props.change("harga_total", this.props.total);
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
              name="nama_barang"
              component={ReanderField}
              type="text"
              label="Nama Barang"
              placeholder="Masukan Nama Barang"
              validate={required}
            />
          </div>
          <div className="col-8"></div>
          <div className="col-lg-1">
            <Field
              name="qty"
              component={ReanderField}
              type="number"
              label="Qty"
              placeholder="0"
              validate={required}
              onChange={this.setTotal()}
            />
          </div>
          <div className="col-lg-2">
            <Field
              name="satuan"
              component={ReanderSelect}
              options={this.props.satuan.map((list) => {
                let data = {
                  value: list.kode_satuan,
                  name: list.nama_satuan,
                };
                return data;
              })}
              type="text"
              label="Satuan"
              placeholder="Masukan Satuan"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="harga_satuan"
              component={ReanderField}
              type="text"
              label="Harga Satuan"
              placeholder="Masukan Harga Satuan"
              {...currencyMask}
              onChange={this.setTotal()}
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="harga_total"
              component={ReanderField}
              type="text"
              label="Harga Total"
              placeholder="Masukan Harga Total"
              {...currencyMask}
            />
          </div>
          <div className="col-lg-6">
            <Field
              name="keterangan_service"
              component={ReanderField}
              type="text"
              label="Keterangan Service"
              placeholder="Masukan Keterangan Service"
              validate={required}
            />
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary">
                Simpan <i className="fa fa-paper-plane ml-3"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

ModalServiceLuar = reduxForm({
  form: "ModalServiceLuar",
  enableReinitialize: true,
})(ModalServiceLuar);
const selector = formValueSelector("ModalServiceLuar");
export default connect((state) => {
  const { qty, harga_satuan } = selector(state, "qty", "harga_satuan");
  return {
    satuan: state.datamaster.listsatuan,
    total: parseFloat(qty || 0) * parseFloat(harga_satuan || 0),
  };
})(ModalServiceLuar);
