import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { onFinish, onProgress } from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import { debounce } from "../../../config/Helper";

class ModalStockOpname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupplier: [],
    };
    this.loadData = this.loadData.bind(this);
    this.debouncedLoadData = debounce(this.loadData, 500);
  }
  loadData(e) {
    this.props.dispatch(onProgress());
    let lokasi_hancur = localStorage.getItem("lokasi_stock_opname") || "";
    AxiosMasterGet(
      "hancur-barang/get/BarangByBarcodeLokasi/" +
        `${e.target.value}&${lokasi_hancur}`
    )
      .then((res) => this.setBarang(res.data))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) => this.props.dispatch(onFinish()));
  }

  // Membuat fungsi debounce
  debouncedLoadData = debounce(this.loadData, 500);

  getBarcode = (e) => {
    this.debouncedLoadData(e);
  };

  setBarang(res) {
    console.log(res);
    this.props.change("kode_barang", res[0].kode_barang);
    this.props.change("nama_barang", res[0].nama_barang);
    // this.props.change("merk", res[0].merk_barang);
    // this.props.change("kwalitas", res[0].kwalitas);
    this.props.change("satuan", res[0].satuan);
    this.props.change("stock", res[0].stock);
  }
  setStock(hasil) {
    this.props.change("kode_supplier", hasil);
  }
  calculateSelisih = (e) => {
    if (e.target.value !== undefined || e.target.value !== "") {
      this.props.change("selisih", this.props.stock - Number(e.target.value));
    }
  };
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
                  loading={this.props.onSend}
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
                  validate={required}
                  name="kode_supplier"
                  component={ReanderSelect}
                  options={this.props.listsupplier?.map((data) => {
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
              <div className="col-lg-2">
                <Field
                  name="stock"
                  component={ReanderField}
                  type="number"
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
                  type="number"
                  label="Qty"
                  placeholder="Masukan Qty"
                  validate={required}
                  onChange={this.calculateSelisih}
                />
              </div>
              <div className="col-lg-2">
                <Field
                  name="selisih"
                  component={ReanderField}
                  type="number"
                  label="Selisih"
                  placeholder="Masukan Selisih"
                  readOnly
                  loading={this.props.onSend}
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

ModalStockOpname = reduxForm({
  form: "ModalStockOpname",
  enableReinitialize: true,
})(ModalStockOpname);
const selector = formValueSelector("ModalStockOpname");
export default connect((state) => {
  const { qty, stock } = selector(state, "qty", "stock");
  return {
    onSend: state.datamaster.onSend,
    listsupplier: state.datamaster.listsupplier,
    stock,
    qty,
  };
})(ModalStockOpname);
