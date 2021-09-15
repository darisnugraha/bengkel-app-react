import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { getToday } from "../../../../components/notification/function";
import { ToastError } from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakReturnSupplier from "./CetakReturnSupplier";
import CetakReturnSupplierRekap from "./CetakReturnSupplierRekap";
import HeadLaporanReturnSupplier from "./HeadLaporanReturnSupplier";

class LaporanReturnSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasilLaporan: [],
    };
  }

  handleSubmit(data) {
    AxiosMasterGet(
      "laporan/supplier/lap-retur-supplier/" +
        `${data.kode_supplier || "SEMUA"}&${data.tanggal_awal}&${
          data.tanggal_akhir
        }`
    )
      .then((res) => {
        if (res.data.length === 0) {
          ToastError("Data Laporan Kosong");
          return false;
        } else {
          this.setState({
            hasilLaporan: res.data,
          });
        }
      })
      .then(() =>
        data.type === "DETAIL"
          ? this.state.hasilLaporan.length
            ? CetakReturnSupplier(
                data.kode_supplier || "SEMUA",
                getToday(),
                "ADMIN",
                getToday(),
                "ADMIN",
                this.state.hasilLaporan
              )
            : ToastError("Data Laporan Kosong")
          : this.state.hasilLaporan.length
          ? CetakReturnSupplierRekap(
              data.kode_supplier || "SEMUA",
              getToday(),
              "ADMIN",
              getToday(),
              "ADMIN",
              this.state.hasilLaporan
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
          <li className="breadcrumb-item active">Laporan Return Supplier</li>
        </ol>
        <h1 className="page-header">Laporan Return Supplier </h1>
        <Panel>
          <PanelHeader>Laporan Return Supplier</PanelHeader>
          <PanelBody>
            <HeadLaporanReturnSupplier
              onSubmit={(data) => this.handleSubmit(data)}
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default LaporanReturnSupplier;
