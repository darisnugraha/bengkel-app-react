import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { ToastError } from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakPenjualanSparepart from "./CetakPenjualanSparepart";
import HeadLaporanPenjualanSparepart from "./HeadLaporanPenjualanSparepart";

class LaporanPenjualanSparepart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }
  getLaporan(hasil) {
    AxiosMasterGet(
      "laporan/penjualan/lap-penjualan-sparepart/" +
      `${hasil.tanggal_awal}&${hasil.tanggal_akhir}&${hasil.kriteria_sparepart || "SEMUA"}`
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
      .then(() =>
        this.state.listLaporan.length
          ? CetakPenjualanSparepart(
            hasil.tanggal_awal,
            hasil.tanggal_akhir,
            hasil.kriteria_sparepart,
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
          <li className="breadcrumb-item active">
            Laporan Penjualan Sparepart
          </li>
        </ol>
        <h1 className="page-header">Laporan Penjualan Sparepart </h1>
        <Panel>
          <PanelHeader>Laporan Penjualan Sparepart</PanelHeader>
          <PanelBody>
            <HeadLaporanPenjualanSparepart
              onSubmit={(data) => this.getLaporan(data)}
            />
          </PanelBody>
        </Panel>
        {/* <Panel>
          <PanelBody>
            <TabelLaporanPenjualanSparepart />
          </PanelBody>
        </Panel> */}
      </div>
    );
  }
}

export default LaporanPenjualanSparepart;
