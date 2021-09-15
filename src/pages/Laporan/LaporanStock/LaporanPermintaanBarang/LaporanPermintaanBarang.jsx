import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { getToday } from "../../../../components/notification/function";
import {
  getUserData,
  ToastError,
} from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakPermintaanBarang from "./CetakPermintaanBarang";
import HeadLaporanPermintaanBarang from "./HeadLaporanPermintaanBarang";
import TabelLaporanPermintaanBarang from "./TabelLaporanPermintaanBarang";

class LaporanPermintaanBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }
  getLaporan(hasil) {
    AxiosMasterGet(
      "laporan/stocking/lap-permintaan-barang/" +
        `${hasil.divisi}&${hasil.tanggal_awal}&${hasil.tanggal_akhir}`
    )
      .then((res) => {
        this.setState({
          listLaporan: res.data,
        });
      })
      .then(() =>
        this.state.listLaporan.length
          ? CetakPermintaanBarang(
              hasil.tanggal_awal,
              hasil.tanggal_akhir,
              getUserData().user_name,
              getToday(),
              getUserData().user_name,
              this.state.listLaporan
            )
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
          <li className="breadcrumb-item active">Laporan Permintaan Barang</li>
        </ol>
        <h1 className="page-header">Laporan Permintaan Barang </h1>
        <Panel>
          <PanelHeader>Laporan Permintaan Barang</PanelHeader>
          <PanelBody>
            <HeadLaporanPermintaanBarang
              onSubmit={(data) => this.getLaporan(data)}
            />
          </PanelBody>
        </Panel>
        {/* <Panel>
          <PanelBody>
            <TabelLaporanPermintaanBarang/>
          </PanelBody>
        </Panel> */}
      </div>
    );
  }
}

export default LaporanPermintaanBarang;
