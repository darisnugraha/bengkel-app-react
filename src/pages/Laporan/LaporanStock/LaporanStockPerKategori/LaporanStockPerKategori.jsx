import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { getToday } from "../../../../components/notification/function";
import { getUserData } from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakKartuStock from "../LaporanKartuStock/CetakKartuStock";
import HeadLaporanStockPerKategori from "./HeadLaporanStockPerKategori";

class LaporanStockPerKategori extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }

  getLaporan(hasil) {
    let brg = hasil.kode_barcode || "ALL";
    localStorage.setItem("kode_barcode", brg);
    localStorage.setItem("nama_barang", hasil.nama_barang);
    AxiosMasterGet(`laporan/stocking/lap-kartu-barang`, {
      tanggal_awal: hasil.tanggal_awal,
      tanggal_akhir: hasil.tanggal_akhir,
      kode_barcode: brg,
    })
      .then((res) => {
        // if (res.data.length === 0) {
        //   ToastError("Data Laporan Kosong");
        //   return false;
        // } else {
        //   let data = res.data[0].detail.sort((a,b)=>{
        //     var p1 = a.jam.split(':')
        //     var p2 = b.jam.split(':')

        //     if(p1 < p2)return -1
        //       return 1

        //   });
        //   console.log(data);
        //   this.setState({
        //     listLaporan: [{...res.data[0], detail: data}],
        //   });
        //   console.log(this.state.listLaporan);
        // }
        this.setState({
          listLaporan: res.data,
        });
      })
      .then(() =>
        CetakKartuStock(
          hasil.tanggal_awal,
          hasil.tanggal_akhir,
          getUserData().user_name,
          getToday(),
          getUserData().user_name,
          this.state.listLaporan
        )
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Laporan</Link>
          </li>
          <li className="breadcrumb-item active">Laporan Kartu Stock</li>
        </ol>
        <h1 className="page-header">Laporan Kartu Stock </h1>
        <Panel>
          <PanelHeader>Laporan Kartu Stock</PanelHeader>
          <PanelBody>
            <HeadLaporanStockPerKategori
              onSubmit={(data) => this.getLaporan(data)}
            />
          </PanelBody>
        </Panel>
        {/* <Panel>
          <PanelBody>
            <TabelLaporanKartuStock/>
          </PanelBody>
        </Panel> */}
      </div>
    );
  }
}

export default LaporanStockPerKategori;
