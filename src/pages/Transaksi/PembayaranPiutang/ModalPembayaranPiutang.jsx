import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { getBank } from "../../../actions/datamaster_action";
import {
  ReanderFieldInline,
  ReanderSelect,
} from "../../../components/notification/notification";

const validate = (values) => {
  const errors = {};
  if (!values.cash && !values.transfer) {
    errors.cash = "Mohon isi Salah Satu / keduanya";
    errors.transfer = "Mohon isi Salah Satu / keduanya";
  } else if (
    parseFloat(values.cash) + parseFloat(values.transfer) >
    parseFloat(values.total_piutang)
  ) {
    errors.cash = "Tidak Boleh melebihi piutang";
    errors.transfer = "Tidak Boleh melebihi piutang";
  } else if (
    parseFloat(values.cash) + parseFloat(values.transfer) <
    parseFloat(values.total_piutang)
  ) {
    errors.cash = "Tidak Boleh kurang dari piutang";
    errors.transfer = "Tidak Boleh kurang dari piutang";
  }

  return errors;
};

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  locale: "id-ID",
});
class ModalPembayaranPiutang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type_bayar: "row",
      cash: "col-lg-12 d-none",
      transfer: "col-lg-12 d-none",
    };
  }
  componentDidMount() {
    this.props.dispatch(getBank());
  }
  render() {
    return (
      <div className="col-lg-12">
        <form
          onSubmit={this.props.handleSubmit}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <div className="row">
            <div className="col-lg-6 text-center">
              <h3>Total Piutang</h3>
              <h2>{` ${parseFloat(this.props.total_piutang).toLocaleString(
                "id-ID"
              )}`}</h2>
            </div>
            <div className="col-lg-6 text-center">
              <h3>Total Pembayaran</h3>
              <h2>{` ${parseFloat(this.props.total_pembayaran).toLocaleString(
                "id-ID"
              )}`}</h2>
            </div>
            <div className="col-lg-6">
              <div className="col-lg-12">
                <h4>Pembayaran Cash</h4>
              </div>
              <div className="col-lg-12 mt-2">
                <Field
                  name="cash"
                  component={ReanderFieldInline}
                  type="text"
                  label="Cash Rp"
                  placeholder="Masukan Cash Rp"
                  {...currencyMask}
                />
              </div>
              <div className="col-lg-12 mt-2 d-none">
                <Field
                  name="total_piutang"
                  component={ReanderFieldInline}
                  type="text"
                  label="Cash Rp"
                  placeholder="Masukan Cash Rp"
                  {...currencyMask}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="col-lg-12">
                <h4>Pembayaran Transfer</h4>
              </div>
              <div className="col-lg-12 mt-2">
                <Field
                  name="transfer"
                  component={ReanderFieldInline}
                  type="telp"
                  label="Transfer Rp"
                  placeholder="Masukan Transfer Rp"
                  {...currencyMask}
                />
              </div>
              <div className="col-lg-12">
                <Field
                  name="ac_asal"
                  component={ReanderFieldInline}
                  type="text"
                  label="A/C Asal"
                  placeholder="Masukan AC Asal"
                />
              </div>
              <div className="col-lg-12">
                <Field
                  name="ac_tujuan"
                  component={ReanderSelect}
                  options={this.props.listbank.map((list) => {
                    let data = {
                      value: list.no_ac,
                      name: list.atas_nama,
                    };
                    return data;
                  })}
                  type="text"
                  label="A/C tujuan"
                  placeholder="Masukan A/C tujuan"
                />
              </div>
            </div>
            <div className="col-lg-3 d-none">
              <Field
                name="no_bon"
                component={ReanderFieldInline}
                type="text"
                label="bon"
                placeholder="Masukan bon"
              />
            </div>
            <div className="col-lg-3 d-none">
              <Field
                name="tanggal"
                component={ReanderFieldInline}
                type="text"
                label="Tanggal"
                placeholder="Masukan Tanggal"
              />
            </div>
            <div className="col-lg-3 d-none">
              <Field
                name="kode_customer"
                component={ReanderFieldInline}
                type="text"
                label="customer"
                placeholder="Masukan customer"
              />
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
                <p className="text-red mt-1">
                  Mohon Bayar Sesuai Nominal Piutang, agar Bisa disimpan
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ModalPembayaranPiutang = reduxForm({
  form: "ModalPembayaranPiutang",
  enableReinitialize: true,
  validate: validate,
})(ModalPembayaranPiutang);
const selector = formValueSelector("ModalPembayaranPiutang");
export default connect((state) => {
  const { cash, transfer } = selector(state, "cash", "transfer");
  return {
    total_piutang: state.transaksi.total_piutang.total_pembayaran,
    total_pembayaran: parseFloat(cash || 0) + parseFloat(transfer || 0),
    listbank: state.datamaster.listbank,
    onSend: state.datamaster.onSend,
    initialValues: {
      total_piutang: state.transaksi.total_piutang.total_pembayaran,
      kode_customer: state.transaksi.total_piutang.kode_customer,
      no_bon: state.transaksi.total_piutang.no_bon,
      tanggal: state.transaksi.total_piutang.tanggal,
    },
  };
})(ModalPembayaranPiutang);
