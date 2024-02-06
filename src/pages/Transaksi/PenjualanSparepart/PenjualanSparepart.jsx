import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import ModalGlobal from "../../ModalGlobal";
import HeadPenjualanSparepart from "./HeadPenjualanSparepart";
import ModalDetailBarangSparepart from "./ModalDetailBarangSparepart";
import ModalPenjualanSparepart from "./ModalPenjualanSparepart";
import {
  getFaktur,
  getSelfing,
  hideModal,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action";
import { connect } from "react-redux";
import ModalCC from "../PembayaranService/ModalCC";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios";
import {
  NotifSucces,
  ToastError,
  ToastSucces,
  ToastWarning,
} from "../../../components/notification/notification";
import {
  getListBarang,
  getListPembayaran,
} from "../../../actions/transaksi_action";
import ModalBayarSparepart from "./ModalBayarSparepart";
import { reset } from "redux-form";
import { multipleDeleteLocal } from "../../../components/notification/function";

class PenjualanSparepart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cari_barang: false,
      bayar: false,
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

  handleSubmit(hasil) {
    if (localStorage.getItem("barangSparepart_temp") === null) {
      ToastError("Barang Tidak Boleh Kosong");
      return false;
    }
    this.setState({
      bayar: true,
    });
    let data = {
      no_faktur_jual: hasil.no_faktur,
      tanggal: hasil.tanggal,
      sales_id: hasil.kode_sales,
      nama_customer: hasil.nama_customer,
      alamat: hasil.alamat,
      telepon: hasil.telepon,
      // status_masuk_piutang: hasil.no_faktur,
      grand_total: this.props.grand_total_all,
      tukar_rp: this.props.totalTukar,
      no_ref_cash: this.props.noFaktur,
      detail_barang: JSON.parse(localStorage.getItem("barangSparepart_temp")),
      detail_tukar:
        JSON.parse(localStorage.getItem("tukarSparepart_temp")) || [],
    };
    localStorage.setItem("headSparepart", JSON.stringify(data));
  }
  sendData(hasil) {
    this.props.dispatch(onProgress());
    let array = JSON.parse(localStorage.getItem("headSparepart")) || [];
    array["cash_rp"] = localStorage.getItem("total_all") || 0;
    array["status_masuk_piutang"] = hasil.piutang === undefined ? false : true;
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
    AxiosMasterPost("penjualan/post-transaksi", array)
      .then(() => NotifSucces("Transaksi Berhasil, Terima Kasih.."))
      .then(() =>
        multipleDeleteLocal([
          "barangSparepart_temp",
          "supplier_barang_sparepart",
          "no_penjualan_sparepart",
          "supplier_barang_sparepart",
          "headSparepart",
          "bayar_rp_rongsok",
          "penjualan_sparepart_nama_customer",
          "penjualan_sparepart_alamat",
          "penjualan_sparepart_telepon",
          "penjualan_sparepart_kode_sales",
          "noFaktur",
          "tukarSparepart_temp",
          "listPembayaran_temp",
        ])
      )
      .then(() => this.setBack())
      .then(() => this.props.dispatch(getListBarang()))
      .then(() => this.props.dispatch(getFaktur()))
      .then(() => this.props.dispatch(reset("HeadPenjualanSparepart")))
      // .then(() => CetakFakturJual())
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(`Gagal Menambah Data, Error : ${err.response.data}`).then(
          () => this.props.dispatch(onFinish())
        )
      );
  }
  setCariBarang(data) {
    this.setState({
      cari_barang: true,
      jenis_barang: data,
    });
  }
  setBack() {
    this.setState({
      cari_barang: false,
      bayar: false,
    });
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
      fee_rp: hasil.fee_card || 0,
      no_ac: `${hasil.bank}`,
      valid_until: hasil.expiry || "-",
      nama_pemilik: hasil.name || "-",
      no_ktp: hasil.no_ktp || "-",
      alamat_ktp: hasil.alamat_ktp || "-",
      kota_ktp: hasil.kota || "-",
      telepon_ktp: hasil.handphone || "-",
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
  showDetail() {
    this.props.dispatch(showModal());
    this.setState({
      jenisModal: "DETAIL",
    });
  }
  componentDidMount() {
    this.props.dispatch(getFaktur());
    this.props.dispatch(getSelfing());
    AxiosMasterGet("penjualan/generate/no-trx")
      .then((res) =>
        localStorage.setItem(
          "no_penjualan_sparepart",
          res.data[0].no_faktur_jual
        )
      )
      .catch((err) => {
        ToastWarning("Gagal Ambil Faktur, Mohon Refresh");
        console.log(err);
      });
    this.props.dispatch(getListBarang());
  }
  handleTambahBarang(hasil) {
    let nama_local = "";
    if (this.state.jenis_barang === "TAMBAH") {
      nama_local = "barangSparepart_temp";
      let array = JSON.parse(localStorage.getItem(nama_local)) || [];
      let indexnya = array.findIndex(
        (list) => list.kode_barcode === hasil.kode_barcode
      );
      if (indexnya !== -1) {
        let data = {
          kode_supplier:
            localStorage.getItem("supplier_barang_sparepart") || "",
          kode_barcode: hasil.kode_barcode,
          qty: parseFloat(hasil.jumlah) + parseFloat(array[indexnya].qty),
          harga_satuan: parseFloat(hasil.harga_satuan),
          diskon_rp: parseFloat(hasil.discount || 0),
          kode_lokasi_shelving: hasil.kode_lokasi_shelving,
          harga_total:
            parseFloat(hasil.grand_total) +
            parseFloat(array[indexnya].harga_total),
        };
        array.splice(indexnya, 1);
        array.push(data);
        localStorage.setItem(nama_local, JSON.stringify(array));
        ToastSucces("Barang Berhasil Ditambahkan");
        this.props.dispatch(getListBarang());
        this.props.dispatch(reset("ModalDetailBarangSparepart"));
        this.setBack();
      } else {
        let data = {
          kode_supplier:
            localStorage.getItem("supplier_barang_sparepart") || "",
          kode_barcode: hasil.kode_barcode,
          qty: parseFloat(hasil.jumlah),
          harga_satuan: parseFloat(hasil.harga_satuan),
          diskon_rp: parseFloat(hasil.discount || 0),
          kode_lokasi_shelving: hasil.kode_lokasi_shelving,
          harga_total: parseFloat(hasil.grand_total),
        };
        array.push(data);
        localStorage.setItem(nama_local, JSON.stringify(array));
        ToastSucces("Barang Berhasil Ditambahkan");
        this.props.dispatch(getListBarang());
        this.props.dispatch(reset("ModalDetailBarangSparepart"));
        this.props.dispatch(hideModal());
        this.setBack();
      }
    } else {
      nama_local = "tukarSparepart_temp";
      let array = JSON.parse(localStorage.getItem(nama_local)) || [];
      let indexnya = array.findIndex(
        (list) => list.kode_barcode === hasil.kode_barcode
      );
      if (indexnya !== -1) {
        let data = {
          kode_supplier:
            localStorage.getItem("supplier_barang_sparepart") || "",
          kode_barcode: hasil.kode_barcode,
          qty: parseFloat(hasil.jumlah) + parseFloat(array[indexnya].qty),
          harga_satuan: parseFloat(hasil.harga_satuan),
          potongan: parseFloat(hasil.discount || 0),
          kode_lokasi_shelving: hasil.kode_lokasi_shelving,
          harga_total:
            parseFloat(hasil.grand_total) +
            parseFloat(array[indexnya].harga_total),
        };
        array.splice(indexnya, 1);
        array.push(data);
        localStorage.setItem(nama_local, JSON.stringify(array));
        ToastSucces("Barang Berhasil Ditambahkan");
        this.props.dispatch(getListBarang());
        this.props.dispatch(reset("ModalDetailBarangSparepart"));
        this.props.dispatch(hideModal());
        this.setBack();
      } else {
        let data = {
          kode_supplier:
            localStorage.getItem("supplier_barang_sparepart") || "",
          kode_barcode: hasil.kode_barcode,
          qty: parseFloat(hasil.jumlah),
          harga_satuan: parseFloat(hasil.harga_satuan),
          potongan: parseFloat(hasil.discount || 0),
          kode_lokasi_shelving: hasil.kode_lokasi_shelving,
          harga_total: parseFloat(hasil.grand_total),
        };
        array.push(data);
        localStorage.setItem(nama_local, JSON.stringify(array));
        ToastSucces("Barang Berhasil Ditambahkan");
        this.props.dispatch(getListBarang());
        this.props.dispatch(reset("ModalDetailBarangSparepart"));
        this.setBack();
      }
    }
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Penjualan Sparepart</li>
        </ol>
        <h1 className="page-header">Penjualan Sparepart </h1>
        <div className="row">
          <div className="col-lg-12">
            <Panel>
              <PanelHeader>Penjualan Sparepart</PanelHeader>
              <PanelBody>
                <br />
                {this.state.cari_barang ? (
                  <ModalPenjualanSparepart
                    setBack={() => this.setBack()}
                    showDetail={() => this.showDetail()}
                  />
                ) : this.state.bayar ? (
                  <ModalBayarSparepart
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
                  <HeadPenjualanSparepart
                    onSubmit={(data) => this.handleSubmit(data)}
                    setCariBarang={(data) => this.setCariBarang(data)}
                    setBayar={() => this.setBayar()}
                  />
                )}
                <br />

                {/* End Tambah Master Kategori  */}
              </PanelBody>
            </Panel>
            <ModalGlobal
              title={
                this.state.jenisModal === "DETAIL"
                  ? "Detail Barang"
                  : this.state.jenisModal === "CC"
                  ? "Credit Card"
                  : null
              }
              content={
                this.state.jenisModal === "DETAIL" ? (
                  <ModalDetailBarangSparepart
                    jenis_barang={this.state.jenis_barang}
                    onSubmit={(data) => this.handleTambahBarang(data)}
                  />
                ) : this.state.jenisModal === "CC" ? (
                  <ModalCC onSubmit={(data) => this.handleSimpanCC(data)} />
                ) : null
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    listBarangSparepart: state.transaksi.listBarangSparepart,
    grand_total_all: state.transaksi.total_bayar,
    sum_pembayaran: state.transaksi.sum_pembayaran,
    totalTukar: state.transaksi.totalTukar,
    noFaktur: state.datamaster.noFaktur,
  };
})(PenjualanSparepart);
