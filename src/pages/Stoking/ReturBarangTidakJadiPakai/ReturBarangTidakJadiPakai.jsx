import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import ModalGlobal from "../../ModalGlobal.jsx";
import {
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification.jsx";
import { Panel, PanelHeader } from "../../../components/panel/panel.jsx";
import CetakNota from "../CetakNota.jsx";
import { getPermintaanTemp } from "../../../actions/stocking_action.jsx";
import { simpanLocal } from "../../../config/Helper.jsx";
import { reset } from "redux-form";
import { AxiosMasterGet, AxiosMasterPost, AxiosMasterPut } from "../../../axios.js";
import { multipleDeleteLocal } from "../../../components/notification/function.jsx";
import { onFinish, onProgress } from "../../../actions/datamaster_action.jsx";
import ModalReturBarang from "./ModalReturBarangTidakJadiPakai.jsx";
import HeadReturBarangTidakJadiPakai from "./HeadReturBarangTidakJadiPakai.jsx";


const maptostate = (state) => {
  return {
    permintaan_temp: state.stocking.permintaan_temp,
  };
};

class ReturBarang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      datakategori: [
        {
          no_acc: "8200930213",
          nama_bank: "BCA",
          atas_nama: "OCTAVIAN",
        },
      ],
    };
  }

  componentDidMount() {
    localStorage.removeItem("PermintaanBarang_temp");
    localStorage.removeItem("PermintaanBarang_temp_kirim");
    this.props.dispatch(getPermintaanTemp());
    AxiosMasterGet("retur-barang/generate/no-trx").then((res) =>
      localStorage.setItem("kode_permintaan_barang", res.data[0].no_retur)
    );
  }

  handleModal(hasil) {
    let local =
      JSON.parse(localStorage.getItem("PermintaanBarang_temp_kirim")) || [];
    let local2 =
      JSON.parse(localStorage.getItem("PermintaanBarang_temp")) || [];
    let filtered = local.findIndex(
      (list) => list.kode_barcode === hasil.kode_barcode
    );
    let filtered2 = local2.findIndex(
      (list) => list.kode_barcode === hasil.kode_barcode
    );
    if (filtered !== -1) {
      let data = {
        kode_barcode: hasil.kode_barcode,
        qty: parseInt(hasil.qty) + parseFloat(local[filtered].qty),
        kode_supplier: hasil.kode_supplier,
      };
      let dataTable = {
        kode: hasil.kode_barcode,
        nama: hasil.nama_barang,
        // merk_barang: hasil.merk,
        // kwalitas: hasil.kwalitas,
        // ukuran: hasil.ukuran,
        stock: hasil.stock,
        qty: parseInt(hasil.qty) + parseInt(local2[filtered2].qty),
      };
      let datatambah = {
        detail_barang:{
          kode: hasil.kode_barcode,
          nama: hasil.nama_barang,
          stock: hasil.stock,
          qty: parseInt(hasil.qty),
          kode_supplier: hasil.kode_supplier,
          jenis_barang: "SPAREPART",
          harga: hasil.harga_jual,
          total: hasil.harga_total
        }
      }
      local.splice(filtered, 1);
      local2.splice(filtered2, 1);
      local.push(data);
      local2.push(dataTable);
      AxiosMasterPut("daftar-service/tambah-barang/"+localStorage.getItem("no_spk"), datatambah)
      .then(()=>localStorage.setItem("PermintaanBarang_temp", JSON.stringify(local2)))
      .then(()=>localStorage.setItem(
        "PermintaanBarang_temp_kirim",
        JSON.stringify(local)
      ))
      .then(()=>NotifSucces("Berhasil"))
      .then(()=>this.props.dispatch(reset("ModalReturnSupplier")))
      .then(()=>this.props.dispatch(getPermintaanTemp()))
      .then(()=>window.location.reload())
      
    } else {
      let data = {
        kode_barcode: hasil.kode_barcode,
        qty: parseInt(hasil.qty),
        kode_supplier: hasil.kode_supplier,
      };
      let dataTable = {
        detail_barang:{
        kode: hasil.kode_barcode,
        nama: hasil.nama_barang,
        stock: hasil.stock,
        qty: parseInt(hasil.qty),
        kode_supplier: hasil.kode_supplier,
        jenis_barang: "SPAREPART",
        harga: hasil.harga_jual,
        total: hasil.harga_total
        }
      };
      AxiosMasterPut("daftar-service/tambah-barang/"+localStorage.getItem("no_spk"), dataTable)
        .then(() => this.props.dispatch(reset("ModalPermintaanBarang")))
        .then(() => this.props.dispatch(getPermintaanTemp()));
      simpanLocal("PermintaanBarang_temp", dataTable)
        .then(() => this.props.dispatch(reset("ModalPermintaanBarang")))
        .then(() => this.props.dispatch(getPermintaanTemp()));
      simpanLocal("PermintaanBarang_temp_kirim", data)
        .then(() => this.props.dispatch(reset("ModalPermintaanBarang")))
        .then(() => this.props.dispatch(getPermintaanTemp()));
    }
  }
  sendData(hasil) {
    this.props.dispatch(onProgress());
    let kirim = {
      no_permintaan: hasil.no_permintaan,
      kode_divisi: hasil.divisi || "MKN",
      kode_pegawai: hasil.pegawai,
      no_daftar_service: hasil.no_spk,
      tanggal: hasil.tanggal,
      detail_barang: JSON.parse(
        localStorage.getItem("PermintaanBarang_temp_kirim")
      ),
    };
    // INISIALISASI AUTOTABLE
    const tableRows = [];
    let table = JSON.parse(localStorage.getItem("PermintaanBarang_temp"));
    table.forEach((data, i) => {
      const rows = [
        ++i,
        data.kode_barcode,
        data.nama_barang,
        data.merk_barang,
        data.kwalitas,
        data.qty,
      ];
      tableRows.push(rows);
    });
    let columnTabel = ["NO", "BARCODE", "JENIS BARANG", "MERK", "KW", "QTY"];
    // INISIALISASI SELESAI -> PANGGIL AXIOS DAN PANGGIL PRINT SAAT AXIOS BERHASIL
    AxiosMasterPost("permintaan-barang/post-transaksi", kirim)
      .then(() => NotifSucces("Berhasil Menyimpan Data"))
      .then(() =>
        CetakNota(
          "Tanggal",
          hasil.tanggal,
          "PEGAWAI",
          hasil.pegawai,
          "NO PERMINTAAN",
          hasil.no_permintaan,
          "DIVISI",
          hasil.divisi,
          "ADMIN",
          "01-28-2021",
          "ADMIN",
          columnTabel,
          "BUKTI PERMINTAAN BARANG",
          tableRows,
          [],
          true
        )
      )
      .then(() =>
        multipleDeleteLocal([
          "PermintaanBarang_temp_kirim",
          "PermintaanBarang_temp",
          "kode_permintaan_barang",
        ])
      )
      .then(() => this.props.dispatch(reset("permintaanBarang")))
      .then(() => this.props.dispatch(getPermintaanTemp()))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        NotifError(err.response.data).then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Service</Link>
          </li>
          <li className="breadcrumb-item active">Edit Data Service</li>
        </ol>
        <h1 className="page-header">Edit Data Service </h1>
        <Panel>
          <PanelHeader>Edit Data Service</PanelHeader>
          <br />
          <div className="col-lg-12">
            <HeadReturBarangTidakJadiPakai
              onSubmit={(data) => this.sendData(data)}
              permintaan_temp={this.props.permintaan_temp}
            />
          </div>
          {/* Master Kategori */}

          <br />
          {/* End Master Kategori */}
          <ModalGlobal
            title={
              this.state.isEdit
                ? "Edit Data Permintaan Barang"
                : "Tambah Data Barang"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <ModalReturBarang
                  onSubmit={(data) => this.handleModal(data)}
                  onSend={this.props.onSend}
                  isEdit={this.state.isEdit}
                />
              </Suspense>
            }
          />

          {/* End Tambah Master Kategori  */}
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(ReturBarang);
