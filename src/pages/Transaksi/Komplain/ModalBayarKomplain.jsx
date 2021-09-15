import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { getListBarangPembayaran, getListPembayaran, getListPembayaranKomplain } from "../../../actions/transaksi_action";
import { ReanderField } from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

const validate = (value) => {
  let errors = {};
  if (
    !value.bayar &&
    !value.piutang &&
    localStorage.getItem("listPembayaran_temp") === null
  ) {
    errors.bayar = "Tidak boleh Kosong";
  }
  return errors;
};

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});

class ModalBayarKomplain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.change("grand_total_all", localStorage.getItem("total_bayar"));
    this.props.dispatch(getListPembayaranKomplain());
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
                  <h3>Grand Total</h3>
                  <p style={{ fontSize: 32, fontWeight: 700 }}>
                    {parseFloat(this.props.grand_total_all).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                  {/* <h3>Total Tukar</h3>
                  <p style={{ fontSize: 32, fontWeight: 700 }}>
                    {parseFloat(this.props.totalTukar).toLocaleString("id-ID")}
                  </p> */}
                  <h3>Bayar</h3>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6 text-center">
                        <Field
                          name="bayar"
                          component={ReanderField}
                          type="telp"
                          placeholder="Masukan Bayar"
                          className=" form-control-lg"
                          onChange={(e) => this.setBayar(e)}
                          {...currencyMask}
                          readOnly={this.props.piutangCheck}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-3"></div>
                      {/* <div className="col-lg-6 text-center">
                        <label htmlFor="">Masuk Piutang ?</label>
                        <Field
                          name="piutang"
                          component="input"
                          type="checkbox"
                          placeholder="Masukan Bayar"
                          className="ml-3"
                        />
                      </div> */}
                    </div>
                  </div>
                  <h3>Kembali</h3>
                  <p style={{ fontSize: 35, fontWeight: 700 }}>
                    {parseFloat(this.props.kembali).toLocaleString("id-ID")}
                  </p>
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

ModalBayarKomplain = reduxForm({
  form: "ModalBayarKomplain",
  enableReinitialize: true,
  validate: validate,
})(ModalBayarKomplain);
const selector = formValueSelector("ModalBayarKomplain");
export default connect((state) => {
  localStorage.setItem("bayar_rp_rongsok", selector(state, "bayar") || 0);
  localStorage.setItem(
    "kembalian_bayar",
    (selector(state, "bayar") || 0) -
      state.transaksi.total_bayar +
      state.transaksi.totalTukar +
      state.transaksi.sum_pembayaran
  );
  return {
    grand_total_all: state.transaksi.total_bayar,
    listPembayaran_temp: state.transaksi.listpembayaran_temp,
    sum_pembayaran: state.transaksi.sum_pembayaran,
    totalTukar: state.transaksi.totalTukar,
    kembali:
      (selector(state, "bayar") || 0) -
      state.transaksi.total_bayar +
      state.transaksi.totalTukar +
      state.transaksi.sum_pembayaran,
    bayar: selector(state, "bayar") || 0,
    onSend: state.datamaster.onSend,
    piutangCheck: selector(state, "piutang") || false,
  };
})(ModalBayarKomplain);
