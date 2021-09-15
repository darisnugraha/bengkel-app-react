import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { onFinish, onProgress } from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  decimalPlaces: 0,
  locale: "id-ID",
});

class ModalKomplainService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasilBarcode: [],
      listSupplier: [],
      tambah:[],
      stock: 0,
    };
  }
  setTotal() {
    this.props.change("total_harga", this.props.total);
  }

  getBarcode(hasil) {
    this.props.dispatch(onProgress());
    AxiosMasterGet(
      "permintaan-barang/get/BarangByBarcode/" + hasil.target.value
    )
      .then((res) => this.setState({ hasilBarcode: res.data }))
      .then(() => this.setDetail())
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) => {
        this.props.dispatch(onFinish());
      });
  }

  setDetail() {
    this.props.change("nama_barang", this.state.hasilBarcode[0].nama_barang);
    this.props.change("harga_jual", this.state.hasilBarcode[0].harga);
    // this.props.change("merk", this.state.hasilBarcode[0].merk_barang);
    // this.props.change("kwalitas", this.state.hasilBarcode[0].kwalitas);
    // this.props.change("ukuran", this.state.hasilBarcode[0].ukuran);
    let listSupplier = this.state.hasilBarcode[0].data_supplier.map((list) => {
      let data = {
        value: list.kode_supplier + "||" + list.stock,
        name: `${list.nama_supplier} ( ${list.kode_supplier})`,
      };
      return data;
    });
    this.setState({
      listSupplier: listSupplier,
    });
  }
  setStock(e) {
    let data = e || "0||0";
    let hasil = data.split("||");
    this.setState({
      stock: hasil[1],
    });
    this.props.change("kode_supplier", hasil[0]);
    this.props.change("stock", hasil[1]);
    // this.props.change("harga_jual")
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6">
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
            <div className="col-lg-6"></div>
            <div className="col-lg-6">
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
                type="text"
                label="Kualitas"
                placeholder="Masukan Kualitas"
                readOnly
                loading={this.props.onSend}
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="ukuran"
                component={ReanderField}
                type="text"
                label="Ukuran"
                placeholder="Masukan Ukuran"
                readOnly
                loading={this.props.onSend}
              />
            </div> */}
            <div className="col-lg-3">
              <Field
                name="kode_supplier1"
                component={ReanderSelect}
                options={this.state.listSupplier || []}
                onChange={(e) => this.setStock(e)}
                type="text"
                label="Kode Supplier"
                placeholder="Masukan Kode Supplier"
              />
            </div>
            <div className="col-lg-3 d-none">
              <Field
                name="kode_supplier"
                component={ReanderField}
                type="text"
                label="Kode Supplier"
                placeholder="Masukan Kode Supplier"
              />
            </div>
            <div className="col-lg-3">
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
            <div className="col-lg-3">
              <Field
                name="qty"
                component={ReanderField}
                type="text"
                label="Qty"
                placeholder="Masukan Qty"
                onChange={this.setTotal()}
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="harga_jual"
                component={ReanderField}
                type="text"
                label="Harga Satuan"
                placeholder="Masukan Harga Satuan"
                readOnly
                loading={this.props.onSend}
                {...currencyMask}
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="total_harga"
                component={ReanderField}
                type="text"
                label="Total Harga"
                placeholder="Masukan Total Harga"
                readOnly
                loading={this.props.onSend}
                {...currencyMask}
              />
            </div>
            {/* <div className="col-lg-3">
              <Field
                name="kondisi"
                component={ReanderField}
                type="text"
                label="Kondisi Barang"
                placeholder="Masukan Kondisi Barang"
                loading={this.props.onSend}
                validate={required}
              />
            </div> */}
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
    );
  }
}

ModalKomplainService = reduxForm({
  form: "ModalKomplainService",
  enableReinitialize: true,
})(ModalKomplainService);
const selector = formValueSelector("ModalKomplainService"); // <-- same as form name

export default connect((state) => {
  const { harga_jual, qty } = selector(state, "harga_jual", "qty");
  return {
    total: parseFloat(harga_jual || 0) * parseFloat(qty || 0),
    onSend: state.datamaster.onSend,
  };
})(ModalKomplainService);
