import React, { Component } from "react";
import { connect } from "react-redux";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import { Field, reduxForm } from "redux-form";
import {
  getIDBarang,
  getInfoBarang,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import {
  ReanderField,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

const validate = (values) => {
  const errors = {};
  if (parseInt(values.stock) < parseInt(values.qty)) {
    errors.qty = "Jumlah Melebihi stock, mohon kuragi";
  }
  return errors;
};
class ModalPermintaanBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasilBarcode: [],
      listSupplier: [],
      stock: 0,
      step: 0,
      step1: "row",
      step2: "row d-none",
      step3: "row d-none",
      columns: [
        {
          dataField: "kode_barang",
          text: "Kode Barang",
          sort: true,
        },
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        {
          dataField: "kode_oem",
          text: "Kode OE",
        },
        {
          dataField: "kode_sku",
          text: "Kode SKU",
        },
        {
          dataField: "type",
          text: "Type",
        },
        {
          dataField: "stock",
          text: "Stock",
        },
        {
          dataField: "harga_jual",
          text: "Harga",
          formatter: (list) => list.toLocaleString("id-ID"),
        },
        {
          dataField: "supplier",
          text: "Kode Supplier",
          // formatter: (list) => list.toLocaleString("id-ID"),
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    className="btn btn-teal mr-3"
                    onClick={() => {
                      localStorage.setItem("kode_barcode", row.kode_barcode);
                      this.props.change("kode_barcode", row.kode_barcode);
                      this.props.change("nama_barang", row.nama_barang);
                      this.props.change("kode_supplier", row.supplier);
                      this.props.change("stock", row.stock);
                      this.props.change("harga_sparepart", row.harga_jual);
                      this.nextStep();
                    }}
                    // onClick={() => {
                    //   this.detail(data);
                    // }}
                    type="button"
                  >
                    Tambah
                    <i className="fa fa-cart-arrow-down ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }
  nextStep() {
    switch (this.state.step) {
      case 0:
        this.setState({
          step: this.state.step + 1,
          step1: "row d-none",
          step2: "row",
          step3: "row d-none",
        });
        break;
      case 1:
        this.setState({
          step: this.state.step + 1,
          step1: "row d-none",
          step2: "row d-none",
          step3: "row ",
        });
        break;
      default:
        break;
    }
  }
  prevStep() {
    switch (this.state.step) {
      case 1:
        this.setState({
          step: this.state.step - 1,
          step1: "row ",
          step2: "row d-none",
          step3: "row d-none",
        });
        break;
      case 2:
        this.setState({
          step: this.state.step - 1,
          step1: "row d-none",
          step2: "row ",
          step3: "row d-none ",
        });
        break;
      default:
        break;
    }
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
        console.log(err);
        this.props.dispatch(onFinish());
      });
  }
  componentDidMount() {
    this.props.dispatch(getInfoBarang());
    this.props.dispatch(getIDBarang());
  }

  setDetail() {
    this.props.change("nama_barang", this.state.hasilBarcode[0].nama_barang);
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
          <div className="mb-5">
            <Stepper
              defaultBarColor={"#98CCEC"}
              completeColor={"#00ACAC"}
              steps={[
                { title: "List Barang" },
                { title: "Tambah Data Barang" },
                // { title: "Data NPWP" },
              ]}
              activeStep={this.state.step}
            />
          </div>
          <div className="col-lg-12">
            <div className={this.state.step1}>
              <div className="col-lg-12">
                <Tabel
                  keyField="kode_barang"
                  data={this.props.listinfobarang || []}
                  columns={this.state.columns}
                  CSVExport
                  tambahData={false}
                // handleClick={() => this.tambahModal()}
                />
              </div>
            </div>
            <div className={this.state.step2}>
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
                      name="kode_supplier"
                      component={ReanderField}
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
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="text-left">
                  <button
                    type="button"
                    className={
                      this.state.step === 0
                        ? "btn btn-primary d-none"
                        : "btn btn-primary"
                    }
                    onClick={() => this.prevStep()}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

ModalPermintaanBarang = reduxForm({
  form: "ModalPermintaanBarang",
  enableReinitialize: true,
  validate,
})(ModalPermintaanBarang);
export default connect((state) => {
  return {
    listBarang: state.datamaster.listbarang,
    listkategoriservice: state.datamaster.listkategoriservice,
    listinfobarang: state.datamaster.listInfoBarang,
    onSend: state.datamaster.onSend,
  };
})(ModalPermintaanBarang);
