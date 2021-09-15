import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  ReanderField,
  ReanderSelect,
  ToastSucces,
} from "../../../components/notification/notification";
import { createNumberMask } from "redux-form-input-masks";
import Swal from "sweetalert2";
import { getListBarangRongsok } from "../../../actions/transaksi_action";
import { AxiosMasterGet } from "../../../axios";
import { getToday } from "../../../components/notification/function";
import { required } from "../../../validasi/normalize";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  decimalPlaces: 0,
  locale: "id-ID",
});
const maptostate = (state) => {
  return {
    initialValues: {
      total: state.transaksi.total_bayar,
      no_faktur: localStorage.getItem("nomor_jual_rongsok") || "",
    },
    listCustomer: state.datamaster.listcustomer || [],
  };
};
class HeadPenjualanRongsok extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCustomer: [],
      columns: [
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        {
          dataField: "qty",
          text: "Qty",
        },
        {
          dataField: "kode_satuan",
          text: "Satuan",
        },
        {
          dataField: "harga_satuan",
          text: "Harga Satuan",
          formatter: (data) => parseFloat(data).toLocaleString("id-ID"),
        },
        {
          dataField: "harga_total",
          text: "Total",
          formatter: (data) => parseFloat(data).toLocaleString("id-ID"),
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row, index) => {
            this.setState({});
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    type="button"
                    onClick={() => this.deleteBarang(index)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-trash"></i>
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
    this.props.change("total", this.props.sub_total);
    this.props.change("tanggal", getToday());

    AxiosMasterGet("penjualan-rosok/generate/no-trx").then((res) =>
      this.props.change("no_faktur", res.data[0].no_faktur_jual)
    );
  }
  deleteBarang(index) {
    Swal.fire({
      title: "Anda Yakin !!",
      text: "Ingin Menghapus Data Ini ?",
      icon: "warning",
      position: "top-center",
      cancelButtonText: "Tidak",
      showCancelButton: true,
      confirmButtonText: "OK",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = JSON.parse(localStorage.getItem("BarangRongsok_temp")) || [];
        data.splice(index, 1);
        localStorage.setItem("BarangRongsok_temp", JSON.stringify(data));
        this.props.dispatch(getListBarangRongsok());
        ToastSucces("Berhasil Menghapus Data");
      }
    });
  }
  setCustomer(e) {
    let hasil = e.split("||");
    this.props.change("kode_customer", hasil[0]);
    this.props.change("alamat", hasil[1]);
    this.props.change("handphone", hasil[2]);
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
          <div className="col-lg-4">
            <Field
              name="tanggal"
              component={ReanderField}
              type="date"
              label="Tanggal"
              placeholder="Masukan Tanggal"
              validate={required}
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="no_faktur"
              component={ReanderField}
              type="text"
              label="Nomor Faktur"
              placeholder="Masukan Nomor Faktur"
              readOnly
            />
          </div>
          <div className="col-lg-4"></div>
          <div className="col-lg-3">
            <Field
              name="kode_pelanggan"
              component={ReanderSelect}
              options={this.props.listCustomer.map((list) => {
                let data = {
                  value: `${list.nama_customer}||${list.alamat}||${list.handphone}`,
                  name: list.nama_customer,
                };
                return data;
              })}
              type="text"
              label="Pelanggan"
              placeholder="Masukan Pelanggan"
              onChange={(e) => this.setCustomer(e)}
              validate={required}
            />
            <div className="col-lg-12">
              <span>
                Jika Tidak Ada dalam list, silahkan klik tombol biru untuk
                menambahkan Customer
              </span>
            </div>
          </div>
          <div className="col-lg-1">
            <div className="form-group">
              <label htmlFor=".">.</label>
              <button
                type="button"
                className="btn btn-block btn-teal form-control"
                onClick={this.props.showCustomer}
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-4 d-none">
            <Field
              name="kode_customer"
              component={ReanderField}
              type="text"
              label="Kode Customer"
              placeholder="Masukan Alamat"
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
              validate={required}
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="handphone"
              component={ReanderField}
              type="text"
              label="Handphone"
              placeholder="Masukan Handphone"
              readOnly
              validate={required}
            />
          </div>
          <div className="col-lg-12">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <Field
                  name="total"
                  component={ReanderField}
                  type="text"
                  label="Total Harga"
                  placeholder="Rp."
                  readOnly
                  {...currencyMask}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12 mb-3">
            <div className="text-right">
              <button
                type="button"
                className="btn btn-warning"
                onClick={this.props.showTambah}
              >
                Tambah Data <i className="fa fa-plus ml-3"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={this.props.listbarangrongsok || []}
              columns={this.state.columns}
            />
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary">
                Bayar <i className="fa fa-chevron-circle-right ml-3"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

HeadPenjualanRongsok = reduxForm({
  form: "HeadPenjualanRongsok",
  enableReinitialize: true,
})(HeadPenjualanRongsok);
export default connect(maptostate, null)(HeadPenjualanRongsok);
