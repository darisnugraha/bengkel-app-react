import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { ToastError } from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakService from "./CetakService";
import HeadLaporanService from "./HeadLaporanService";
import TabeLaporanService from "./TabelLaporanService";

class LaporanService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }
  getLaporan(hasil) {
    AxiosMasterGet(
      `laporan/service/lap-service/${hasil.tanggal_awal}&${
        hasil.tanggal_akhir
      }&${hasil.kode_jenis || "SEMUA"}`
    )
      .then((res) => {
        if (res.data.length === 0) {
          ToastError("Data Laporan Kosong");
          return false;
        } else {
          this.setState({
            listLaporan: res && res.data,
          });
        }
      })
      .then(() =>
        this.state.listLaporan.length
          ? CetakService(
              hasil.tanggal_awal,
              hasil.kode_jenis,
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
          <li className="breadcrumb-item active">Laporan Service</li>
        </ol>
        <h1 className="page-header">Laporan Service </h1>
        <Panel>
          <PanelHeader>Laporan Service</PanelHeader>
          <PanelBody>
            <HeadLaporanService onSubmit={(data) => this.getLaporan(data)} />
          </PanelBody>
        </Panel>
        {/* <Panel>
          <PanelBody>
            <TabeLaporanService/>
          </PanelBody>
        </Panel> */}
      </div>
    );
  }
}

export default LaporanService;
