import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { getToday } from "../../../../components/notification/function";
import {
  NotifError,
  ToastError,
} from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakPembayaranSupplier from "./CetakPembayaranSupplier";
import HeadLaporanPembayaranSupplier from "./HeadLaporanPembayaranSupplier";

class LaporanPembayaranSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasilLaporan: [],
    };
  }
  handleSubmit(data) {
    AxiosMasterGet(
      "laporan/supplier/lap-bayar-hutang-supplier/" +
        `${data.kode_supplier}&${data.tanggal_awal}&${data.tanggal_akhir}`
    )
      .then((res) => {
        if (res.data.lenght === 0) {
          ToastError("Data Laporan Kosong");
          return false;
        } else {
          this.setState({
            hasilLaporan: res.data,
          });
        }
      })
      .then(() =>
        this.state.hasilLaporan.length
          ? CetakPembayaranSupplier(
              data.tanggal_awal,
              data.tanggal_akhir,
              "ADMIN",
              getToday(),
              "ADMIN",
              this.state.hasilLaporan
            )
          : NotifError("Data Kosong").then(() => {
              return false;
            })
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
            Laporan Pembayaran Supplier
          </li>
        </ol>
        <h1 className="page-header">Laporan Pembayaran Supplier </h1>
        <Panel>
          <PanelHeader>Laporan Pembayaran Supplier</PanelHeader>
          <PanelBody>
            <HeadLaporanPembayaranSupplier
              onSubmit={(data) => this.handleSubmit(data)}
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default LaporanPembayaranSupplier;
