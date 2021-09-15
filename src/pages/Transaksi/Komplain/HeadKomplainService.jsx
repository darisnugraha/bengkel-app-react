import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { getCustomer, showModal } from "../../../actions/datamaster_action";
import {
  deleteLocalItemBarcode,
  NotifError,
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { AxiosMasterGet } from "../../../axios";
import { getToday } from "../../../components/notification/function";
import { getListBarangKomplain } from "../../../actions/transaksi_action";
import { createNumberMask } from "redux-form-input-masks";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});

const { SearchBar } = Search;
class HeadKomplainService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomer: [],
      listMerk: [],
      columns: [
        {
          dataField: "kode_barcode",
          text: "Kode barcode",
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        {
          dataField: "qty",
          text: "Qty",
        },
        // {
        //   dataField: "kondisi",
        //   text: "Kondisi Barang",
        // },
        {
          dataField: "harga_jual",
          text: "Harga Satuan",
          formatter: (data) => {
            return data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "total",
          text: "Total",
          formatter: (data) => {
            return data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            this.setState({});
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    type="button"
                    onClick={() => this.deleteBarang(row.kode_barcode)}
                    className="btn btn-primary mr-3"
                  >
                    Delete
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
    // this.props.change("total_bayar", this.props.grand_total_all)
    this.props.change("tanggal", getToday());
    AxiosMasterGet("merk-kendaraan/get/all")
      .then((res) =>
        this.setState({
          listMerk: res.data,
        })
      )
      .catch((err) => NotifError(err.response.data || "Tidak Ada Koneksi"));
    this.props.dispatch(getCustomer());
  }

  deleteBarang(data) {
    deleteLocalItemBarcode("KomplainBarang_temp", data);
    deleteLocalItemBarcode("KomplainBarang_temp_kirim", data);
    // deleteLocalItemBarcode("PermintaanBarang_temp", row.kode_barcode);
    this.props.dispatch(getListBarangKomplain());
  }

  getNopol(data) {
    let listNopol = this.props.listcustomer.filter(
      (list) => list.kode_customer === data
    );
    let final = listNopol[0].nopol_kendaraan.map((hasil) => {
      let data = {
        value: hasil.nopol_kendaraan,
        name: hasil.nopol_kendaraan,
      };
      return data;
    });
    this.setState({
      listNopol: final,
    });
  }

  setCustomer(data) {
    console.log("setcust", data);
    let hasil = data.split("||");
    localStorage.setItem("kode_customer", hasil[0]);
    localStorage.setItem("nama_customer", hasil[1]);
    this.props.change("alamat", hasil[2]);
    this.props.change("kota", hasil[3]);
    this.props.change("handphone", hasil[4]);
    this.getNopol(hasil[0]);
    // this.props.getNopol("nopol_kendaraan",hasil[4]);
    // this.props.change("merk_kendaraan", hasil[5]);
    // this.props.change("type_kendaraan", hasil[6]);
    // this.props.change("warna_kendaraan", hasil[7]);
    // this.props.change("nomesin_kendaraan", hasil[8]);
  }

  handleChange(nama, data) {
    let split = data || "DEFAULT|DEFAULT";
    let hasil = split.split("||");
    console.log(hasil);
    this.props.change(nama, hasil[1]);
  }

  onChange() {
    this.props.change("total", this.props.total);
  }
  getKendaraanCustomer(e) {
    AxiosMasterGet("kendaraan-customer/get/by-nopol/" + e).then((res) =>
      // this.setState({
      //   listkendaraan:
      //     res &&
      //     res.data.map((list) => {
      //       let data = {
      //         value: `${list.nopol_kendaraan}||${list.nomesin_kendaraan}||${list.merk_kendaraan}||${list.warna_kendaraan}||${list.type_kendaraan}||${list.id_customer}`,
      //         name: list.nama_customer,
      //       };
      //       console.log("data",data);
      //       return data;
      //     }),
      // }
      {
        let data = res && res.data;
        this.props.change("type", data[0].type_kendaraan);
        this.props.change("warna", data[0].warna_kendaraan);
        this.props.change("merk", data[0].merk_kendaraan);
        this.props.change("no_mesin", data[0].nomesin_kendaraan);
      }
    );
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
              <div className="col-lg-12">
                <h4>
                  Silahkan isi No Polisi, data pemilik dan kendaraan akan
                  otomatis terisi
                </h4>
              </div>
              <div className="col-lg-4">
                <Field
                  name="no_komplain"
                  component={ReanderField}
                  type="text"
                  label="No Komplain"
                  placeholder="Masukan No Komplain"
                />
              </div>
              {/* <div className="col-lg-4">
                <Field
                  name="no_polisi"
                  component={ReanderField}
                  type="text"
                  label="No Polisi"
                  placeholder="Masukan No Polisi"
                />
              </div> */}
              <div className="col-lg-4">
                <Field
                  name="tanggal"
                  component={ReanderField}
                  type="date"
                  label="Tanggal"
                  placeholder="Masukan Tanggal"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 mb-3">
                <h4>Data Pemilik</h4>
              </div>
              <div className="col-lg-6 mb-3">
                <h4>Data Kendaraan</h4>
              </div>
              <div className="col-lg-6">
                <div className="col-lg-12">
                  <Field
                    name="nama_customer"
                    component={ReanderSelect}
                    options={this.props.listcustomer.map((list) => {
                      let data = {
                        value: `${list.kode_customer}||${list.nama_customer}||${list.alamat}||${list.kota}||${list.handphone}`,
                        name: list.nama_customer,
                      };
                      return data;
                    })}
                    type="text"
                    label="Nama Customer"
                    placeholder="Masukan Nama Customer"
                    onChange={(e) => this.setCustomer(e)}
                  />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="alamat"
                    component={ReanderField}
                    type="text"
                    label="Alamat"
                    placeholder="Masukan Alamat"
                    readOnly
                  />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="kota"
                    component={ReanderField}
                    type="text"
                    label="Kota"
                    placeholder="Masukan Kota"
                    readOnly
                  />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="handphone"
                    component={ReanderField}
                    type="text"
                    label="Handphone"
                    placeholder="Masukan Handphone"
                    readOnly
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="col-lg-12">
                  <Field
                    name="nopol_kendaraan"
                    component={ReanderSelect}
                    type="text"
                    label="Nomor Polisi"
                    placeholder="Masukan Nomor Polisi"
                    options={this.state.listNopol}
                    onChange={(e) => this.getKendaraanCustomer(e)}
                    // options={this.state.listCustomer.map((list)=>{
                    //   let data={
                    //     value:JSON.stringify(list.nopol_kendaraan),
                    //     name:list.nopol_kendaraan
                    //   };
                    //   console.log("iki ganteng", list)
                    //   return data
                    // })}
                  />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="merk"
                    component={ReanderField}
                    type="text"
                    placeholder="Masukkan Merk Kendaraan"
                    label="Merk Kendaraan"
                    readOnly
                  />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="type"
                    component={ReanderField}
                    type="text"
                    label="Type"
                    placeholder="Masukan Type"
                    readOnly
                  />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="warna"
                    component={ReanderField}
                    type="text"
                    label="Warna"
                    placeholder="Masukan Warna"
                    readOnly
                  />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="no_mesin"
                    component={ReanderField}
                    type="text"
                    label="Nomor Mesin"
                    placeholder="Masukan Nomor Mesin"
                    readOnly
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="col-lg-12">
                  <label htmlFor="">Catatan Keluhan</label>
                  <Field
                    name="catatan_keluhan"
                    component="textarea"
                    type="text"
                    className="form-control"
                    label="Catatan Keluhan"
                    placeholder="Masukan Catatan Keluhan"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <div className="text-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.props.dispatch(showModal())}
              >
                Tambah Barang <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <ToolkitProvider
              keyField="no_acc"
              data={this.props.barang_komplain || []}
              columns={this.state.columns}
              search
              exportCSV={{
                fileName: "Export Master Kategori.csv",
              }}
            >
              {(props) => (
                <div className="row">
                  <div className="col-6">
                    <div className="text-left">
                      <SearchBar {...props.searchProps} />
                    </div>
                  </div>
                  <hr />
                  <div className="col-12">
                    <BootstrapTable
                      pagination={paginationFactory()}
                      {...props.baseProps}
                    />
                    <br />
                  </div>
                </div>
              )}
            </ToolkitProvider>
          </div>
          <div className="row">
            <div className="col-lg-3 d-none">
              <Field
                name="total_sparepart"
                component={ReanderField}
                type="text"
                label="Grand Total Sparepart"
                placeholder="Masukan Grand Total Sparepart"
                {...currencyMask}
              />
            </div>
            <div className="col-lg-3 d-none">
              <Field
                name="total_jasa"
                component={ReanderField}
                type="text"
                label="Grand Total Jasa"
                placeholder="Masukan Total Jasa"
                {...currencyMask}
                readOnly
              />
            </div>
            <div className="col-lg-2 d-none">
              <Field
                name="discount"
                component={ReanderField}
                type="text"
                label="Discount ( % )"
                placeholder="0"
                onChange={this.onChange()}
                {...currencyMask}
              />
            </div>
            <div className="col-lg-3 d-none">
              <Field
                name="total"
                component={ReanderField}
                type="text"
                label="Total Biaya"
                placeholder="Masukan Total Biaya"
                {...currencyMask}
              />
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <div className="text-right">
              <button type="submit" className="btn btn-primary">
              {this.props.onSend ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                  Menyimpan
                </>
              ) : (
                <>
                  Bayar <i className="fa fa-paper-plane ml-3 "></i>
                </>
              )}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

HeadKomplainService = reduxForm({
  form: "HeadKomplainService",
  enableReinitialize: true,
})(HeadKomplainService);
const selector = formValueSelector("HeadKomplainService"); // <-- same as form name
export default connect((state) => {
  const { total_sparepart, total_jasa, discount } = selector(
    state,
    "total_sparepart",
    "total_jasa",
    "discount"
  );
  let discountnya = discount / 100;
  let totalnya = parseFloat(total_sparepart || 0) + parseFloat(total_jasa || 0);
  let discount_total = totalnya * discountnya || 0;
  return {
    grand_total_all: state.transaksi.total_bayar,
    onSend: state.datamaster.onSend,
    barang_komplain: state.transaksi.barang_komplain,
    listcustomer: state.datamaster.listcustomer,
    total_sparepart: total_sparepart,
    total_jasa: total_jasa,
    total: totalnya - discount_total,
  };
})(HeadKomplainService);
