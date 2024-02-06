import React, { Suspense } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";
import ModalGlobal from "../../ModalGlobal.jsx";
import {
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification.jsx";
import { Panel, PanelHeader } from "../../../components/panel/panel.jsx";
import { getPermintaanTemp } from "../../../actions/stocking_action.jsx";

import { reset } from "redux-form";
import { AxiosMasterPost } from "../../../axios.js";
import {
  hideModal,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action.jsx";
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
  }

  handleModal(hasil) {
    let local =
      JSON.parse(localStorage.getItem("PermintaanBarang_temp_kirim")) || [];
    let local2 =
      JSON.parse(localStorage.getItem("PermintaanBarang_temp")) || [];
    let data = {
      nama_barang: hasil.nama_barang,
      harga_satuan: Number(hasil.harga_jual),
      harga_total: Number(hasil.total_harga),
      kode_lokasi_shelving: hasil.kode_lokasi_shelving,
      keterangan: hasil.keterangan,
      jenis_barang: "SPAREPART",
      status_close: "OPEN",
      kode_barcode: hasil.kode_barcode,
      qty: parseInt(hasil.qty),
    };
    let dataTable = {
      kode: hasil.kode_barcode,
      nama: hasil.nama_barang,
      stock: hasil.stock,
      qty: parseInt(hasil.qty),
      harga_satuan: Number(hasil.harga_jual),
      harga_total: Number(hasil.total_harga),
      kode_lokasi_shelving: hasil.kode_lokasi_shelving,
      keterangan: hasil.keterangan,
      jenis_barang: "SPAREPART",
      status_close: "OPEN",
    };
    local.push(data);
    local2.push(dataTable);
    localStorage.setItem("PermintaanBarang_temp", JSON.stringify(local2));
    localStorage.setItem("PermintaanBarang_temp_kirim", JSON.stringify(local));
    this.props.dispatch(reset("ModalPermintaanBarang"));
    this.props.dispatch(hideModal());
    this.props.dispatch(getPermintaanTemp());
    NotifSucces(
      "Barang Berhasil Ditambahkan Ke tabel, Silahkan Tekan Tombol Save Untuk Menyimpan Ke Nomor Daftar"
    );
  }
  sendData(hasil) {
    this.props.dispatch(onProgress());
    let kirim = {
      no_edit_service: hasil.no_edit_service,
      no_daftar_service: hasil.no_spk,
      detail_barang: JSON.parse(
        localStorage.getItem("PermintaanBarang_temp")
      ).map(({ kode, nama, stock, no_pengeluaran, ...rest }, index) => {
        return {
          no_urut: index + 1,
          kode_barcode: kode,
          nama_barang: nama,
          ...rest,
        };
      }),
    };
    AxiosMasterPost("edit-service/add", kirim)
      .then(() => NotifSucces("Berhasil Menyimpan Data"))
      .then(() => {
        this.props.dispatch(reset("permintaanBarang"));
        this.props.dispatch(getPermintaanTemp());
        this.props.dispatch(onFinish());
      })
      .catch((err) =>
        NotifError(err.response.data).then(() => {
          this.props.dispatch(onFinish());
        })
      );
  }

  handleSave(data) {}
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
              handleSave={(data) => this.handleSave(data)}
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
