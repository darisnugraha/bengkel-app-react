import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { getToday } from "../../../../components/notification/function";
import {
  ToastError,
  ToastSucces,
} from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakKartuHutangSupplier from "./CetakKartuHutangSupplier";
import HeadLaporanKartuHutangSupplier from "./HeadLaporanKartuHutangSupplier";

class LaporanKartuHutangSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }
  handleSubmit(data) {
    AxiosMasterGet(
      "laporan/supplier/lap-card-hutang-supplier/" +
        `${data.kode_supplier}&${data.tanggal_awal}&${data.tanggal_akhir}`
    )
      .then((res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          ToastError("Data Laporan Kosong");
          return false;
        } else {
          ToastSucces("Berhasil Melihat Data");
          this.setState({
            listLaporan: res.data,
          });
        }
      }).then(() =>
      this.state.listLaporan.length
        ? CetakKartuHutangSupplier(
            getToday(),
            data.kode_supplier,
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
          <li className="breadcrumb-item active">Laporan Kartu Hutang</li>
        </ol>
        <h1 className="page-header">Laporan Kartu Hutang </h1>
        <Panel>
          <PanelHeader>Laporan Kartu Hutang</PanelHeader>
          <PanelBody>
            <HeadLaporanKartuHutangSupplier
              onSubmit={(data) => this.handleSubmit(data)}
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default LaporanKartuHutangSupplier;
