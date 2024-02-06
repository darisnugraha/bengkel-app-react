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
import HeadPermintaanBarang from "./HeadPermintaanBarang.jsx";
import CetakNota from "../CetakNota.jsx";
import {
  getNoPermintaanBarang,
  getPermintaanTemp,
} from "../../../actions/stocking_action.jsx";
import { simpanLocal } from "../../../config/Helper.jsx";
import { reset } from "redux-form";
import { AxiosMasterPost } from "../../../axios.js";
import { multipleDeleteLocal } from "../../../components/notification/function.jsx";
import {
  getSelfing,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action.jsx";

const ModalPermintaanBarang = lazy(() => import("./ModalPermintaanBarang.jsx"));

const maptostate = (state) => {
  return {
    permintaan_temp: state.stocking.permintaan_temp,
  };
};

class PermintaanBarang extends React.Component {
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
    this.props.dispatch(getSelfing());
    localStorage.removeItem("PermintaanBarang_temp");
    localStorage.removeItem("PermintaanBarang_temp_kirim");
    this.props.dispatch(getPermintaanTemp());
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
        kode_barcode: hasil.kode_barcode,
        nama_barang: hasil.nama_barang,
        ukuran: hasil.ukuran,
        kode_supplier: hasil.kode_supplier,
        stock: hasil.stock,
        qty: parseInt(hasil.qty) + parseInt(local2[filtered2].qty),
      };
      local.splice(filtered, 1);
      local2.splice(filtered2, 1);
      local.push(data);
      local2.push(dataTable);
      localStorage.setItem("PermintaanBarang_temp", JSON.stringify(local2));
      localStorage.setItem(
        "PermintaanBarang_temp_kirim",
        JSON.stringify(local)
      );
      NotifSucces("Berhasil");
      this.props.dispatch(reset("ModalReturnSupplier"));
      this.props.dispatch(getPermintaanTemp());
    } else {
      let data = {
        kode_barcode: hasil.kode_barcode,
        qty: parseInt(hasil.qty),
        kode_supplier: hasil.kode_supplier,
      };
      let dataTable = {
        kode_barcode: hasil.kode_barcode,
        nama_barang: hasil.nama_barang,
        kode_supplier: hasil.kode_supplier,
        ukuran: hasil.ukuran,
        stock: hasil.stock,
        qty: hasil.qty,
      };
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
      kode_lokasi_shelving: hasil.kode_lokasi_shelving,
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
        data.kode_supplier,
        data.qty,
      ];
      tableRows.push(rows);
    });
    let columnTabel = ["NO", "BARCODE", "JENIS BARANG", "KODE SUPPLIER", "QTY"];
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
          hasil.divisi || "MKN",
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
        ])
      )
      .then(() => this.props.dispatch(reset("permintaanBarang")))
      .then(() => this.props.dispatch(getPermintaanTemp()))
      .then(() => this.props.dispatch(getNoPermintaanBarang()))
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
          <li className="breadcrumb-item active">Permintaan Barang</li>
        </ol>
        <h1 className="page-header">Permintaan Barang </h1>
        <Panel>
          <PanelHeader>Permintaan Barang</PanelHeader>
          <br />
          <div className="col-lg-12">
            <HeadPermintaanBarang
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
                <ModalPermintaanBarang
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

export default connect(maptostate, null)(PermintaanBarang);
