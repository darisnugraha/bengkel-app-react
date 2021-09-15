import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { reset } from "redux-form";
import axios from "axios";
import { getToday } from "../../../components/helpers/function.jsx";
import { AxiosMasterPost } from "../../../axios.js";
import { onFinish, onProgress } from "../../../actions/datamaster_action.jsx";
import { getServiceProgress } from "../../../actions/transaksi_action.jsx";

const ModalBookingService = lazy(() => import("./ModalBookingService.jsx"));

const maptostate = (state) => {
  return {
    kunci_temp: state.stocking.kunci_temp,
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
    axios.get("link").then((res) =>
      this.setState({
        listMerk: res.data,
      })
    );
  }
  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      // nama: hasil.nama,
      // alamat: hasil.alamat,
      // kota: hasil.kota,
      // handphone: hasil.handphone,
      // no_polisi: hasil.no_polisi,
      // merk: hasil.merk,
      // model: hasil.model,
      // warna: hasil.warna,
      // kategori_service: hasil.kategori_service,
      // tanggal: hasil.tanggal,
      // jam: hasil.jam,
      // catatan: hasil.catatan,
      // KOLAH
      no_booking: Math.floor(Math.random() * 100000000).toString(),
      tgl_booking: getToday(),
      nopol_kendaraan: hasil.no_polisi,
      jenis_service: hasil.kategori_service,
      tgl_layanan: hasil.tanggal,
      jam: hasil.jam,
      kode_pegawai: hasil.id_mekanik,
      // kode_pegawai: [hasil.id_kepala_montir, hasil.id_mekanik,hasil.id_helper],
      catatan: hasil.catatan,
    };
    console.log(hasil);
    // console.log(data);
    // return false;
    AxiosMasterPost("service/booking/post-transaksi", data)
      .then(() => NotifSucces("Booking Berhasil"))
      .then(() => this.props.dispatch(reset("ModalBookingService")))
      .then(() => this.props.dispatch(getServiceProgress()))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        NotifError(`Booking Gagal, Error : ${err.response.data}`).then(() =>
          this.props.dispatch(onFinish())
        )
      );
    // array.push(data);
    // localStorage.setItem("BookingService_temp", JSON.stringify(array));
    // NotifSucces("Berhasil Menambahan Data Booking").then(() =>
    //   this.props.dispatch(reset("ModalBookingService"))
    // );
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Service</Link>
          </li>
          <li className="breadcrumb-item active">Booking Service</li>
        </ol>
        <h1 className="page-header">Booking Service </h1>
        <Panel>
          <PanelHeader>Booking Service</PanelHeader>
          <PanelBody>
            <br />
            <ModalBookingService
              onSubmit={(data) => this.handleSubmit(data)}
              // listMerk={this.state.listMerk}
            />
            {/* End Tambah Master Kategori  */}
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(BookingService);
