import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import HeadLaporanKeuanganBank from "./HeadLaporanKeuanganBank";
import CetakKeuanganBank from "./CetakKeuanganBank";
import { ToastError } from "../../../../components/notification/notification";
import { onFinish, onProgress } from "../../../../actions/datamaster_action";
import { connect } from "react-redux";

class LaporanKeuanganBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }

  getLaporan(hasil) {
    this.props.dispatch(onProgress());
    AxiosMasterGet(
      "laporan/keuangan/lap-bank/" +
        `${hasil.tanggal_awal}&${hasil.tanggal_akhir}&${hasil.no_ac}`
    )
      .then((res) => {
        if (res.data.lenght === 0) {
          ToastError("Data Laporan Kosong");
          return false;
        } else {
          this.setState({
            listLaporan: res && res.data,
          });
        }
      })
      .then(() => this.props.dispatch(onFinish()))
      .then(() =>
        this.state.listLaporan.length
          ? CetakKeuanganBank(
              hasil.tanggal_awal,
              hasil.tanggal_akhir,
              this.state.listLaporan || []
            )
          : ToastError("Data Laporan Kosong")
      )
      .catch((err) => ToastError("Error Get Data"))
      .then(() => this.props.dispatch(onFinish()));
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Laporan</Link>
          </li>
          <li className="breadcrumb-item active">Laporan Keuangan Bank</li>
        </ol>
        <h1 className="page-header">Laporan Keuangan Bank </h1>
        <Panel>
          <PanelHeader>Laporan Keuangan Bank</PanelHeader>
          <PanelBody>
            <HeadLaporanKeuanganBank
              onSubmit={(data) => this.getLaporan(data)}
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect()(LaporanKeuanganBank);
