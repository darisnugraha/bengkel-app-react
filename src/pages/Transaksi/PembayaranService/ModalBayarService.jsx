import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { getListPembayaran } from "../../../actions/transaksi_action";
import { ReanderFieldInline } from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

const validate = (value) => {
  if (parseInt(localStorage.getItem("kembalian_bayar")) < 0) {
    let errors = {};
    if (value.bayar < 0 && !value.piutang) {
      errors.bayar = "Tidak boleh Kosong";
    }
    return errors; 
  }
  
};
const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});

class ModalBayarService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.change("grand_total_all", this.props.total);
    this.props.dispatch(getListPembayaran());
  }
  setBayar(e) {
    this.setState({
      bayar: e.target.value,
    });
    localStorage.setItem("bayar_rp_rongsok", e.target.value);
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
          <div className="col-lg-12 mb-3">
            <div className="col-lg-12">
              <div className="text-left">
                <button
                  className="btn btn-black text-white"
                  onClick={this.props.backMenu}
                >
                  <i className="fa fa-chevron-left mr-3"></i> Back
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 text-center">
                  <h4>Sub Total</h4>
                  <p style={{ fontSize: 28, fontWeight: 500 }}>
                    {parseFloat(this.props.subtotal).toLocaleString("id-ID")}
                  </p>

                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6 text-center">
                        <Field
                          name="jasa"
                          label="Diskon Jasa"
                          component={ReanderFieldInline}
                          type="telp"
                          placeholder="Masukan Bayar"
                          className=" form-control-lg"
                          onChange={(e) => this.setBayar(e)}
                          {...currencyMask}
                          readOnly={this.props.checkpiutang}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6 text-center">
                        <Field
                          name="barang"
                          label="Diskon Barang"
                          component={ReanderFieldInline}
                          type="telp"
                          placeholder="Masukan Bayar"
                          className=" form-control-lg"
                          onChange={(e) => this.setBayar(e)}
                          {...currencyMask}
                          readOnly={this.props.checkpiutang}
                        />
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <h4 className="mt-2">Bayar</h4>
                  <h3>Grand Total</h3>
                  <p style={{ fontSize: 32, fontWeight: 700 }}>
                    {parseFloat(this.props.grand_total_all).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6 text-center">
                        <Field
                          name="bayar"
                          label="Bayar"
                          component={ReanderFieldInline}
                          type="telp"
                          placeholder="Masukan Bayar"
                          className=" form-control-lg"
                          onChange={(e) => this.setBayar(e)}
                          {...currencyMask}
                          readOnly={this.props.checkpiutang}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6 text-center">
                        <label htmlFor="">Masuk Piutang ?</label>
                        <Field
                          name="piutang"
                          component="input"
                          type="checkbox"
                          placeholder="Masukan Bayar"
                          className="ml-3"
                        />
                      </div>
                    </div>
                  </div>
                  <h4>Kembali</h4>
                  <p style={{ fontSize: 28, fontWeight: 500 }}>
                    {parseFloat(this.props.kembali).toLocaleString("id-ID")}
                  </p>
                  <span style={{ color: "red" }}>
                    <b> **Harga Sudah Termasuk PPN 10%</b>
                  </span>
                </div>
                <div className="col-lg-6">
                  <div className="col-lg-12">
                    <Tabel
                      keyField="no_ac"
                      data={this.props.listPembayaran_temp}
                      columns={this.props.columns}
                      tambahData={true}
                      handleClick={this.props.showCC}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center col-lg-6">
            <button className="btn btn-primary" disabled={this.props.onSend}>
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
    );
  }
}

ModalBayarService = reduxForm({
  form: "ModalBayarService",
  enableReinitialize: true,
  validate: validate,
})(ModalBayarService);
const selector = formValueSelector("ModalBayarService");
export default connect((state) => {
  localStorage.setItem("bayar_rp_rongsok", selector(state, "bayar") || 0);
  localStorage.setItem(
    "kembalian_bayar",
    (selector(state, "bayar") || 0) -
      (state.transaksi.total_bayar -
        (selector(state, "jasa") || 0) -
        (selector(state, "barang") || 0) -
        state.transaksi.sum_pembayaran) *
        1
  );
  localStorage.setItem(
    "total_all",
      ((state.transaksi.total_bayar - (selector(state, "jasa") || 0) - (selector(state, "barang") || 0) - state.transaksi.sum_pembayaran)*1.1).toFixed(0)
  );
  return {
    subtotal: state.transaksi.total_bayar,
    grand_total_all:
      (state.transaksi.total_bayar -
        (selector(state, "jasa") || 0) -
        (selector(state, "barang") || 0)) *
      1.1,
    listPembayaran_temp: state.transaksi.listpembayaran_temp,
    sum_pembayaran: state.transaksi.sum_pembayaran,
    total_bayar:
      state.transaksi.total_bayar + state.transaksi.total_bayar * 0.1,
    kembali:
      (selector(state, "bayar") || 0) -
      (state.transaksi.total_bayar -
        (selector(state, "jasa") || 0) -
        (selector(state, "barang") || 0) -
        state.transaksi.sum_pembayaran) *
        1.1,
    bayar: selector(state, "bayar") || 0,
    onSend: state.datamaster.onSend,
    checkpiutang: selector(state, "piutang") || false,
  };
})(ModalBayarService);
