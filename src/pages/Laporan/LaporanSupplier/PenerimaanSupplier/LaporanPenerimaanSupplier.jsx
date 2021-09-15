import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { getToday } from "../../../../components/helpers/function";
import { ToastError } from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakPenerimaanSupplier from "./CetakPenerimaanSupplier";
import CetakPenerimaanSupplierRekap from "./CetakPenerimaanSupplierRekap";
import HeadLaporanPenerimaanSupplier from "./HeadLaporanPenerimaanSupplier";

class LaporanPenerimaanSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasilLaporan: [],
    };
  }

  handleSubmit(data) {
    AxiosMasterGet(
      "laporan/supplier/lap-terima-supplier/" +
        `${data.kode_supplier || "SEMUA"}&${data.tanggal_awal}&${
          data.tanggal_akhir
        }`
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
      .then(() =>{
        console.log(this.state.hasilLaporan);
        data.type === "DETAIL"
          ? this.state.hasilLaporan.length
            ? CetakPenerimaanSupplier(
                data.kode_supplier || "SEMUA",
                getToday(),
                "ADMIN",
                getToday(),
                "ADMIN",
                this.state.hasilLaporan
              )
            : ToastError("Data Laporan Kosong")
          : this.state.hasilLaporan.length
          ? CetakPenerimaanSupplierRekap(
              data.kode_supplier || "SEMUA",
              getToday(),
              "ADMIN",
              getToday(),
              "ADMIN",
              this.state.hasilLaporan
            )
          : ToastError("Data Laporan Kosong")}
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
            Laporan Penerimaan Supplier
          </li>
        </ol>
        <h1 className="page-header">Laporan Penerimaan Supplier </h1>
        <Panel>
          <PanelHeader>Laporan Penerimaan Supplier</PanelHeader>
          <PanelBody>
            <HeadLaporanPenerimaanSupplier
              onSubmit={(data) => this.handleSubmit(data)}
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default LaporanPenerimaanSupplier;
