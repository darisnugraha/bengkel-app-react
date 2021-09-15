import React, { Component } from "react";
import { connect } from "react-redux";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import { Field, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import {
  getBarang,
  getIDBarang,
  getInfoBarang,
  getKategoriService,
} from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import { ReanderField } from "../../../components/helpers/field";
import {
  ReanderFieldInline,
  ReanderSelect,
  ToastError,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";
import { required } from "../../../validasi/normalize";
const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});

class TambahService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupplier: [],
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
          text: "Stock"
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
                      this.props.change("sparepart", row.nama_barang);
                      this.props.change("kode_supplier1", row.supplier);
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

  componentDidMount() {
    this.props.dispatch(getInfoBarang());
    this.props.dispatch(getIDBarang());
    this.props.dispatch(getKategoriService());
    this.props.dispatch(getBarang());
  }
  setSparepart(e) {
    let hasil = e.split("||");
    this.props.change("kode_supplier1", null);
    AxiosMasterGet("daftar-service/getDataBarangDaftarService/" + hasil[3])
      .then((res) =>
        this.setState({
          listSupplier: res && res.data[0].data_supplier,
        })
      )
      .catch((err) => ToastError(`Error Get Supplier, ${err}`));
    this.props.change("harga_sparepart", hasil[1]);
    this.props.change("kode_sparepart", hasil[3]);
    this.props.change("nama_sparepart", hasil[2]);
  }
  setService(e) {
    let hasil = e.split("||");
    this.props.change("kategori_service", hasil[0]);
    this.props.change("harga_service", hasil[1]);
    this.props.change("nama_service", hasil[2]);
  }
  setBarang(e) {
    this.props.change("stock", e.split("||")[1]);
    this.props.change("kode_supplier", e.split("||")[0]);
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
                <div className="row ml-5">
                  <div className="col-lg-6">
                    <div className="col-lg-12">
                      <Field
                        name="kategori_service1"
                        component={ReanderSelect}
                        options={this.props.listkategoriservice.map((list) => {
                          let data = {
                            value: `${list.kategori_service}||${list.harga_jasa_service}||${list.jenis_service}`,
                            name: `${list.kategori_service} - ${list.jenis_service}`,
                          };
                          return data;
                        })}
                        onChange={(e) => this.setService(e)}
                        type="text"
                        label="Jenis Service"
                        placeholder="Masukan Jenis Service"
                      />
                    </div>
                    <div className="col-lg-12 d-none">
                      <Field
                        name="kategori_service"
                        component={ReanderFieldInline}
                        type="text"
                        label="Harga Service"
                        placeholder="Masukan Harga Service"
                      />
                    </div>
                    <div className="col-lg-12 ">
                      <Field
                        name="harga_service"
                        component={ReanderFieldInline}
                        type="telp"
                        label="Harga Service"
                        placeholder="Masukan Harga Service"
                        {...currencyMask}
                        readOnly
                      />
                    </div>
                    <div className="col-lg-12 ">
                      <Field
                        name="keterangan_service"
                        component={ReanderFieldInline}
                        type="text"
                        label="Keterangan Service"
                        placeholder="Masukan Keterangan Service"
                        validate={required}
                      />
                    </div>
                    <div className="col-lg-12 d-none ">
                      <Field
                        name="nama_service"
                        component={ReanderFieldInline}
                        type="telp"
                        label="Harga Service"
                        placeholder="Masukan Harga Service"
                        {...currencyMask}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="col-lg-12">
                      <Field
                        name="sparepart"
                        component={ReanderField}
                        type="text"
                        label="Barang Sparepart"
                        placeholder="Masukan Barang Sparepart"
                        readOnly
                      />
                    </div>
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-6">
                          <Field
                            name="kode_supplier1"
                            component={ReanderField}
                            type="text"
                            label="Kode Supplier"
                            placeholder="Masukan Kode Supplier"
                            readOnly
                          />
                        </div>
                        <div className="col-lg-6">
                          <Field
                            name="stock"
                            component={ReanderField}
                            type="text"
                            label="Stock"
                            placeholder="Masukan Kode Supplier"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 d-none">
                      <Field
                        name="kode_sparepart"
                        component={ReanderFieldInline}
                        type="text"
                        label="Harga Service"
                        placeholder="Masukan Harga Service"
                        readOnly
                      />
                    </div>
                    <div className="col-lg-12 d-none">
                      <Field
                        name="kode_supplier"
                        component={ReanderFieldInline}
                        type="text"
                        label="Harga Service"
                        placeholder="Masukan Harga Service"
                      />
                    </div>
                    <div className="col-lg-12 d-none">
                      <Field
                        name="nama_sparepart"
                        component={ReanderFieldInline}
                        type="text"
                        label="Harga Service"
                        placeholder="Masukan Harga Service"
                      />
                    </div>
                    <div className="col-lg-12">
                      <Field
                        name="harga_sparepart"
                        component={ReanderFieldInline}
                        type="telp"
                        label="Harga Sparepart"
                        placeholder="Masukan Harga Sparepart"
                        {...currencyMask}
                        readOnly
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-12">
              <Tabel
              
              />
            </div> */}
                  <div className="col-lg-12 mt-5">
                    <div className="text-right">
                      <button className="btn btn-primary">
                        Submit <i className="fa fa-paper-plane ml-3"></i>
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

TambahService = reduxForm({
  form: "TambahService",
  enableReinitialize: true,
})(TambahService);
export default connect((state) => {
  return {
    listBarang: state.datamaster.listbarang,
    listkategoriservice: state.datamaster.listkategoriservice,
    listinfobarang: state.datamaster.listInfoBarang
  };
})(TambahService);
