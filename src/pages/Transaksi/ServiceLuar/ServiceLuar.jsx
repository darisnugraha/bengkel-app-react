import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";

import HeadServiceLuar from "./HeadServiceLuar.jsx";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios.js";
import {
  NotifSucces,
  ToastError,
} from "../../../components/notification/notification.jsx";
import { reset } from "redux-form";
import { getKirimServiceBarang } from "../../../actions/transaksi_action.jsx";
import { simpanLocal } from "../../../config/Helper.jsx";
import {
  getToday,
  multipleDeleteLocal,
} from "../../../components/notification/function.jsx";
import { onFinish, onProgress } from "../../../actions/datamaster_action.jsx";

const ModalServiceLuar = lazy(() => import("./ModalServiceLuar.jsx"));

const maptostate = (state) => {
  return {
    kunci_temp: state.stocking.kunci_temp,
  };
};

class ServiceLuar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      bayar: false,

      data: [
        {
          nama_baran: "CREDIT CARD",
          qty: "BCA",
          satuan: 100000000,
          keterangan_service: 100000000,
          harga: 100000000,
        },
      ],
    };
  }

  componentDidMount() {
    AxiosMasterGet("kirim-service-luar/generate/no-trx").then((res) =>
      localStorage.setItem(
        "kirim_service_luar_nomor",
        res && res.data[0].no_service_kirim
      )
    );
    this.props.dispatch(getKirimServiceBarang());
  }

  handleSubmit(hasil) {
    let local = JSON.parse(localStorage.getItem("barang_kirim_service")) || [];
    let filtered = local.findIndex(
      (list) => list.nama_barang === hasil.nama_barang
    );

    if (filtered !== -1) {
      let data = {
        nama_barang: hasil.nama_barang,
        qty: hasil.qty,
        satuan: hasil.satuan,
        harga_satuan: hasil.harga_satuan,
        harga_total: hasil.harga_total,
        keterangan: hasil.keterangan_service,
      };

      local.splice(filtered, 1);
      local.push(data);
      localStorage.setItem("barang_kirim_service", JSON.stringify(local));
      NotifSucces("Berhasil");
      this.props.dispatch(reset("ModalServiceLuar"));
      this.props.dispatch(getKirimServiceBarang());
    } else {
      let data = {
        nama_barang: hasil.nama_barang,
        qty: hasil.qty,
        satuan: hasil.satuan,
        harga_satuan: hasil.harga_satuan,
        harga_total: hasil.harga_total,
        keterangan: hasil.keterangan_service,
      };
      simpanLocal("barang_kirim_service", data)
        .then(() => this.props.dispatch(reset("ModalServiceLuar")))
        .then(() => this.props.dispatch(getKirimServiceBarang()));
    }
  }
  sendData(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      no_service_kirim: localStorage.getItem("kirim_service_luar_nomor"),
      tanggal: getToday(),
      kode_supplier: hasil.kode_supplier,
      nopol_kendaraan: hasil.nopol_kendaraan,
      diskon_rp: hasil.diskon || 0,
      detail_barang:
        JSON.parse(localStorage.getItem("barang_kirim_service")) || [],
    };
    AxiosMasterPost("kirim-service-luar/post-transaksi", data)
      .then(() => NotifSucces("Berhasil Transaksi"))
      .then(() => this.props.dispatch(reset("HeadServiceLuar")))
      .then(() =>
        multipleDeleteLocal([
          "kirim_service_luar_nomor",
          "barang_kirim_service",
        ])
      )
      .then(() => this.props.dispatch(getKirimServiceBarang()))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(`Transaksi Gagal, Error : ${err}`).then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Kirim Service Luar</li>
        </ol>
        <h1 className="page-header">Kirim Service Luar </h1>
        <div className="row">
          <div className="col-lg-12">
            <Panel>
              <PanelHeader>Kirim Service Luar</PanelHeader>
              <PanelBody>
                <br />
                <HeadServiceLuar onSubmit={(data) => this.sendData(data)} />
                <br />

                {/* End Tambah Master Kategori  */}
              </PanelBody>
            </Panel>
          </div>
        </div>
        <ModalGlobal
          title="Tambah Data Service Luar"
          content={
            <ModalServiceLuar onSubmit={(data) => this.handleSubmit(data)} />
          }
        />
      </div>
    );
  }
}

export default connect(maptostate, null)(ServiceLuar);
