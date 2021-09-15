import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { AxiosMasterGet } from "../../../axios";
import { getToday } from "../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
  ToastError,
  ToastSucces,
  ToastWarning,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";
import { required } from "../../../validasi/normalize";
import { getListBarang } from "../../../actions/transaksi_action";

class HeadPenjualanSparepart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomer: [],
      listDivisi: [],
      reguler: true,
      member: false,
      columns: [
        {
          dataField: "kode_supplier",
          text: "Kode Supplier",
        },
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
        },
        {
          dataField: "qty",
          text: "Qty",
        },
        {
          dataField: "harga_satuan",
          text: "Harga Satuan",
          formatter: (list) => `${parseFloat(list).toLocaleString("id-ID")}`,
        },
        {
          dataField: "diskon_rp",
          text: "Diskon Rp",
          formatter: (list) =>
            `Rp. ${parseFloat(list).toLocaleString("id-ID")}`,
        },
        {
          dataField: "harga_total",
          text: "Total",
          formatter: (list) =>
            `Rp. ${parseFloat(list).toLocaleString("id-ID")}`,
        },
      ],
    };
  }
  getCustomer() {
    this.setState({
      member: false,
      reguler: true,
    });
    this.props.change("pelanggan", "");
    AxiosMasterGet("customer/get/all").then((res) =>
      this.setState({
        listCustomer:
          res &&
          res.data.map((list) => {
            let data = {
              value: `${list.nama_customer}||${list.alamat}||${list.handphone}`,
              name: list.nama_customer,
            };
            return data;
          }),
      })
    );
  }
  componentDidMount() {
    this.props.change("tanggal", getToday());
    this.getCustomer();
    AxiosMasterGet("pegawai/get/by-kode-divisi/SLS").then((res) =>
      this.setState({
        listDivisi:
          res &&
          res.data.map((list) => {
            let data = {
              value: `${list.kode_pegawai}`,
              name: list.nama_pegawai,
            };
            return data;
          }),
      })
    );
    AxiosMasterGet("penjualan/generate/no-trx")
      .then((res) => this.props.change("no_faktur", res.data[0].no_faktur_jual))
      .catch((err) => {
        ToastWarning("Gagal Ambil Faktur, Mohon Refresh");
        console.log(err);
      });
  }
  setCustomer(hasil) {
    let data = hasil.split("||");
    this.props.change("tanggal", getToday());
    localStorage.setItem("penjualan_sparepart_nama_customer", data[0]);
    this.props.change("nama_customer", data[0]);
    localStorage.setItem("penjualan_sparepart_alamat", data[1]);
    this.props.change("alamat", data[1]);
    localStorage.setItem("penjualan_sparepart_telepon", data[2]);
    this.props.change("telepon", data[2]);
  }
  DeleteTukar() {
    if (localStorage.getItem("tukarSparepart_temp") !== null) {
      localStorage.removeItem("tukarSparepart_temp");
      ToastSucces("Tukar Berhasil Dihapus");
      this.props.dispatch(getListBarang());
    }
  }
  getMember() {
    this.setState({
      member: true,
      reguler: false,
    });
    this.props.change("pelanggan", "");
    AxiosMasterGet("member/get-member-all")
      .then((res) =>
        this.setState({
          listCustomer:
            res &&
            res.data.map((list) => {
              let data = {
                value: `${list.nama_customer}||${list.alamat}||${list.handphone}`,
                name: list.nama_customer,
              };
              return data;
            }),
        })
      )
      .catch(() => ToastError("Error Get Member"));
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="row">
          <div className="col-lg-3">
            <Field
              name="tanggal"
              component={ReanderField}
              type="date"
              label="Tanggal"
              placeholder="Masukan Tanggal"
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="no_faktur"
              component={ReanderField}
              type="text"
              label="No Faktur"
              placeholder="Masukan No Faktur"
              readOnly
            />
          </div>
          <div className="col-lg-3">
            <label className="mb-4">Jenis Penjualan</label>
            <div>
              <label>
                <Field
                  name="jenis_penjualan"
                  component="input"
                  type="radio"
                  value="member"
                  className="mr-3"
                  onClick={() => this.getMember()}
                  checked={this.state.member}
                />
                Member
              </label>
              <label className="ml-3">
                <Field
                  name="jenis_penjualan"
                  component="input"
                  type="radio"
                  value="reguler"
                  className="mr-3"
                  onClick={() => this.getCustomer()}
                  checked={this.state.reguler}
                />
                Reguler
              </label>
            </div>
          </div>
          <div className="col-lg-3">
            <Field
              name="kode_sales"
              component={ReanderSelect}
              options={this.state.listDivisi}
              type="text"
              label="Sales"
              placeholder="Masukan Sales"
              onChange={(data) =>
                localStorage.setItem("penjualan_sparepart_kode_sales", data)
              }
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="pelanggan"
              component={ReanderSelect}
              options={this.state.listCustomer}
              type="text"
              label="Pelanggan"
              placeholder="Masukan Pelanggan"
              onChange={(data) => this.setCustomer(data)}
              validate={required}
            />
          </div>
          <div className="col-lg-4 d-none">
            <Field
              name="nama_customer"
              component={ReanderField}
              type="text"
              label="CUSTOMER"
              placeholder="Masukan CUSTOMER"
              readOnly
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="alamat"
              component={ReanderField}
              type="text"
              label="Alamat"
              placeholder="Masukan Alamat"
              readOnly
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="telepon"
              component={ReanderField}
              type="text"
              label="Telepon"
              placeholder="Masukan Telepon"
              readOnly
            />
          </div>

          <div className="col-lg-12">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <Field
                  name="kode_barcode"
                  component={ReanderField}
                  type="text"
                  label="Kode Barcode"
                  placeholder="Masukan Kode Barcode"
                />
              </div>
              <div className="col-lg-2">
                <label htmlFor="">.</label>
                <button
                  className="btn btn-block btn-primary"
                  type="button"
                  onClick={() => this.props.setCariBarang("TAMBAH")}
                >
                  Cari Barang <i className="fa fa-search ml-3"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <Tabel
              keyField="kode_barang"
              data={this.props.listBarangSparepart || []}
              columns={this.state.columns}
              emptyText="Silahkan tambahkan Barang"
              empty={true}
            />
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4">
                <div className="text-left">
                  <button
                    className="btn btn-danger mr-3"
                    type="button"
                    onClick={() => this.DeleteTukar()}
                  >
                    Hapus Barang Tukar<i className="fa fa-trash ml-3"></i>
                  </button>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="text-center">
                  <h4>Total Tukar : </h4>
                  <h3>
                    Rp.
                    {parseFloat(this.props.totalTukar).toLocaleString("id-ID")}
                  </h3>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="text-right">
                  <button
                    className="btn btn-green mr-3"
                    type="button"
                    onClick={() => this.props.setCariBarang("TUKAR")}
                  >
                    Tukar Barang <i className="fa fa-exchange-alt ml-3"></i>
                  </button>
                  <button className="btn btn-primary">
                    Bayar <i className="fa fa-money-bill-alt ml-3"></i>
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

HeadPenjualanSparepart = reduxForm({
  form: "HeadPenjualanSparepart",
  enableReinitialize: true,
})(HeadPenjualanSparepart);
const selector = formValueSelector("HeadPenjualanSparepart");
export default connect((state) => {
  return {
    initialValues: {
      no_faktur: localStorage.getItem("no_penjualan_sparepart") || "",
      nama_customer:
        localStorage.getItem("penjualan_sparepart_nama_customer") || "",
      alamat: localStorage.getItem("penjualan_sparepart_alamat") || "",
      telepon: localStorage.getItem("penjualan_sparepart_telepon") || "",
      pelanggan:
        `${localStorage.getItem(
          "penjualan_sparepart_nama_customer"
        )}||${localStorage.getItem(
          "penjualan_sparepart_alamat"
        )}||${localStorage.getItem("penjualan_sparepart_telepon")}` || "",
      kode_sales: localStorage.getItem("penjualan_sparepart_kode_sales") || "",
    },
    listBarangSparepart: state.transaksi.listBarangSparepart,
    totalTukar: state.transaksi.totalTukar,
    jenis_penjualan: selector(state, "jenis_penjualan"),
  };
})(HeadPenjualanSparepart);
