import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "redux-form";
import Swal from "sweetalert2";
import {
  getCustomer,
  getFaktur,
  hideModal,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action";
import {
  getListBarangRongsok,
  getListPembayaran,
} from "../../../actions/transaksi_action";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios";
import { multipleDeleteLocal } from "../../../components/notification/function";
import {
  NotifSucces,
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import { simpanLocal } from "../../../config/Helper";
import ModalGlobal from "../../ModalGlobal";
import ModalCC from "../PembayaranService/ModalCC";
import HeadPenjualanRongsok from "./HeadPenjualanRongsok";
import ModalBayar from "./ModalBayar";
import ModalPenjualanRongsok from "./ModalPenjualanRongsok";
import TambahCustomer from "./TambahCustomer";

const maptostate = (state) => {
  return {
    listbarangrongsok: state.transaksi.listbarangrongsok,
    onSend: state.datamaster.onSend,
    noFaktur: state.datamaster.noFaktur,
    grand_total_all: state.transaksi.total_bayar,
  };
};

class PenjualanRongsok extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cari_barang: false,
      bayar: false,
      customer: false,
      columnsListBayar: [
        {
          dataField: "jenis_trx",
          text: "Jenis Bayar",
        },
        {
          dataField: "nama_pemilik",
          text: "Nama Pemilik",
        },
        {
          dataField: "no_ac",
          text: "Nomor Rekening",
        },
        {
          dataField: "bayar_rp",
          text: "Total Bayar",
          formatter: (list) => `${parseFloat(list).toLocaleString("id-ID")}`,
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row, index) => {

            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    type="button"
                    onClick={() => this.deleteBarang(index)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }

  deleteBarang(index) {
    Swal.fire({
      title: "Anda Yakin !!",
      text: "Ingin Menghapus Data Ini ?",
      icon: "warning",
      position: "top-center",
      cancelButtonText: "Tidak",
      showCancelButton: true,
      confirmButtonText: "OK",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let data =
          JSON.parse(localStorage.getItem("listPembayaran_temp")) || [];
        data.splice(index, 1);
        localStorage.setItem("listPembayaran_temp", JSON.stringify(data));
        this.props.dispatch(getListPembayaran());
        ToastSucces("Berhasil Menghapus Data");
      }
    });
  }

  componentDidMount() {
    this.props.dispatch(getListBarangRongsok());
    this.props.dispatch(getCustomer());
    AxiosMasterGet("penjualan-rosok/generate/no-trx").then((res) =>
      localStorage.setItem("nomor_jual_rongsok", res.data[0].no_faktur_jual)
    );
    this.props.dispatch(getListPembayaran());
    this.props.dispatch(getFaktur());
  }

  handleSubmit(hasil) {
    let local = JSON.parse(localStorage.getItem("BarangRongsok_temp")) || [];
    let filtered = local.findIndex(
      (list) => list.nama_barang === hasil.nama_barang
    );
    if (filtered !== -1) {
      let data = {
        nama_barang: hasil.nama_barang,
        qty: parseInt(hasil.qty) + parseFloat(local[filtered].qty),
        kode_satuan: hasil.satuan,
        harga_satuan: parseFloat(hasil.harga_satuan),
        harga_total:
          (parseInt(hasil.qty) + parseFloat(local[filtered].qty)) * parseFloat(hasil.harga_satuan),
      };
      local.splice(filtered, 1);
      local.push(data);
      localStorage.setItem("BarangRongsok_temp", JSON.stringify(local));
      ToastSucces("Berhasil Menambah Data");
      this.props.dispatch(reset("ModalPenjualanRongsok"));
      this.props.dispatch(getListBarangRongsok());
    } else {
      let data = {
        nama_barang: hasil.nama_barang,
        qty: parseFloat(hasil.qty),
        kode_satuan: hasil.satuan,
        harga_satuan: parseFloat(hasil.harga_satuan),
        harga_total: parseFloat(hasil.total),
      };
      simpanLocal("BarangRongsok_temp", data)
        .then(() => this.props.dispatch(reset("ModalPenjualanRongsok")))
        .then(() => this.props.dispatch(getListBarangRongsok()));
    }
    // let data = {
    //   nama_barang: hasil.nama_barang,
    //   qty: hasil.qty,
    //   kode_satuan: hasil.satuan,
    //   harga_satuan: hasil.harga_satuan,
    //   harga_total: hasil.total,
    // };
    // simpanLocal("BarangRongsok_temp", data);
    // this.props.dispatch(getListBarangRongsok());
  }

  showBayar(hasil) {
    let data = {
      no_faktur_jual: hasil.no_faktur,
      tanggal: hasil.tanggal,
      nama_customer: hasil.kode_customer,
      alamat: hasil.alamat,
      telepon: hasil.handphone,
      grand_total: this.props.grand_total_all,
      no_ref_cash: this.props.noFaktur,
      detail_barang: JSON.parse(localStorage.getItem("BarangRongsok_temp")),
    };
    localStorage.setItem("headPembayaranRongsok", JSON.stringify(data));
    this.setState({
      bayar: true,
    });
  }
  sendBayar(hasil) {
    this.props.dispatch(onProgress());
    let head = JSON.parse(localStorage.getItem("headPembayaranRongsok")) || [];
    head["cash_rp"] = hasil.bayar;
    head["detail_non_tunai"] =
      localStorage.getItem("listPembayaran_temp") === "[]"
        ? [
          {
            no_ref: "-",
            no_ac: "-",
            bayar_rp: 0,
            fee_rp: 0,
            no_card: "-",
            valid_until: "-",
            nama_pemilik: "-",
            no_ktp: "-",
            alamat_ktp: "-",
            kota_ktp: "-",
            telepon_ktp: "-",
            jenis_trx: "-",
          },
        ]
        : JSON.parse(localStorage.getItem("listPembayaran_temp")) || [];

    localStorage.setItem("headPembayaranRongsok", JSON.stringify(head));
    AxiosMasterPost("penjualan-rosok/post-transaksi", head)
      .then(() =>
        multipleDeleteLocal([
          "headPembayaranRongsok",
          "nomor_jual_rongsok",
          "BarangRongsok_temp",
          "bayar_rp_rongsok",
          "noFaktur",
        ])
      )
      .then(() => this.props.dispatch(getListBarangRongsok()))
      .then(() => this.props.dispatch(getListPembayaran()))
      .then(() => NotifSucces("Berhasil Menambahkan Data"))
      .then(() => this.props.dispatch(getFaktur()))
      .then(() => this.props.dispatch(onFinish()))
      .then(() =>
        this.setState({
          bayar: false,
          customer: false,
        })
      )
      .then(() => this.props.dispatch(onFinish()))
      .then(() => NotifSucces("Penjualan Berhasil"))
      .catch((err) => {
        ToastError(`Error : ${err.response.data}`);
        this.props.dispatch(onFinish());
      });
  }
  showTambah() {
    this.props.dispatch(showModal());
    this.setState({
      bayar: false,
      customer: false,
    });
  }
  showCC() {
    this.props.dispatch(showModal());
    this.setState({
      jenisModal: "CC",
    });
  }
  handleSimpanCC(hasil) {
    let array = JSON.parse(localStorage.getItem("listPembayaran_temp")) || [];
    let data = {
      no_ref: this.props.noFaktur,
      no_ac: `${hasil.bank}`,
      bayar_rp: hasil.grand_total,
      fee_rp: hasil.fee_card,
      no_card: hasil.no_card,
      valid_until: hasil.expiry,
      nama_pemilik: hasil.name,
      no_ktp: hasil.no_ktp,
      alamat_ktp: hasil.alamat_ktp,
      kota_ktp: hasil.kota,
      telepon_ktp: hasil.handphone,
      jenis_trx: hasil.jenis_trx || "DEBIT",
    };
    array.push(data);
    let total = array.map((list) => list.bayar_rp).reduce((a, b) => a + b);
    if (total > this.props.grand_total) {
      ToastError("Pembayaran Melebihi Total Harga");
      return false;
    }
    localStorage.setItem("listPembayaran_temp", JSON.stringify(array));
    ToastSucces("Berhasil Menambahkan Data");
    localStorage.removeItem("noFaktur");
    this.props.dispatch(getFaktur());
    this.props.dispatch(hideModal());
    this.props.dispatch(getListPembayaran());
  }
  showCustomer() {
    this.setState({
      customer: true,
      bayar: false,
    });
  }
  handleCustomer(hasil) {
    let data = {
      kode_customer: this.props.noFaktur || "-",
      nama_customer: hasil.nama_customer || "-",
      alamat: hasil.alamat_customer || "-",
      kota: hasil.kota_customer || "-",
      handphone: hasil.handphone_customer || "-",
      nopol_kendaraan: hasil.no_polisi || "-",
      merk_kendaraan: hasil.merk || "-",
      type_kendaraan: hasil.type || "-",
      nomesin_kendaraan: hasil.no_mesin || "-",
      warna_kendaraan: hasil.warna || "-",
    };
    this.props.dispatch(onProgress());
    AxiosMasterPost("customer/add", data)
      .then(() => ToastSucces("Berhasil Ditambahkan"))
      .then(() => this.props.dispatch(reset("dataBarang")))
      .then(() => this.props.dispatch(hideModal()))
      .then(() => this.props.dispatch(onFinish()))
      .then(() => this.props.dispatch(getCustomer()))
      .then(() => localStorage.removeItem("noFaktur"))
      .then(() => this.props.dispatch(getFaktur()))
      .then(() =>
        this.setState({
          customer: false,
          bayar: false,
        })
      )
      .catch(() =>
        ToastError(
          "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
        ).then(() => this.props.dispatch(onFinish()))
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Penjualan Barang Rongsok</li>
        </ol>
        <h1 className="page-header">Penjualan Barang Rongsok </h1>
        <div className="row">
          <div className="col-lg-12">
            <Panel>
              <PanelHeader>Penjualan Barang Rongsok</PanelHeader>
              <PanelBody>
                <br />
                {this.state.bayar ? (
                  <ModalBayar
                    showCC={() => this.showCC()}
                    columns={this.state.columnsListBayar}
                    data={this.state.dataListBayar}
                    backMenu={() =>
                      this.setState({
                        bayar: false,
                      })
                    }
                    onSubmit={(data) => this.sendBayar(data)}
                  />
                ) : this.state.customer ? (
                  <TambahCustomer
                    onSubmit={(data) => this.handleCustomer(data)}
                    onSend={this.props.onSend}
                    isEdit={false}
                    noFaktur={this.props.noFaktur}
                    backMenu={() =>
                      this.setState({
                        bayar: false,
                        customer: false,
                      })
                    }
                  />
                ) : (
                  <HeadPenjualanRongsok
                    listbarangrongsok={this.props.listbarangrongsok}
                    onSubmit={(data) => this.showBayar(data)}
                    showTambah={() => this.showTambah()}
                    showCustomer={() => this.showCustomer()}
                  />
                )}

                <br />

                {/* End Tambah Master Kategori  */}
              </PanelBody>
            </Panel>
            <ModalGlobal
              title={this.state.bayar ? "Credit Card" : "Tambah Data Rongsok"}
              content={
                this.state.bayar ? (
                  <ModalCC onSubmit={(data) => this.handleSimpanCC(data)} />
                ) : (
                  <ModalPenjualanRongsok
                    onSubmit={(data) => this.handleSubmit(data)}
                  />
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(maptostate, null)(PenjualanRongsok);
