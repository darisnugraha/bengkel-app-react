import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import HeadTerimaServiceLuar from "./HeadTerimaServiceLuar.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import ModalTerimaServiceLuar from "./ModalTerimaServiceLuar.jsx";
import {
  getFaktur,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios.js";
import {
  NotifSucces,
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification.jsx";
import ModalCC from "../PembayaranService/ModalCC.jsx";
import {
  getToday,
  multipleDeleteLocal,
} from "../../../components/notification/function.jsx";
import {
  getListKirimServiceLuar,
  getListPembayaran,
} from "../../../actions/transaksi_action.jsx";
import { reset } from "redux-form";

const maptostate = (state) => {
  return {
    kunci_temp: state.stocking.kunci_temp,
    listkirimserviceluar: state.transaksi.listkirimserviceluar,
    noFaktur: state.datamaster.noFaktur,
    grand_total: state.transaksi.grand_total,
    no_bon_kirim: state.transaksi.no_bon_kirim,
  };
};

class ServiceLuar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      bayar: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getFaktur());
    this.props.dispatch(getListPembayaran());
    AxiosMasterGet("terima-service-luar/generate/no-trx").then((res) =>
      localStorage.setItem(
        "terima_service_luar_nomor",
        res && res.data[0].no_service_terima
      )
    );
    this.props.dispatch(getFaktur());
  }
  handleSubmit(data) {
    console.log(data);
  }
  showCC() {
    this.props.dispatch(showModal());
  }
  showBayar(data) {
    this.setState({
      bayar: true,
      grand_total: data,
    });
  }
  setBack() {
    this.setState({
      bayar: false,
    });
  }
  handleSimpanCC(hasil) {
    let data = {
      no_ref: this.props.noFaktur,
      no_card: `${hasil.no_card}`,
      bayar_rp: hasil.grand_total,
      fee_rp: hasil.fee_card,
      no_ac: `${hasil.bank}`,
      valid_until: hasil.expiry,
      nama_pemilik: hasil.name,
      no_ktp: hasil.no_ktp,
      alamat_ktp: hasil.alamat_ktp,
      kota_ktp: hasil.kota,
      telepon_ktp: hasil.handphone,
      jenis_trx: hasil.jenis_trx || "DEBIT",
    };
    let array = JSON.parse(localStorage.getItem("listPembayaran_temp")) || [];
    array.push(data);
    localStorage.setItem("listPembayaran_temp", JSON.stringify(array));
    ToastSucces("Berhasil Menambahkan Data");
    this.props.dispatch(getListPembayaran());
    localStorage.removeItem("noFaktur");
    this.props.dispatch(getFaktur());
  }
  sendData(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      no_service_terima: localStorage.getItem("terima_service_luar_nomor"),
      tanggal: getToday(),
      no_bon: this.props.no_bon_kirim,
      margin_rp: hasil.margin,
      total_bayar: this.props.grand_total,
      cash_rp: hasil.bayar,
      no_ref_cash: this.props.noFaktur,
      status_masuk_piutang: hasil.piutang || false,
      detail_non_tunai:
        localStorage.getItem("listPembayaran_temp") === "[]"
          ? [
              {
                no_ref: "-",
                no_ac: "-",
                bayar_rp: 0,
                fee_rp: 0,
                no_card: "-",
                valid_until: "-",
                nama_pemilik: "-",
                no_ktp: "-",
                alamat_ktp: "-",
                kota_ktp: "-",
                telepon_ktp: "-",
                jenis_trx: "-",
              },
            ]
          : localStorage.getItem("listPembayaran_temp") !== null
          ? JSON.parse(localStorage.getItem("listPembayaran_temp"))
          : [
              {
                no_ref: "-",
                no_ac: "-",
                bayar_rp: 0,
                fee_rp: 0,
                no_card: "-",
                valid_until: "-",
                nama_pemilik: "-",
                no_ktp: "-",
                alamat_ktp: "-",
                kota_ktp: "-",
                telepon_ktp: "-",
                jenis_trx: "-",
              },
            ],
    };
    console.log(JSON.stringify(data));
    // return false;
    AxiosMasterPost("terima-service-luar/post-transaksi", data)
      .then(() => NotifSucces("Terima Service Berhasil"))
      .then(() =>
        multipleDeleteLocal([
          "noFaktur",
          "listPembayaran_temp",
          "terima_service_luar_nomor",
        ])
      )
      .then(() => this.props.dispatch(getListKirimServiceLuar()))
      .then(() => this.props.dispatch(reset("HeadServiceLuar")))
      .then(() => this.props.dispatch(getFaktur()))
      .then(() => this.props.dispatch(onFinish()))
      .then(() => this.setBack())
      .then(() => this.props.dispatch(reset("ModalTerimaServiceLuar")))
      .catch((err) =>
        ToastError(
          `Terima Service Gagal, Error : ${err.response.data}`
        ).then(() => this.props.dispatch(onFinish()))
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Terima Service Luar</li>
        </ol>
        <h1 className="page-header">Terima Service Luar </h1>
        <div className="row">
          <div className="col-lg-12">
            <Panel>
              <PanelHeader>Terima Service Luar</PanelHeader>
              <PanelBody>
                <br />
                <div className="col-lg-12">
                  {!this.state.bayar ? (
                    <HeadTerimaServiceLuar showBayar={() => this.showBayar()} />
                  ) : (
                    <ModalTerimaServiceLuar
                      showCC={() => this.showCC()}
                      setBack={() => this.setBack()}
                      onSubmit={(data) => this.sendData(data)}
                    />
                  )}
                </div>
                <br />
                <div className="col-lg-12"></div>
                {/* End Tambah Master Kategori  */}
              </PanelBody>
            </Panel>
            <ModalGlobal
              title="Simpan Data Harga"
              content={
                <ModalCC onSubmit={(data) => this.handleSimpanCC(data)} />
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(maptostate, null)(ServiceLuar);
