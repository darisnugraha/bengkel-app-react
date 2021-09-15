import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { ToastError } from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakPembayaranPiutang from "./CetakPembayaranCustomer";
import HeadLaporanPembayaranCustomer from "./HeadLaporanPembayaranCustomer";

class LaporanPembayaranCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }
  getLaporan(hasil) {
    AxiosMasterGet(
      "laporan/bayar-piutang-customer/lap-pembayaran-piutang/" +
        `${hasil.tanggal_awal}&${hasil.tanggal_akhir}&${hasil.kode_customer || "SEMUA"}`
    )
      .then((res) => {
        console.log(res.data);
        if (res.data.lenght === 0) {
          ToastError("data Kosong");
          return false;
        } else {
          this.setState({
            listLaporan: res.data,
          });
        }
      })
      .then(() =>
        this.state.listLaporan.length
          ? CetakPembayaranPiutang(hasil.tanggal_awal,hasil.tanggal_akhir,this.state.listLaporan)
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
          <li className="breadcrumb-item active">Laporan Pembayaran Piutang</li>
        </ol>
        <h1 className="page-header">Laporan Pembayaran Piutang </h1>
        <Panel>
          <PanelHeader>Laporan Pembayaran Piutang</PanelHeader>
          <PanelBody>
            <HeadLaporanPembayaranCustomer
              onSubmit={(data) => this.getLaporan(data)}
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default LaporanPembayaranCustomer;
