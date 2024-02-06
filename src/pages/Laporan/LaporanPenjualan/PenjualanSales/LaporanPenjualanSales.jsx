import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import HeadLaporanPenjualanSales from "./HeadLaporanPenjualanSales";
import CetakPenjualanSales from "./CetakPenjualanSales";
import { ToastError } from "../../../../components/notification/notification";

class LaporanPenjualanSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }
  getLaporan(hasil) {
    AxiosMasterGet(
      "laporan/penjualan/lap-penjualan-sales/" +
      `${hasil.tanggal_awal}&${hasil.tanggal_akhir}&${hasil.kode_sales}`
    )
      .then((res) => {
        if (res.data.lenght === 0) {
          ToastError("Data Laporan Kosong");
          return false;
        } else {
          this.setState({
            listLaporan: res.data,
          });
        }
      })
      .then(() =>
        this.state.listLaporan.length
          ? CetakPenjualanSales(
            hasil.tanggal_awal,
            hasil.tanggal_akhir,
            hasil.kode_sales,
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
          <li className="breadcrumb-item active">Laporan Penjualan Sales</li>
        </ol>
        <h1 className="page-header">Laporan Penjualan Sales </h1>
        <Panel>
          <PanelHeader>Laporan Penjualan Sales</PanelHeader>
          <PanelBody>
            <HeadLaporanPenjualanSales
              onSubmit={(data) => this.getLaporan(data)}
            />
          </PanelBody>
        </Panel>
        {/* <Panel>
          <PanelBody>
            <TabelLaporanPenjualanSales/>
          </PanelBody>
        </Panel> */}
      </div>
    );
  }
}

export default LaporanPenjualanSales;
