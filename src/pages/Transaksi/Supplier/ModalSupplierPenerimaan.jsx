import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  NotifError,
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { createNumberMask } from "redux-form-input-masks";
import { AxiosMasterGet } from "../../../axios";
import {
  editBarang,
  getBarang,
  getIDBarang,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action";
import Tabel from "../../../components/Tabel/tabel";
import { required } from "../../../validasi/normalize";
import Stepper from "react-stepper-horizontal/lib/Stepper";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  decimalPlaces: 0,
  locale: "id-ID",
});
class ModalSupplierPenerimaan extends Component {
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
          dataField: "harga_jual",
          text: "Harga",
          formatter: (list) => list.toLocaleString("id-ID"),
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
                    onClick={() => 
                      {
                      localStorage.setItem("kode_barcode",row.kode_barcode)
                      this.props.change("kode_barcode",row.kode_barcode)
                      this.props.change("nama_barang",row.nama_barang)
                      this.props.change("type", row.type)
                      this.props.change("satuan", row.kode_satuan)
                      this.props.change("harga_satuan",row.harga_jual)
                      this.nextStep()
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

  showDetail() {
    this.props.dispatch(showModal());
    this.setState({
      jenisModal: "DETAIL",
    });
  }

  detail(data) {
    localStorage.setItem("supplier_barang_sparepart", data.kode_supplier);
    console.log("cobs", data);
    this.showDetail();
    this.props.dispatch(editBarang(data));
  }

  setTotal() {
    this.props.change("total", this.props.total);
  }
  getBarcode(hasil) {
    this.props.dispatch(onProgress());
    AxiosMasterGet("/barang/get/by-kode-barcode/" + hasil.target.value)
      .then((res) => this.setState({ hasilBarcode: res.data }))
      .then(() => this.setDetail())
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) => this.props.dispatch(onFinish()));
  }
  setDetail() {
    console.log(this.state.hasilBarcode[0].nama_barang);
    this.props.change("nama_barang", this.state.hasilBarcode[0].nama_barang);
    // this.props.change("merk", this.state.hasilBarcode[0].kode_merk_barang);
    // this.props.change("kwalitas", this.state.hasilBarcode[0].kode_kwalitas);
    this.props.change("type", this.state.hasilBarcode[0].type);
    this.props.change("satuan", this.state.hasilBarcode[0].kode_satuan);
    this.props.change("harga_satuan", this.state.hasilBarcode[0].harga_jual);
  }

  componentDidMount() {
    this.props.dispatch(getBarang());
    this.props.dispatch(getIDBarang());
    // AxiosMasterGet("merk-barang/get/all")
    //   .then((res) =>
    //     this.setState({
    //       listMerk: res.data,
    //     })
    //   )
    //   .catch((err) => NotifError(err));
    // AxiosMasterGet("kwalitas/get/all")
    //   .then((res) =>
    //     this.setState({
    //       listKwalitas: res.data,
    //     })
    //   )
    //   .catch((err) => NotifError(err));
    AxiosMasterGet("satuan/get/all")
      .then((res) =>
        this.setState({
          listSatuan: res.data,
        })
      )
      .catch((err) => NotifError(err));
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
              <div className="col-lg-3">
                <Field
                  name="type"
                  component={ReanderField}
                  type="text"
                  label="Type"
                  placeholder="Masukan Type"
                  readOnly
                  loading={this.props.onSend}
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="satuan"
                  component={ReanderSelect}
                  options={this.state.listSatuan.map((list) => {
                    let data = {
                      value: list.kode_satuan,
                      name: list.nama_satuan,
                    };
                    return data;
                  })}
                  type="text"
                  label="Satuan"
                  placeholder="Masukan Satuan"
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
                  name="harga_satuan"
                  component={ReanderField}
                  type="text"
                  label="Harga Satuan"
                  placeholder="Masukan Harga Satuan"
                  onChange={this.setTotal()}
                  {...currencyMask}
                  loading={this.props.onSend}
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
            </div>
            {/* <div className={this.state.step3}>
              <div className="col-lg-4">
                <Field
                  name="NPWP"
                  component={ReanderField}
                  type="number"
                  label="NPWP"
                  placeholder="Masukan NPWP"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="nama_NPWP"
                  component={ReanderField}
                  type="text"
                  label="Nama NPWP"
                  placeholder="Masukan Nama NPWP"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="alamat_NPWP"
                  component={ReanderField}
                  type="text"
                  label="Alamat NPWP"
                  placeholder="Masukan Alamat NPWP"
                />
              </div>
            </div> */}
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
              {/* <div className="col-lg-6">
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
              </div> */}
            </div>
          </div>
        </div>
        <div className="row">
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

ModalSupplierPenerimaan = reduxForm({
  form: "ModalSupplierPenerimaan",
  enableReinitialize: true,
})(ModalSupplierPenerimaan);
const selector = formValueSelector("ModalSupplierPenerimaan"); // <-- same as form name

export default connect((state) => {
  const { harga_satuan, qty } = selector(state, "harga_satuan", "qty");
  return {
    total: parseFloat(harga_satuan || 0) * parseFloat(qty || 0),
    onSend: state.datamaster.onSend,
    listinfobarang: state.datamaster.listbarang,
  };
})(ModalSupplierPenerimaan);
