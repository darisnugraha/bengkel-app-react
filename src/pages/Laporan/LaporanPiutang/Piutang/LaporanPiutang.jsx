import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { ToastError } from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakLaporanPiutang from "./CetakPiutang";
import HeadLaporanPiutang from "./HeadLaporanPiutang";

class LaporanPiutang extends Component {
  constructor(props) {
    super(props);
    this.state = {listLaporan:[]};
  }

  getLaporan() {
    AxiosMasterGet("laporan/piutang/saldo-piutang-global")
      .then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          ToastError("Data Laporan Kosong");
          return false;
        }
        this.setState({
          listLaporan: res.data,
        });
        console.log(res.data);
      })
      .then(() =>
        this.state.listLaporan.length
          ? CetakLaporanPiutang(this.state.listLaporan)
          : ToastError("Data Laporan Kosong")
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Laporan</Link>
          </li>
          <li className="breadcrumb-item active">Laporan Piutang</li>
        </ol>
        <h1 className="page-header">Laporan Piutang </h1>
        <Panel>
          <PanelHeader>Laporan Piutang</PanelHeader>
          <PanelBody>
            <HeadLaporanPiutang onSubmit={(data) => this.getLaporan(data)} />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default LaporanPiutang;
