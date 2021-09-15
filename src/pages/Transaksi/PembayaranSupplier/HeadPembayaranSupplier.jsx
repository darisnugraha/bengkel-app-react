import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { showModal } from "../../../actions/datamaster_action";
import { setPembayaranSupplier } from "../../../actions/transaksi_action";
import { AxiosMasterGet } from "../../../axios";
import { getToday } from "../../../components/helpers/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

class HeadPembayaranSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupplier: [],
      columns: [
        {
          dataField: "tanggal_terima",
          text: "Tanggal",
        },
        {
          dataField: "no_terima",
          text: "Nomor Terima",
        },
        {
          dataField: "kode_supplier",
          text: "Kode Supplier",
        },
        {
          dataField: "sisa_hutang",
          text: "Total",
          formatter: (data) => (data ? data.toLocaleString("id-ID") : 0),
        },
        {
          dataField: "retur_rp",
          text: "Total Return",
          formatter: (data) => (data ? data.toLocaleString("id-ID") : 0),
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let data = {
              sisa_hutang: row.sisa_hutang,
              retur_rp: row.retur_rp,
              kode_supplier: row.kode_supplier,
              no_terima: row.no_terima,
              tanggal_terima: row.tanggal_terima,
            };
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    type="button"
                    onClick={() => this.setBayar(data)}
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
      data: [
        {
          tanggal: "01/30/2021",
          nomor_bon: "PS-00001",
          kode_supplier: "SP001",
          total: 1000000,
        },
      ],
    };
  }

  setBayar(data) {
    this.props.dispatch(setPembayaranSupplier(data));
    this.props.dispatch(showModal());
  }
  componentDidMount() {
    AxiosMasterGet("bayar-hutang-supplier/generate/no-trx").then((res) =>
      this.setNomor(res)
    );
    AxiosMasterGet("supplier/get/all").then((res) =>
      this.setState({
        listSupplier: res.data,
      })
    );
    this.props.change("tanggal", getToday);
  }
  setNomor(res) {
    this.props.change("kode_hutang", res.data[0].no_bayar_supplier);
    localStorage.setItem("no_bayar_supplier", res.data[0].no_bayar_supplier);
    localStorage.setItem("tanggal", getToday());
  }
  setLocal(nama, data) {
    localStorage.setItem(nama, data);
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
            <div className="col-lg-3">
              <Field
                name="kode_hutang"
                component={ReanderField}
                type="text"
                label="Kode Hutang"
                placeholder="Masukan Kode Hutang"
                readOnly
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="kode_supplier"
                component={ReanderSelect}
                options={this.state.listSupplier.map((list) => {
                  let data = {
                    value: list.kode_supplier,
                    name: list.nama_supplier,
                  };
                  return data;
                })}
                type="text"
                label="Kode Supplier"
                placeholder="Masukan Kode Supplier"
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="tanggal"
                component={ReanderField}
                type="date"
                label="Tanggal"
                placeholder="Masukan Tanggal"
                onChange={(e) => this.setLocal("tanggal", e.target.value)}
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="no_bon"
                component={ReanderField}
                type="text"
                label="Kode Terima"
                placeholder="Masukan Kode Penerimaan Supplier"
                onChange={(e) => this.setLocal("no_bon", e.target.value)}
              />
            </div>
            <div className="col-lg-12">
              <div className="text-right">
                <button className="btn btn-primary">
                  Cari <i className="fa fa-search ml-3"></i>
                </button>
              </div>
            </div>
            <div className="col-lg-12 mt-3">
              <Tabel
                keyField="no_terima"
                data={this.props.listTransaksi || []}
                columns={this.state.columns}
                CSVExport
                textEmpty="Silahkan masukan nomor bon dan klik Tombol Cari Untuk melihat data"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

HeadPembayaranSupplier = reduxForm({
  form: "HeadPembayaranSupplier",
  enableReinitialize: true,
})(HeadPembayaranSupplier);
export default HeadPembayaranSupplier;
