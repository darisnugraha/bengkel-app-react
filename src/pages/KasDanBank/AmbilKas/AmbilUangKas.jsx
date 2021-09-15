import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "redux-form";
import {
  getFaktur,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action";
import { AxiosMasterPost } from "../../../axios";
import { multipleDeleteLocal } from "../../../components/notification/function";
import {
  NotifSucces,
  ToastError,
} from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import HeadAmbilUangKas from "./HeadAmbilUangKas";

class AmbilUangKas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getFaktur());
  }

  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      no_ref: this.props.noFaktur,
      tanggal: hasil.tanggal,
      jumlah_rp: hasil.jumlah,
      kategori: hasil.kategori,
      keterangan: hasil.keterangan,
    };
    AxiosMasterPost("keuangan/ambil-uang-cash", data).then(() =>
      NotifSucces("Ambil Uang Berhasil")
        .then(() => this.props.dispatch(reset("HeadAmbilUangKas")))
        .then(() => multipleDeleteLocal(["noFaktur"]))
        .then(() => this.props.dispatch(getFaktur()))
        .then(() => this.props.dispatch(onFinish()))
        .catch((err) =>
          ToastError(
            `Gagal Tambah Uang, Error : ${err.response.data}`
          ).then(() => this.props.dispatch(onFinish()))
        )
    );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi Kas</Link>
          </li>
          <li className="breadcrumb-item active">Ambil Uang Kas</li>
        </ol>
        <h1 className="page-header">Ambil Uang Kas </h1>
        <Panel>
          <PanelHeader>Ambil Uang Kas</PanelHeader>
          <PanelBody>
            <HeadAmbilUangKas onSubmit={(data) => this.handleSubmit(data)} />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    noFaktur: state.datamaster.noFaktur,
  };
})(AmbilUangKas);
