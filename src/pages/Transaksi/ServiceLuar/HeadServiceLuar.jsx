import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import Swal from "sweetalert2";
import {
  getCustomer,
  getSupplier,
  showModal,
} from "../../../actions/datamaster_action";
import { getKirimServiceBarang } from "../../../actions/transaksi_action";
import { AxiosMasterGet } from "../../../axios";
import { getToday } from "../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";
import { required } from "../../../validasi/normalize";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  locale: "id-ID",
});
class HeadServiceLuar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listNopol: [],
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
          dataField: "satuan",
          text: "Satuan",
        },
        {
          dataField: "keterangan",
          text: "Keterangan service",
        },
        {
          dataField: "harga_satuan",
          text: "Harga Satuan",
          formatter: (data) => {
            return "Rp. " + data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "harga_total",
          text: "Total",
          formatter: (data) => {
            return "Rp. " + data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row, rowIndex) => {

            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    type="button"
                    onClick={() => this.deleteBarang(rowIndex)}
                    className="btn btn-danger"
                  >
                    Hapus
                    <i className="fa fa-trash ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }
  deleteBarang(row) {
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
        let data =
          JSON.parse(localStorage.getItem("barang_kirim_service")) || [];

        data.splice(row, 1);
        localStorage.setItem("barang_kirim_service", JSON.stringify(data));
        this.props.dispatch(getKirimServiceBarang());
      }
    });
  }
  componentDidMount() {
    this.props.dispatch(getKirimServiceBarang());
    AxiosMasterGet("kirim-service-luar/generate/no-trx").then((res) =>
      this.props.change("no_service", res && res.data[0].no_service_kirim)
    );
    this.props.dispatch(getSupplier());
    this.props.change("tanggal", getToday());
    this.props.dispatch(getCustomer());
  }

  getNopol() {
    let kodecust = localStorage.getItem("kode_customer");
    let listNopol = this.props.listcustomer.filter((list) => list.kode_customer === kodecust)
    let final = listNopol[0].nopol_kendaraan.map((hasil) => {
      let data = {
        value: hasil.nopol_kendaraan,
        name: hasil.nopol_kendaraan
      }
      return data
    })
    this.setState({
      listNopol: final
    })
  }

  setNopol(hasil) {
    console.log("hasil", hasil);
    localStorage.setItem("kode_customer", hasil);
    this.getNopol(hasil[0]);
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
              name="no_service"
              component={ReanderField}
              type="text"
              label="Nomor Service"
              placeholder="Masukan Nomor Service"
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
            />
          </div>
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <Field
              name="kode_supplier"
              component={ReanderSelect}
              options={this.props.listsupplier.map((list) => {
                let data = {
                  value: list.kode_supplier,
                  name: list.nama_supplier,
                };
                return data;
              })}
              type="text"
              label="Supplier"
              placeholder="Masukan Supplier"
              validate={required}
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="nama_customer"
              component={ReanderSelect}
              options={this.props.listcustomer.map((list) => {
                let data = {
                  value: list.kode_customer,
                  name: `${list.nama_customer}`,
                };
                return data;
              })}
              type="text"
              label="Nama Customer"
              placeholder="Masukan Nama Customer"
              validate={required}
              onChange={(e) => this.setNopol(e)}
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="nopol_kendaraan"
              component={ReanderSelect}
              options={this.state.listNopol}
              type="text"
              label="Nomor Polisi Kendaraan"
              placeholder="Masukan Nomor Polisi Kendaraan"
              validate={required}
            />
          </div>

          <div className="col-lg-4">
            <Field
              name="diskon"
              component={ReanderField}
              type="telp"
              label="Diskon"
              placeholder="Masukan Nomor Polisi Kendaraan"
              {...currencyMask}
            />
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.props.dispatch(showModal())}
              >
                Tambah Data <i className="fa fa-plus ml-3"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <Tabel
              keyField="nama_barang"
              data={this.props.listkirimbarangservice || []}
              columns={this.state.columns}
              textEmpty="Silahkan Tambahkan barang"
            />
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4"></div>
              <div className="col-lg-4 text-center">
                <h4>Total Biaya</h4>
                <h3>{`${parseFloat(this.props.total_bayar).toLocaleString(
                  "id-ID"
                )}`}</h3>
              </div>
              <div className="col-lg-4">
                <div className="text-right">
                  <button
                    className="btn btn-primary"
                    disabled={this.props.onSend}
                  >
                    {this.props.onSend ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                        Menyimpan
                      </>
                    ) : (
                      <>
                        Simpan <i className="fa fa-paper-plane ml-3 "></i>
                      </>
                    )}
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

HeadServiceLuar = reduxForm({
  form: "HeadServiceLuar",
  enableReinitialize: true,
})(HeadServiceLuar);
const selector = formValueSelector("HeadServiceLuar");
export default connect((state) => {
  return {
    onSend: state.datamaster.onSend,
    listsupplier: state.datamaster.listsupplier,
    no_service: localStorage.getItem("kirim_service_luar_nomor") || "",
    listcustomer: state.datamaster.listcustomer,
    listkirimbarangservice: state.transaksi.listkirimbarangservice,
    total_bayar: state.transaksi.total_bayar - (selector(state, "diskon") || 0),
  };
})(HeadServiceLuar);
