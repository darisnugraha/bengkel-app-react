import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { AxiosMasterGet } from "../../../axios";
import {
  NotifError,
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import ComponentReturn from "./ComponentReturn";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});

class ModalBayarSupplierPenerimaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_bayar: "row",
      cash: "col-lg-12 d-none",
      transfer: "col-lg-12 d-none",
      listBank: [],
      bayar: true,
    };
  }
  reRender() {
    this.setState({
      bayar: !this.state.bayar,
    });
  }
  setTotal() {
    if (this.props.total > this.props.total_cash) {
      NotifError("Jumlah Cash Melebihi Tagihan");
    }
    this.props.change("total_ref", this.props.total_cash);
    this.props.change("total", this.props.total);
    this.props.change("no_bon", this.props.no_terima);
    this.props.change("kode_supplier", this.props.kode_supplier);
    this.props.change("tanggal_terima", localStorage.getItem("tanggal"));
  }
  componentDidMount() {
    AxiosMasterGet("bank/get/all").then((res) =>
      this.setState({
        listBank: res.data,
      })
    );
  }
  render() {
    return (
      <div className="col-lg-12">
        <div className="col-lg-12">
          <form
            onSubmit={this.props.handleSubmit}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          >
            <div className="row">
              <div className="col-lg-6 text-center mb-3">
                <h4>Total Hutang</h4>
                <h1>{`${parseFloat(this.props.sisa_hutang).toLocaleString(
                  "id-ID"
                )}`}</h1>
              </div>
              <div className="col-lg-6 text-center mb-3">
                <h4>Total Retur</h4>
                <h1>{`${parseFloat(this.props.retur_rp).toLocaleString(
                  "id-ID"
                )}`}</h1>
              </div>
              <div className="col-lg-4">
                <div className="col-lg-12">
                  <h3>Pembayaran Cash</h3>
                  <br />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="cash"
                    component={ReanderField}
                    type="text"
                    label="Cash"
                    placeholder="Masukan Cash"
                    {...currencyMask}
                    onChange={this.setTotal()}
                    onBlur={this.setTotal()}
                  />
                </div>
                <div className="col-lg-3 d-none">
                  <Field
                    name="kode_supplier"
                    component={ReanderField}
                    type="text"
                    label="Kode Supplier"
                    placeholder="Masukan Kode Supplier"
                  />
                </div>
                <div className="col-lg-3 d-none">
                  <Field
                    name="tanggal_terima"
                    component={ReanderField}
                    type="text"
                    label="Tanggal Terima"
                    placeholder="Masukan Tanggal Terima"
                  />
                </div>
                <div className="col-lg-3 d-none">
                  <Field
                    name="no_bon"
                    component={ReanderField}
                    type="text"
                    label="Nomor Bon"
                    placeholder="Masukan Nomor Bon"
                  />
                  <div className="col-lg-3 d-none">
                    <Field
                      name="retur_rp"
                      component={ReanderField}
                      type="text"
                      label="Return Rp"
                      placeholder="Masukan Return Rp"
                    />
                  </div>
                  <div className="col-lg-3 d-none">
                    <Field
                      name="sisa_hutang"
                      component={ReanderField}
                      type="text"
                      label="Sisa Hutang"
                      placeholder="Masukan Sisa Hutang"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <p>
                    * Silahkan isi sesuai metode pembayaran, bisa menggunakan 2
                    metode sekaligus
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="col-lg-12">
                  <h3>Pembayaran Transfer</h3>
                  <br />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="transfer"
                    component={ReanderField}
                    type="text"
                    label="Transfer"
                    placeholder="Masukan Transfer"
                    {...currencyMask}
                    onChange={this.setTotal()}
                    onBlur={this.setTotal()}
                  />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="no_ac_asal"
                    component={ReanderSelect}
                    options={this.state.listBank.map((list) => {
                      let data = {
                        value: list.no_ac,
                        name: `${list.no_ac} - ( ${list.atas_nama} )`,
                      };
                      return data;
                    })}
                    type="text"
                    label="Nomor A/C Asal"
                    placeholder="Masukan Nomor A/C Asal"
                  />
                </div>
                <div className="col-lg-12">
                  <Field
                    name="no_ac_tujuan"
                    component={ReanderField}
                    type="text"
                    label="Nomor A/C Tujuan"
                    placeholder="Masukan Nomor A/C Tujuan"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="col-lg-12">
                  <h3>Pembayaran Return</h3>
                  <br />
                </div>
                <div className="col-lg-12">
                  <ComponentReturn reRender={() => this.reRender()} />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  <Field
                    name="total_ref"
                    component={ReanderField}
                    type="text"
                    label="Total Harus Dibayar"
                    placeholder="Masukan Total Harus Dibayar"
                    readOnly
                    {...currencyMask}
                  />
                </div>
                <div className="col-lg-6">
                  <Field
                    name="total"
                    component={ReanderField}
                    type="text"
                    label="Total"
                    placeholder="Masukan Total"
                    readOnly
                    {...currencyMask}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="text-right">
                <button className="btn btn-primary">
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
          </form>
        </div>
      </div>
    );
  }
}

ModalBayarSupplierPenerimaan = reduxForm({
  form: "ModalBayarSupplierPenerimaan",
  enableReinitialize: true,
})(ModalBayarSupplierPenerimaan);
const selector = formValueSelector("ModalBayarSupplierPenerimaan");
export default connect((state) => {
  const { cash, transfer } = selector(state, "cash", "transfer");
  let retur = JSON.parse(localStorage.getItem("list_return")) || [];
  let total_return =
    retur && retur.map((list) => list.total_retur).reduce((a, b) => a + b, 0);
  return {
    onSend: state.datamaster.onSend,
    total: parseFloat(cash || 0) + parseFloat(transfer || 0),
    sisa_hutang:
      state.transaksi.sub_total -
      parseFloat(localStorage.getItem("penerimaan_discount") || 0),
    retur_rp: total_return,
    kode_supplier: state.transaksi.listPembayaran.kode_supplier,
    no_terima: state.transaksi.listPembayaran.no_terima,
    tanggal_terima: state.transaksi.listPembayaran.tanggal_terima,
    total_cash:
      parseFloat(state.transaksi.sub_total) -
      parseFloat(total_return) -
      parseFloat(localStorage.getItem("penerimaan_discount") || 0),
  };
})(ModalBayarSupplierPenerimaan);
