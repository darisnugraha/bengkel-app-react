import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { onFinish, onProgress } from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { debounce } from "../../../config/Helper";

const validate = (values) => {
  const errors = {};
  if (parseInt(values.qty) < 0) {
    errors.qty = "Tidak Boleh Minus";
  } else if (parseInt(values.qty) === 0) {
    errors.qty = "Tidak boleh 0";
  }
  return errors;
};
class ModalTambahStockBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupplier: [],
    };
    this.loadData = this.loadData.bind(this);
    this.debouncedLoadData = debounce(this.loadData, 500);
  }

  // Fungsi untuk memuat data, didefinisikan di luar getBarcode
  loadData(e) {
    this.props.dispatch(onProgress());
    AxiosMasterGet("/barang/get/by-kode-barcode/" + e.target.value)
      .then((res) => this.setBarang(res.data))
      .then(() => this.props.dispatch(onFinish()))
      .catch(() => this.props.dispatch(onFinish()));
  }

  // Membuat fungsi debounce
  debouncedLoadData = debounce(this.loadData, 500);
  getBarcode(e) {
    this.debouncedLoadData(e);
  }

  setBarang(res) {
    this.props.change("kode_barang", res[0].kode_barang);
    this.props.change("nama_barang", res[0].nama_barang);
    // this.props.change("merk", res[0].merk_barang);
    // this.props.change("kwalitas", res[0].kwalitas);
    this.props.change("satuan", res[0].kode_satuan);
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
              {/* <div className="col-lg-3">
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
              </div> */}
              <div className="col-lg-3">
                <Field
                  name="satuan"
                  component={ReanderField}
                  type="text"
                  label="Satuan"
                  placeholder="Masukan Satuan"
                  readOnly
                  loading={this.props.onSend}
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="kode_supplier"
                  component={ReanderSelect}
                  options={this.props.listSupplier.map((data) => {
                    return {
                      value: data.kode_supplier,
                      name: data.nama_supplier,
                    };
                  })}
                  type="text"
                  label="Kode Supplier"
                  placeholder="Masukan Kode Supplier"
                  onChange={(e) => this.setStock(e)}
                />
              </div>
              {/* <div className="col-lg-2">
                <Field
                  name="stock"
                  component={ReanderField}
                  type="number"
                  label="Stock"
                  placeholder="Masukan Stock"
                  readOnly
                  loading={this.props.onSend}
                />
              </div> */}
              <div className="col-lg-2">
                <Field
                  name="qty"
                  component={ReanderField}
                  type="number"
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

ModalTambahStockBarang = reduxForm({
  form: "ModalTambahStockBarang",
  enableReinitialize: true,
  validate: validate,
})(ModalTambahStockBarang);
export default connect((state) => {
  return {
    onSend: state.datamaster.onSend,
    listSupplier: state.datamaster.listsupplier,
  };
})(ModalTambahStockBarang);
