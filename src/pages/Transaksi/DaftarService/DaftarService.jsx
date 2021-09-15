import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  NotifSucces,
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { reset } from "redux-form";
import ModalGlobal from "../../ModalGlobal.jsx";
import TambahService from "./TambahService.jsx";
import { getListService } from "../../../actions/transaksi_action.jsx";
import {
  getFaktur,
  hideModal,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios.js";
import CekBooking from "./CekBooking.jsx";
import CetakSPK from "./CetakSPK";

const ModalDaftarService = lazy(() => import("./ModalDaftarService.jsx"));

const maptostate = (state) => {
  return {
    kunci_temp: state.stocking.kunci_temp,
    totalbarang: state.transaksi.totalbarang,
    totalsparepart: state.transaksi.totalsparepart,
    listdaftarservice: state.transaksi.listdaftarservice,
    noFaktur: state.datamaster.noFaktur,
  };
};

class BookingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getListService());
    this.props.dispatch(getFaktur());
    AxiosMasterGet("daftar-service/generate/no-trx").then((res) =>
      localStorage.setItem("no_daftar_service", res.data[0].no_daftar_service)
    );
  }
  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      no_booking: String(hasil.booking),
      no_daftar: hasil.no_faktur,
      nopol_kendaraan: hasil.nopol_kendaraan || hasil.booking_nopol,
      tgl_masuk: hasil.tanggal_masuk,
      km_masuk: hasil.km_masuk,
      // tgl_keluar: hasil.tanggal_keluar,
      // km_keluar: hasil.km_keluar,
      // jdw_service: hasil.service_selanjutnya,
      // km_service: hasil.km_service_berikutnya,
      keluhan: hasil.keluhan_konsumen,
      // id_mekanik: [hasil.kode_kepala_montir, hasil.kode_mekanik, hasil.kode_helper],
      id_mekanik: hasil.kode_mekanik,
      status_booking: hasil.booking === undefined ? false : true,
      detail_barang: JSON.parse(
        localStorage.getItem("list_service_daftar_temp")
      ),
      tambah_barang:JSON.parse(
        localStorage.getItem("list_service_daftar_temp")
      ),
    };
    CetakSPK([data]);
    AxiosMasterPost("daftar-service/post-transaksi", data)
      .then(() =>
        NotifSucces("Berhasil Menambahan Data Booking")
          .then(() => this.props.dispatch(reset("ModalBookingService")))
          .then(() => localStorage.removeItem("no_booking"))
          .then(() => localStorage.removeItem("list_service_daftar_temp"))
          .then(() => this.props.dispatch(reset("ModalDaftarService")))
          .then(() => this.props.dispatch(getListService()))
          .then(() => this.props.dispatch(onFinish()))
          .then(() => window.location.reload())
      )
      .catch((err) =>
        ToastError(`Terjadi Kesalahan Saat Menyimpan, Error :${err}`).then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }
  showBooking() {
    this.setState({
      booking: true,
    });
    this.props.dispatch(showModal());
    console.log(this.state.booking);
  }
  showBarang() {
    this.setState({
      booking: false,
    });
    this.props.dispatch(showModal());
  }
  tambahSparepart(hasil) {
    console.log("kode",hasil);
    let service = {
      kode_supplier: "-",
      kode: hasil.kategori_service,
      nama: hasil.nama_service,
      qty: 1,
      harga_satuan: hasil.harga_service,
      harga_total: hasil.harga_service,
      keterangan: hasil.keterangan_service,
      jenis_barang: "JASA SERVICE",
    };
    let barang = {
      kode_supplier: hasil.kode_supplier1,
      kode: hasil.kode_barcode,
      nama: hasil.sparepart,
      qty: 1,
      harga_satuan: hasil.harga_sparepart,
      harga_total: hasil.harga_sparepart,
      keterangan: hasil.kategori_service,
      jenis_barang: "SPAREPART",
    };
    let array =
      JSON.parse(localStorage.getItem("list_service_daftar_temp")) || [];
    array.push(service);
    array.push(barang);
    localStorage.setItem("list_service_daftar_temp", JSON.stringify(array));
    ToastSucces("Tambah Data Berhasil");
    this.props.dispatch(hideModal());
    this.props.dispatch(reset("TambahService"));
    this.props.dispatch(getListService());
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Service</Link>
          </li>
          <li className="breadcrumb-item active">Daftar Service</li>
        </ol>
        <h1 className="page-header">Daftar Service </h1>
        <Panel>
          <PanelHeader>Daftar Service</PanelHeader>
          <PanelBody>
            <br />
            <ModalDaftarService
              onSubmit={(data) => this.handleSubmit(data)}
              showBarang={() => this.showBarang()}
              showBooking={() => this.showBooking()}
            />
            {/* End Tambah Master Kategori  */}
          </PanelBody>
        </Panel>

        <ModalGlobal
          content={
            this.state.booking ? (
              <CekBooking />
            ) : (
              <TambahService onSubmit={(data) => this.tambahSparepart(data)} />
            )
          }
          title={this.state.booking ? "Lihat Booking" : "Tambah Data"}
        />
      </div>
    );
  }
}

export default connect(maptostate, null)(BookingService);
