import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import ModalKomplainService from "./ModalKomplainService.jsx";
import {
  NotifSucces,
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification.jsx";
import {
  getFaktur,
  hideModal,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import {
  getListBarang,
  getListBarangKomplain,
  getListBarangPembayaran,
  getListPembayaran,
  getListPembayaranKomplain,
} from "../../../actions/transaksi_action.jsx";
import { AxiosMasterPost } from "../../../axios.js";
import { reset } from "redux-form";
import { multipleDeleteLocal } from "../../../components/notification/function.jsx";
import ModalCC from "../PembayaranService/ModalCC.jsx";

const HeadKomplainService = lazy(() => import("./HeadKomplainService.jsx"));
const ModalBayarKomplain = lazy(() => import("./ModalBayarKomplain.jsx"));

const maptostate = (state) => {
  return {
    grand_total_all: state.transaksi.total_bayar,
    listbayar_service: state.stocking.listbayar_service,
    listcustomer: state.datamaster.listcustomer,
    onSend: state.datamaster.onSend,
  };
};

class KomplainService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      bayar: false,
      jumlah_discount: 0,
      total_jasa: 0,
      total_sparepart: 0,
      jenisModal: "",
      columnsListBayar: [
        {
          dataField: "jenis_trx",
          text: "Jenis Bayar",
        },
        {
          dataField: "no_card",
          text: "Bank",
        },
        {
          dataField: "nama_pemilik",
          text: "Nama Pemilik",
        },
        {
          dataField: "fee_rp",
          text: "Fee Card",
        },
        {
          dataField: "bayar_rp",
          text: "Bayar",
          formatter: (data) =>
            `Rp. ${parseFloat(data).toLocaleString("id-ID")}`,
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row, rowIndex) => {
            // let dataEdit = {
            //   kode_divisi: row.kode_divisi,
            //   nama_divisi: row.nama_divisi,
            // };
            this.setState({});
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    onClick={() => {
                      let data = JSON.parse(
                        localStorage.getItem("listPembayaran_temp")
                      );
                      data.splice(rowIndex, 1);
                      localStorage.setItem(
                        "listPembayaran_temp",
                        JSON.stringify(data)
                      );
                      this.props.dispatch(getListPembayaran());
                    }}
                    className="btn btn-danger"
                  >
                    Hapus
                    <i className="fa fa-trash ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }

  setBack() {
    this.setState({
      bayar: false,
    });
  }

  sendData(hasil) {
    console.log("cek", hasil);
    this.props.dispatch(onProgress());
    let array = JSON.parse(localStorage.getItem("list_komplain")) || {};
    array["total_bayar_rp"] = localStorage.getItem("total_bayar") || 0;
    array["jml_complain_rp"] = parseFloat(hasil.grand_total_all) || '-';
    // array["status_masuk_piutang"] = hasil.piutang === undefined ? false : true;
    array["detail_non_tunai"] =
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
        : localStorage.getItem("listPembayaran_temp") !== null
        ? JSON.parse(localStorage.getItem("listPembayaran_temp"))
        : [
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
          ];
    console.log("arr", array);
    // return false;
    AxiosMasterPost("/service/complain/post-transaksi", array)
      .then(() => NotifSucces("Transaksi Berhasil, Terima Kasih.."))
      .then(() =>
        multipleDeleteLocal([
          "kembalian_bayar",
          "total_bayar",
          "list_komplain",
          "KomplainBarang_temp_kirim",
          "KomplainBarang_temp",
          "nama_customer",
          "kode_customer",
          "listPembayaran_temp",
          "bayar_rp_rongsok"
        ])
      )
      .then(() => this.setBack())
      .then(() => this.props.dispatch(reset("HeadKomplainService")))
      .then(() => window.location.reload())
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(
          `Gagal Menambah Data ${err.response.data}`
        )
      );
  }

  showCC() {
    this.props.dispatch(showModal());
    this.setState({
      jenisModal: "CC",
    });
  }

  handleSimpanCC(hasil) {
    let data = {
      no_ref: this.props.noFaktur,
      no_card: hasil.no_card,
      bayar_rp: hasil.grand_total,
      fee_rp: hasil.fee_card,
      no_ac: `${hasil.bank}`,
      valid_until: hasil.expiry,
      nama_pemilik: hasil.name,
      no_ktp: hasil.no_ktp,
      alamat_ktp: hasil.alamat_ktp,
      kota_ktp: hasil.kota,
      telepon_ktp: hasil.handphone,
      jenis_trx: hasil.jenis_trx || "DEBIT",
    };
    let array = JSON.parse(localStorage.getItem("listPembayaran_temp")) || [];
    array.push(data);
    localStorage.setItem("listPembayaran_temp", JSON.stringify(array));
    ToastSucces("Berhasil Menambahkan Data");
    this.props.dispatch(getListPembayaran());
    localStorage.removeItem("noFaktur");
    this.props.dispatch(getFaktur());
  }

  handleSimpan(hasil) {
    AxiosMasterPost("/service/complain/post-transaksi", hasil)
      .then(() => localStorage.removeItem("KomplainBarang_temp_kirim"))
      .then(() => localStorage.removeItem("KomplainBarang_temp"))
      .then(() => ToastSucces("Simpan Data Komplain Berhasil"))
      .then(() => window.location.reload());
  }

  handleSubmit(hasil) {
    console.log("tes", hasil);
    let supplier = hasil.kode_supplier && hasil.kode_supplier.split("||");
    let array = JSON.parse(localStorage.getItem("KomplainBarang_temp")) || [];
    let array_kirim =
      JSON.parse(localStorage.getItem("KomplainBarang_temp_kirim")) || [];
    let data = {
      kode_barcode: hasil.kode_barcode,
      nama_barang: hasil.nama_barang,
      harga_jual: hasil.harga_jual,
      total: hasil.total_harga,
      satuan: hasil.satuan,
      kode_supplier: supplier[0],
      qty: hasil.qty,
      // kondisi: hasil.kondisi,
    };
    let data_kirim = {
      kode_barcode: hasil.kode_barcode,
      harga_satuan: hasil.harga_jual,
      harga_total: hasil.total_harga,
      kode_supplier: supplier[0],
      qty: hasil.qty,
      // kondisi: hasil.kondisi,
    };

    array.push(data);
    array_kirim.push(data_kirim);
    localStorage.setItem("KomplainBarang_temp", JSON.stringify(array));
    localStorage.setItem(
      "KomplainBarang_temp_kirim",
      JSON.stringify(array_kirim)
    );
    NotifSucces("Berhasil Menambahan Data")
      .then(() => this.props.dispatch(getListBarangKomplain()))
      .then(() => this.props.dispatch(hideModal()))
      .then(() => localStorage.setItem("total_sparepart", hasil.total_harga))
  }

  handleBayar(hasil) {
    console.log(hasil);
    let data = {
      no_complain: hasil.no_komplain || '-',
      catatan: hasil.catatan_keluhan || '-',
      nopol_kendaraan: hasil.nopol_kendaraan || '-',
      tgl_complain: hasil.tanggal || '-',
      total_debet_rp: 0,
      total_kredit_rp: 0,
      total_trf_rp: 0,
      detail_barang: JSON.parse(
        localStorage.getItem("KomplainBarang_temp_kirim")
      ) || '-',
      status_masuk_piutang: false,
    };
    localStorage.setItem("list_komplain", JSON.stringify(data));
    localStorage.setItem("total_bayar", this.props.grand_total_all);
    this.props.dispatch(getListPembayaranKomplain());
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Komplain Service</li>
        </ol>
        <h1 className="page-header">Komplain Service </h1>
        <Panel>
          <PanelHeader>Komplain Service</PanelHeader>
          <PanelBody>
            <br />
            {this.state.bayar ? (
              <ModalBayarKomplain
                showCC={() => this.showCC()}
                columns={this.state.columnsListBayar}
                data={this.state.dataListBayar}
                backMenu={() =>
                  this.setState({
                    bayar: false,
                  })
                }
                onSubmit={(data) => this.sendData(data)}
              />
            ) : (
              <HeadKomplainService
                onSubmit={(data) => {
                  this.handleBayar(data);
                  this.setState({
                    bayar: true,
                  });
                }}
              />
            )}

            {/* End Tambah Master Kategori  */}
          </PanelBody>
        </Panel>
        <ModalGlobal
          title={
            this.state.jenisModal === "CC"
              ? "Credit Card"
              : "Tambah Data Barang"
          }
          onSend={this.props.onSend}
          content={
            this.state.jenisModal === "CC" ? (
              <ModalCC onSubmit={(data) => this.handleSimpanCC(data)} />
            ) : (
              <ModalKomplainService
                onSend={this.props.onSend}
                onSubmit={(data) => this.handleSubmit(data)}
              />
            )
          }
          // content={
          //   <ModalKomplainService
          //     onSend={this.props.onSend}
          //     onSubmit={(data) => this.handleSubmit(data)}
          //   />
          // }
        />
      </div>
    );
  }
}

export default connect(maptostate, null)(KomplainService);
