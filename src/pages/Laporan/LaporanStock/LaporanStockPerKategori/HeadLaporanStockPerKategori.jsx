import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { getBarang, getSupplier } from "../../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../../axios";
import { getToday } from "../../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../../components/notification/notification";

class HeadLaporanPengeluaranBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAll: false,
      listSpl: [],
      spl: [],
      listbrg: [],
      brgnama: [],
    };
  }
  componentDidMount() {
    this.props.change("tanggal_awal", getToday());
    this.props.change("tanggal_akhir", getToday());
    this.props.dispatch(getSupplier());
    this.props.dispatch(getBarang());

    let spl = { kode_supplier: "ALL", nama_supplier: "SEMUA" };

    AxiosMasterGet("supplier/get/all")
      .then((res) => this.setState({ listSpl: res.data }))
      .then(() => this.setState({ spl: this.state.listSpl.push(spl) }));

    let brg = { kode_barcode: "ALL", nama_barang: "SEMUA" };
    AxiosMasterGet("barang/get/all")
      .then((res) => this.setState({ listbrg: res.data }))
      .then(() => this.setState({ brg: this.state.listbrg.push(brg) }));
  }

  // handleCheck(data) {
  //   this.setState({ isAll: data.target.checked });
  //   this.props.change("kode_supplier", "");
  //   this.props.change("kode_barcode", "");
  // }

  setNamaBarang(data) {
    if (data === "ALL") {
      this.props.change("nama_barang", data)
    }else{
      let nmbarang;
    AxiosMasterGet("barang/get/all")
    .then((res) =>
      this.setState({ brgnama: res.data.find(fill=>fill.kode_barcode === data) })
    )
    .then(()=>nmbarang = this.state.brgnama.nama_barang)
    .then(()=>this.props.change("nama_barang", nmbarang))
    }
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
          <div className="col-lg-1 d-none">
            <p>Semua ?</p>
            <Field
              name="detail"
              component="input"
              type="checkbox"
              placeholder="Masukan Bayar"
              className="ml-3"
              onChange={(data) => this.handleCheck(data)}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="tanggal_awal"
              component={ReanderField}
              type="date"
              label="Dari Tanggal"
              placeholder="Masukan Tanggal Awal"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="tanggal_akhir"
              component={ReanderField}
              type="date"
              label="Sampai Tanggal"
              placeholder="Masukan Sampai Tanggal"
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="kode_supplier"
              component={ReanderSelect}
              options={this.state.listSpl.map((list) => {
                let data = {
                  value: list.kode_supplier,
                  name: `${list.kode_supplier} - ${list.nama_supplier}`,
                };
                return data;
              })}
              type="text"
              label="Supplier"
              placeholder="SEMUA"
              readOnly={this.state.isAll}
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="kode_barcode"
              component={ReanderSelect}
              options={this.state.listbrg.map((list) => {
                let data = {
                  value: list.kode_barcode,
                  name: `${list.kode_barcode} - ${list.nama_barang}`,
                };
                return data;
              })}
              type="text"
              label=" Nama Barang"
              placeholder="SEMUA"
              onChange={(data) => this.setNamaBarang(data)}
            />
          </div>
          <div className="col-lg-4 d-none">
            <Field
              name="nama_barang"
              component={ReanderField}
              type="text"
              label=" Nama Barang"
              placeholder="SEMUA"
              readOnly={this.state.isAll}
            />
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary" disabled={this.props.onSend}>
                {this.props.onSend ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                    Menyiapkan Laporan
                  </>
                ) : (
                  <>
                    Lihat Data <i className="fa fa-print ml-3 "></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

HeadLaporanPengeluaranBarang = reduxForm({
  form: "HeadLaporanPengeluaranBarang",
  enableReinitialize: true,
})(HeadLaporanPengeluaranBarang);
const selector = formValueSelector("ModalBayarService");
export default connect((state) => {
  return {
    listsupplier: state.datamaster.listsupplier,
    listbarang: state.datamaster.listbarang,
    onSend: state.datamaster.onSend,
    semua: selector(state, "detail") || false,
  };
})(HeadLaporanPengeluaranBarang);
