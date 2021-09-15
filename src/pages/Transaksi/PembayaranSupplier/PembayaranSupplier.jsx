import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import HeadPembayaranSupplier from "./HeadPembayaranSupplier.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import ModalPembayaranSupplier from "./ModalPembayaranSupplier.jsx";
import CetakNota from "../../Stoking/CetakNota.jsx";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios.js";
import { getToday } from "../../../components/helpers/function.jsx";
import {
  NotifError,
  NotifSucces,
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification.jsx";
import {
  getFaktur,
  hideModal,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action.jsx";
import { reset } from "redux-form";
import { multipleDeleteLocal } from "../../../components/notification/function.jsx";

const maptostate = (state) => {
  return {
    kunci_temp: state.stocking.kunci_temp,
    noFaktur: state.datamaster.noFaktur,
  };
};

class PembayaranSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      listTransaksi: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(getFaktur());
  }
  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      no_bayar_supplier: localStorage.getItem("no_bayar_supplier"),
      tanggal: hasil.tanggal_terima,
      no_bon: hasil.no_bon,
      kode_supplier: hasil.kode_supplier,
      total_pembayaran: hasil.total || 0,
      no_ref: this.props.noFaktur,
      no_ref_cash: this.props.noFaktur,
      cash_rp: hasil.cash || 0,
      transfer_rp: hasil.transfer || 0,
      no_ac_asal: hasil.no_ac_asal ? hasil.no_ac_asal.toString() : "-",
      no_ac_tujuan: hasil.no_ac_tujuan ? hasil.no_ac_tujuan.toString() : "-",
      retur_rp: hasil.retur_supplier || 0,
      detail_bayar_retur: JSON.parse(localStorage.getItem("list_return")) || [],
    };
    console.log(JSON.stringify(data));
    // return false;
    AxiosMasterPost("bayar-hutang-supplier/post-transaksi", data)
      .then(() =>
        CetakNota(
          "Tanggal",
          getToday(),
          "Nomor Bon",
          localStorage.getItem("no_bayar_supplier"),
          "SUPPLIER",
          hasil.kode_supplier,
          "",
          "",
          "ADMIN",
          getToday(),
          "ADMIN",
          ["NO", "JENIS BAYAR", "TOTAL"],
          "BUKTI PEMBAYARAN HUTANG SUPPLIER",
          [
            ["1", "CASH", parseFloat(hasil.cash || 0).toLocaleString("id-ID")],
            [
              "2",
              "TRANSFER",
              parseFloat(hasil.transfer || 0).toLocaleString("id-ID"),
            ],
            [
              "3",
              "RETURN",
              parseFloat(hasil.retur_supplier || 0).toLocaleString("id-ID"),
            ],
          ],
          false
        )
      )
      .then(() => NotifSucces("Berhasil"))
      .then(() =>
        multipleDeleteLocal(["tanggal", "no_bayar_supplier", "noFaktur"])
      )
      .then(() => this.props.dispatch(reset("HeadPembayaranSupplier")))
      .then(() => this.props.dispatch(reset("ModalPembayaranSupplier")))
      .then(() => this.props.dispatch(getFaktur()))
      .then(() => this.props.dispatch(hideModal()))
      .then(() => this.props.dispatch(onFinish()))
      .then(() => window.location.reload())
      .catch((err) =>
        NotifError(err.response.data).then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }

  handleCari(data) {
    AxiosMasterGet(
      "bayar-hutang-supplier/getDataHutangSupplier/" +
        `${data.kode_supplier || "-"}&${data.tanggal || getToday}&${
          data.no_bon || "-"
        }`
    )
      .then((res) =>{
        if (res.data.length === 0) {
          ToastError('Data Kosong')
        }else{
          ToastSucces('Berhasil Get Data')
          console.log("tes",res.data);
        this.setState({
          listTransaksi: res.data,
        })
      }
    })
      .catch((err) =>
        ToastError(`Get Data Gagal, Detail : ${err.response.data}`)
      );
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Pembayaran Supplier</li>
        </ol>
        <h1 className="page-header">Pembayaran Supplier </h1>
        <Panel>
          <PanelHeader>Pembayaran Supplier</PanelHeader>
          <PanelBody>
            <br />
            <HeadPembayaranSupplier
              onSubmit={(data) => this.handleCari(data)}
              // listMerk={this.state.listMerk}
              bayar={true}
              listTransaksi={this.state.listTransaksi}
            />
            {/* End Tambah Master Kategori  */}
          </PanelBody>
        </Panel>
        <ModalGlobal
          content={
            <ModalPembayaranSupplier
              onSubmit={(data) => this.handleSubmit(data)}
            />
          }
          title="Pembayaran Supplier"
        />
      </div>
    );
  }
}

export default connect(maptostate, null)(PembayaranSupplier);
