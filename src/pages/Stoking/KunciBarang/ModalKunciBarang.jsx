import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { onFinish, onProgress } from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";

const validate = (values) => {
  const errors = {};
  if (parseInt(values.qty) > parseInt(values.stock)) {
    errors.qty = "Tidak Boleh Melebihi Stock";
  }
  return errors;
};
class ModalKunciBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupplier: [],
    };
  }
  getBarcode(e) {
    this.props.dispatch(onProgress());
    AxiosMasterGet("permintaan-barang/get/BarangByBarcode/" + e.target.value)
      .then((res) => this.setBarang(res.data))
      .then(() => this.props.dispatch(onFinish()));
  }
  setBarang(res) {
    console.log(res);
    this.props.change("kode_barang", res[0].kode_barang);
    this.props.change("nama_barang", res[0].nama_barang);
    this.props.change("merk", res[0].merk_barang);
    this.props.change("kwalitas", res[0].kwalitas);
    this.props.change("satuan", res[0].satuan);
    this.setState({
      listSupplier:
        res &&
        res[0].data_supplier.map((list) => {
          let data = {
            value: `${list.kode_supplier}||${list.stock}`,
            name: list.nama_supplier,
          };
          return data;
        }),
    });
  }
  setStock(hasil) {
    let data = hasil.split("||");
    this.props.change("stock", data[1]);
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
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-3">
                <Field
                  name="kode_barcode"
                  component={ReanderField}
                  type="text"
                  label="Kode Barcode"
                  placeholder="Masukan Kode Barcode"
                  onChange={(e) => this.getBarcode(e)}
                  onBlur={(e) => this.getBarcode(e)}
                />
              </div>
              <div className="col-lg-3 d-none">
                <Field
                  name="kode_barang"
                  component={ReanderField}
                  type="text"
                  label="Nama Barang"
                  placeholder="Masukan Nama Barang"
                  readOnly
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="nama_barang"
                  component={ReanderField}
                  type="text"
                  label="Nama Barang"
                  placeholder="Masukan Nama Barang"
                  readOnly
                  loading={this.props.onSend}
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="merk"
                  component={ReanderField}
                  type="text"
                  label="Merk"
                  placeholder="Masukan Merk"
                  readOnly
                  loading={this.props.onSend}
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="kwalitas"
                  component={ReanderField}
                  label="Kualitas"
                  placeholder="Masukan Kualitas"
                  readOnly
                  loading={this.props.onSend}
                />
              </div>

              <div className="col-lg-3">
                <Field
                  name="kode_supplier"
                  component={ReanderSelect}
                  options={this.state.listSupplier}
                  type="text"
                  label="Kode Supplier"
                  placeholder="Masukan Kode Supplier"
                  onChange={(e) => this.setStock(e)}
                />
              </div>
              <div className="col-lg-2">
                <Field
                  name="stock"
                  component={ReanderField}
                  type="text"
                  label="Stock"
                  placeholder="Masukan Stock"
                  readOnly
                  loading={this.props.onSend}
                />
              </div>
              <div className="col-lg-2">
                <Field
                  name="qty"
                  component={ReanderField}
                  type="text"
                  label="Qty"
                  placeholder="Masukan Qty"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary">
                Simpan <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ModalKunciBarang = reduxForm({
  form: "ModalKunciBarang",
  enableReinitialize: true,
  validate: validate,
})(ModalKunciBarang);
export default connect((state) => {
  return {
    onSend: state.datamaster.onSend,
  };
})(ModalKunciBarang);
