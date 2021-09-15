import React, { Component } from "react";
import { connect } from "react-redux";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import {
  getIDBarang,
  getInfoBarang,
  hideModal,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action";
import {
  AxiosMasterGet,
  AxiosMasterPost,
  AxiosMasterPut,
} from "../../../axios";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

const validate = (values) => {
  const errors = {};
  if (parseInt(values.stock) < parseInt(values.qty)) {
    errors.qty = "Jumlah Melebihi stock, mohon kuragi";
  }
  return errors;
};
const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  decimalPlaces: 0,
  locale: "id-ID",
});
class ModalReturBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasilBarcode: [],
      listSupplier: [],
      tambah: [],
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
            let data = {
              // kode_supplier: row.supplier,
              kode_barcode: row.kode_barcode,
              kode_barang: row.kode_barang,
              nama_barang: row.nama_barang,
              kode_kategori: row.kode_kategori,
              kode_jenis: row.kode_jenis,
              // kode_merk_barang: row.kode_merk_barang,
              // kode_kwalitas: row.kode_kwalitas,
              kode_lokasi_rak: row.kode_lokasi_rak,
              kode_lokasi_selving: row.kode_lokasi_selving,
              // kode_ukuran: row.kode_ukuran,
              kode_satuan: row.kode_satuan,
              type: row.type,
              harga_jual: row.harga_jual,
            };
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
                      this.props.change("harga_jual", row.harga_jual);
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

  componentDidMount() {
    this.props.dispatch(getInfoBarang());
    this.props.dispatch(getIDBarang());
  }
  setTotal() {
    console.log(this.props.total);
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
    console.log("testing", this.state.hasilBarcode);
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
    console.log(e);
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
                  <div className="col-lg-3 d-none">
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
                  <div className="col-lg-3">
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

ModalReturBarang = reduxForm({
  form: "ModalReturBarang",
  enableReinitialize: true,
})(ModalReturBarang);
const selector = formValueSelector("ModalReturBarang"); // <-- same as form name

export default connect((state) => {
  const { harga_jual, qty } = selector(state, "harga_jual", "qty");
  return {
    total: parseFloat(harga_jual || 0) * parseFloat(qty || 0),
    onSend: state.datamaster.onSend,
    listBarang: state.datamaster.listbarang,
    listkategoriservice: state.datamaster.listkategoriservice,
    listinfobarang: state.datamaster.listInfoBarang,
  };
})(ModalReturBarang);
