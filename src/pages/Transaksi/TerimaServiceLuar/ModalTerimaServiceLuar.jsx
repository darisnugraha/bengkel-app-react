import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { ReanderField } from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});

class ModalTerimaServiceLuar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsListBayar: [
        {
          dataField: "jenis_trx",
          text: "Jenis Bayar",
        },
        {
          dataField: "no_card",
          text: "Bank",
        },
        {
          dataField: "nama_pemilik",
          text: "Nama Pemilik",
        },
        {
          dataField: "fee_rp",
          text: "Fee Card",
        },
        {
          dataField: "bayar_rp",
          text: "Bayar",
          formatter: (data) =>
            `Rp. ${parseFloat(data).toLocaleString("id-ID")}`,
        },
      ],
    };
  }
  componentDidMount() {
    this.props.change("grand_total_all", this.props.total);
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
                  onClick={this.props.setBack}
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
                  <h3>Margin</h3>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-3"></div>
                      <div className="col-lg-6 text-center">
                        <Field
                          name="margin"
                          component={ReanderField}
                          type="telp"
                          placeholder="Masukan Bayar"
                          className=" form-control-lg"
                          onChange={(e) => this.setBayar(e)}
                          {...currencyMask}
                        />
                      </div>
                    </div>
                  </div>
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
                        />
                      </div>
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
                      data={this.props.listPembayaran_temp || []}
                      columns={this.state.columnsListBayar}
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

ModalTerimaServiceLuar = reduxForm({
  form: "ModalTerimaServiceLuar",
  enableReinitialize: true,
})(ModalTerimaServiceLuar);
const selector = formValueSelector("ModalTerimaServiceLuar");
export default connect((state) => {
  localStorage.setItem("bayar_rp_rongsok", selector(state, "bayar") || 0);
  return {
    grand_total_all:
      state.transaksi.total_bayar + (selector(state, "margin") || 0),
    listPembayaran_temp: state.transaksi.listpembayaran_temp,
    sum_pembayaran: state.transaksi.sum_pembayaran,
    total_bayar: state.transaksi.total_bayar,
    kembali:
      (selector(state, "bayar") || 0) -
      state.transaksi.total_bayar -
      state.transaksi.sum_pembayaran -
      (selector(state, "margin") || 0),
    onSend: state.datamaster.onSend,
  };
})(ModalTerimaServiceLuar);
