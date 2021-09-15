import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { getListPembayaran } from "../../../actions/transaksi_action";
import { ReanderField } from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});

class ModalBayar extends Component {
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
          formatter: (state) => {
            return `${state}`;
          },
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
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row, rowIndex) => {
            // let dataEdit = {
            //   kode_divisi: row.kode_divisi,
            //   nama_divisi: row.nama_divisi,
            // };
            this.setState({});
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    onClick={() => {
                      let data = JSON.parse(
                        localStorage.getItem("listPembayaran_temp")
                      );
                      data.splice(rowIndex, 1);
                      localStorage.setItem(
                        "listPembayaran_temp",
                        JSON.stringify(data)
                      );
                      this.props.dispatch(getListPembayaran());
                    }}
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
                      data={this.props.listPembayaran_temp}
                      columns={this.state.columnsListBayar}
                      tambahData={true}
                      handleClick={this.props.showCC}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center col-lg-12">
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
    );
  }
}

ModalBayar = reduxForm({
  form: "ModalBayar",
  enableReinitialize: true,
})(ModalBayar);
const selector = formValueSelector("ModalBayar");
export default connect((state) => {
  localStorage.setItem("bayar_rp_rongsok", selector(state, "bayar") || 0);
  localStorage.setItem(
    "kembalian_bayar",
    (selector(state, "bayar") || 0) -
      state.transaksi.total_bayar +
      state.transaksi.sum_pembayaran
  );
  return {
    grand_total_all: state.transaksi.total_bayar,
    listPembayaran_temp: state.transaksi.listpembayaran_temp,
    sum_pembayaran: state.transaksi.sum_pembayaran,
    kembali:
      (selector(state, "bayar") || 0) -
      state.transaksi.total_bayar +
      state.transaksi.sum_pembayaran,
    bayar: selector(state, "bayar") || 0,
    onSend: state.datamaster.onSend,
  };
})(ModalBayar);
