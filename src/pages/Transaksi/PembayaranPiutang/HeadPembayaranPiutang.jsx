import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getCustomer, showModal } from "../../../actions/datamaster_action";
import {
  getListPiutangCustomer,
  setPembayaranPiutang,
} from "../../../actions/transaksi_action";
import { AxiosMasterGet } from "../../../axios";
import { getToday } from "../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
  ToastError,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

class HeadPembayaranPiutang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama_customer: false,
      listNopol:[],
      no_bon: false,

      columns: [
        {
          dataField: "tgl_transaksi",
          text: "Tanggal",
        },
        {
          dataField: "no_bon",
          text: "Nomor Faktur Jual",
        },
        {
          dataField: "nama_customer",
          text: "Nama Customer",
        },
        {
          dataField: "alamat",
          text: "Alamat",
        },
        {
          dataField: "nopol",
          text: "Nomor Polisi",
        },
        {
          dataField: "saldo_piutang",
          text: "Total",
          formatter: (data) => data.toLocaleString("id-ID"),
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let data = {
              no_bayar_customer: localStorage.getItem("nomor_bayar") || "",
              tanggal: row.tgl_transaksi,
              no_bon: row.no_bon,
              total_pembayaran: row.saldo_piutang,
              kode_customer: row.kode_customer,
            };
            // console.log(row);
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    type="button"
                    onClick={() => this.showBayar(data)}
                    className="btn btn-success mr-3"
                  >
                    Bayar
                    <i className="fa fa-money-bill-alt ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }

  showBayar(data) {
    // console.log(data);
    localStorage.setItem("total_all", data.total_pembayaran)
    this.props.dispatch(showModal());
    this.props.dispatch(setPembayaranPiutang(data));
  }
  componentDidMount() {
    AxiosMasterGet("bayar-piutang-customer/generate/no-trx")
      .then((res) =>
        this.props.change("nomor_bayar", res.data[0].no_bayar_customer)
      )
      .catch((err) =>
        ToastError(`Error Get Nomor bayar \nError : ${err.response.data}`)
      );
    this.props.dispatch(getCustomer());
    this.props.change("tanggal", getToday());
    this.props.dispatch(getListPiutangCustomer());
  }
  setCustomer(data) {
    let hasil = data.split("||");
    this.props.change("alamat", hasil[1]);
    this.getNopol(hasil[0]);
    this.props.change("kode_customer", hasil[0]);
    localStorage.setItem("kode_customer_piutang", hasil[0]);
    this.setState({
      nama_customer: hasil[3],
    });
  }

  getNopol(data){
    let listNopol =   this.props.listCustomer.filter((list) => list.kode_customer === data)
     let final =  listNopol[0].nopol_kendaraan.map((hasil) => {
      let data = {
        value : hasil.nopol_kendaraan,
        name : hasil.nopol_kendaraan
      }
      return data
    })
    this.setState({
      listNopol : final
    })
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
            <div className="col-lg-4">
              <Field
                name="nomor_bayar"
                component={ReanderField}
                type="text"
                label="Nomor Bayar"
                placeholder="Masukan Nomor Bayar"
                readOnly
              />
            </div>
            <div className="col-lg-4">
              <Field
                name="tanggal"
                component={ReanderField}
                type="date"
                label="Tanggal"
                placeholder="Masukan Tanggal"
                onChange={(e) =>
                  localStorage.setItem("tanggal_bayar_piutang", e.target.value)
                }
              />
            </div>
            <div className="col-lg-4">
              <Field
                name="no_bon"
                component={ReanderField}
                type="text"
                label="Nomor Faktur Jual"
                placeholder="Masukan Nomor Faktur Jual"
                onChange={(e) =>
                  this.setState({
                    no_bon: e.target.value,
                  })
                }
              />
            </div>
            {/* <div className="col-lg-4">
              <Field
                name="nama_customer"
                component={ReanderSelect}
                options={this.props.listCustomer.map((list) => {
                  let data = {
                    value: `${list.kode_customer}||${list.alamat}||${list.nama_customer}`,
                    name: list.nama_customer,
                  };
                  return data;
                })}
                onChange={(e) => this.setCustomer(e)}
                type="text"
                label="Nama Customer"
                placeholder="Masukan Nama Customer"
              />
            </div>
            <div className="col-lg-4 d-none">
              <Field
                name="kode_customer"
                component={ReanderField}
                type="text"
                label="Alamat"
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
              />
            </div>
            <div className="col-lg-4">
              <Field
                name="no_polisi"
                component={ReanderSelect}
                options={this.state.listNopol}
                type="text"
                label="Nomor Polisi"
              />
            </div>
            <div className="col-lg-12 d-none">
              <div className="text-right">
                <button className="btn btn-primary">
                  Cari <i className="fa fa-search ml-3"></i>
                </button>
              </div>
            </div> */}
            <div className="col-lg-12 mt-3">
              <Tabel
                keyField="no_bon"
                data={
                  this.state.nama_customer
                    ? this.props.listpiutangcustomer.filter(
                        (list) =>
                          list.nama_customer === this.state.nama_customer
                      )
                    : this.props.listpiutangcustomer.filter(
                        (list) => list.no_bon === this.state.no_bon
                      )
                }
                columns={this.state.columns}
                emptyText="Silahkan Isi Nomor Bon atau Pilih Customer Untuk Melihat Data"
                empty={true}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

HeadPembayaranPiutang = reduxForm({
  form: "HeadPembayaranPiutang",
  enableReinitialize: true,
})(HeadPembayaranPiutang);
export default connect((state) => {
  return {
    initialState: {
      nomor_bayar: localStorage.getItem("nomor_bayar_piutang"),
    },
    listCustomer: state.datamaster.listcustomer,
    listpiutangcustomer: state.transaksi.listpiutangcustomer,
  };
})(HeadPembayaranPiutang);
