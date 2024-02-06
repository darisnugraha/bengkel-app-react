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
import CetakStockPerKategori from "../LaporanStockPerKategori/CetakStockPerKategori";
import HeadLaporanKartuStock from "./HeadLaporanKartuStock";

class LaporanKartuStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Laporan: [],
    };
  }
  getLaporan(hasil) {
    AxiosMasterGet("laporan/stocking/lap-saldo-barang", {
      kategori: hasil.kode_kategori,
      jenis: hasil.kode_jenis,
      kode_lokasi_shelving: hasil.kode_lokasi_shelving,
      kode_barcode: hasil.kode_barcode,
    }).then((res) => {
      if (res.data.length === 0) {
        ToastError("Data Laporan Kosong");
        return false;
      } else {
        CetakStockPerKategori(
          hasil.tanggal_awal,
          getUserData().user_name,
          getToday(),
          getUserData().user_name,
          res.data
        );
      }
    });
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Laporan</Link>
          </li>
          <li className="breadcrumb-item active">Laporan Stock Per Kategori</li>
        </ol>
        <h1 className="page-header">Laporan Stock Per Kategori </h1>
        <Panel>
          <PanelHeader>Laporan Stock Per Kategori</PanelHeader>
          <PanelBody>
            <HeadLaporanKartuStock onSubmit={(data) => this.getLaporan(data)} />
          </PanelBody>
        </Panel>
        {/* <Panel>
          <PanelBody>
            <TabelLaporanStockPerKategori />
          </PanelBody>
        </Panel> */}
      </div>
    );
  }
}

export default LaporanKartuStock;
