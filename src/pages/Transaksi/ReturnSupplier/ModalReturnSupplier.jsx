import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { createNumberMask } from "redux-form-input-masks";
import { AxiosMasterGet } from "../../../axios";
import { required } from "../../../validasi/normalize";

import Tabel from "../../../components/Tabel/tabel";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import { getListBarangReturSupplier } from "../../../actions/transaksi_action";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  decimalPlaces: 0,
  locale: "id-ID",
});
class ModalReturnSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasilBarcode: [],
      // listMerk: [],
      // listKwalitas: [],
      listSatuan: [],
      step: 0,
      step1: "row",
      step2: "row d-none",
      step3: "row d-none",
      columns: [
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
          sort: true,
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        {
          dataField: "qty",
          text: "Stock",
        },
        {
          dataField: "satuan",
          text: "Satuan",
        },
        {
          dataField: "harga_satuan",
          text: "Harga",
          formatter: (list) => list.toLocaleString("id-ID"),
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
                      this.props.change("kode_supplier1", row.supplier);
                      this.props.change("type", row.type);
                      this.props.change("satuan_barang", row.satuan);
                      this.props.change("stock", row.stock);
                      this.props.change("harga_satuan", row.harga_satuan);
                      this.props.change(
                        "kode_lokasi_shelving",
                        row.kode_lokasi_shelving
                      );
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

  componentDidMount() {
    this.props.dispatch(getListBarangReturSupplier());
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

  setTotal() {
    this.props.change("total", this.props.total);
  }
  getBarcode(hasil) {
    AxiosMasterGet("barang/get/by-kode-barcode/" + hasil.target.value)
      .then((res) => {
        this.setState({ hasilBarcode: res.data });
        console.log(res.data);
      })
      .then(() => this.setDetail())
      .catch((err) => console.log(err));
  }

  setDetail() {
    console.log(this.state.hasilBarcode[0].nama_barang);
    this.props.change("nama_barang", this.state.hasilBarcode[0].nama_barang);
    // this.props.change("merk", this.state.hasilBarcode[0].kode_merk_barang);
    // this.props.change("kwalitas", this.state.hasilBarcode[0].kode_kwalitas);
    this.props.change("type", this.state.hasilBarcode[0].type);
    this.props.change("satuan_barang", this.state.hasilBarcode[0].kode_satuan);
    this.props.change("harga_satuan", this.state.hasilBarcode[0].harga_beli);
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
                  keyField="kode_barcode"
                  data={this.props.list_barang || []}
                  columns={this.state.columns}
                  CSVExport
                  tambahData={false}
                  // handleClick={() => this.tambahModal()}
                />
              </div>
            </div>
            <div className={this.state.step2}>
              <div className="row">
                <div className="col-lg-4">
                  <Field
                    name="kode_barcode"
                    component={ReanderField}
                    type="text"
                    label="Kode Barcode"
                    placeholder="Masukan Kode Barang"
                    onChange={(hasil) => this.getBarcode(hasil)}
                    onBlur={(hasil) => this.getBarcode(hasil)}
                  />
                </div>
                <div className="col-lg-8"></div>
                <div className="col-lg-3">
                  <Field
                    name="nama_barang"
                    component={ReanderField}
                    type="text"
                    label="Nama Barang"
                    placeholder="Masukan Nama Barang"
                    readOnly
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="type"
                    component={ReanderField}
                    type="text"
                    label="Type"
                    placeholder="Masukan Type"
                    readOnly
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="satuan_barang"
                    component={ReanderField}
                    type="text"
                    label="Satuan"
                    placeholder="Masukan Satuan"
                    readOnly
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
                    validate={required}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="kode_lokasi_shelving"
                    component={ReanderSelect}
                    options={this.props.listSelfing.map((data) => {
                      return {
                        value: data.kode_lokasi_selving,
                        name: data.nama_lokasi_selving,
                      };
                    })}
                    type="text"
                    label="Lokasi Shelving"
                    placeholder="Pilih Lokasi Shelving"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="harga_satuan"
                    component={ReanderField}
                    type="text"
                    label="Harga Satuan"
                    placeholder="Masukan Harga Satuan"
                    onChange={this.setTotal()}
                    {...currencyMask}
                    readOnly
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="total"
                    component={ReanderField}
                    type="telp"
                    label="Total"
                    placeholder="Masukan Total"
                    {...currencyMask}
                    readOnly
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
              <div className="col-lg-6 d-none">
                <div className="text-right">
                  <button
                    type="button"
                    className={
                      this.state.step === 2
                        ? "btn btn-primary d-none"
                        : "btn btn-primary"
                    }
                    onClick={() => this.nextStep()}
                  >
                    Next
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

ModalReturnSupplier = reduxForm({
  form: "ModalReturnSupplier",
  enableReinitialize: true,
})(ModalReturnSupplier);
const selector = formValueSelector("ModalReturnSupplier"); // <-- same as form name

export default connect((state) => {
  const { harga_satuan, qty } = selector(state, "harga_satuan", "qty");
  return {
    list_barang: state.transaksi.returbarangspl,
    total: parseFloat(harga_satuan || 0) * parseFloat(qty || 0),
    listSelfing: state.datamaster.listselfing,
  };
})(ModalReturnSupplier);
