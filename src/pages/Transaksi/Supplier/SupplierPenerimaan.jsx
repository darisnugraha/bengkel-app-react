import React, { Component, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import HeadSupplierPenerimaan from "./HeadSupplierPenerimaan";
import ModalGlobal from "../../ModalGlobal";
import { reduxForm, reset } from "redux-form";
import { simpanLocal } from "../../../config/Helper";
import { getListTerimaSupplier } from "../../../actions/transaksi_action";
import { connect } from "react-redux";
import CetakNota from "../../Stoking/CetakNota";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios";
import {
  getUserData,
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification";
import {
  getToday,
  multipleDeleteLocal,
} from "../../../components/notification/function";
import Skeleton from "react-loading-skeleton";
import {
  getFaktur,
  getSelfing,
  hideModal,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action";
import ModalBayarSupplierPenerimaan from "./ModalBayarSupplierPenerimaan";

const ModalSupplierPenerimaan = lazy(() => import("./ModalSupplierPenerimaan"));
const maptostate = (state) => {
  return {
    listterimasupplier: state.transaksi.listterimasupplier,
    sub_total: state.transaksi.sub_total,
    noFaktur: state.datamaster.noFaktur,
  };
};
class SupplierPenerimaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bayar: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getListTerimaSupplier());
    this.props.dispatch(getSelfing());
    this.getKodePenerimaan();
    this.props.dispatch(getFaktur());
  }
  handleHead(hasil) {
    console.log("this", hasil);
    if (localStorage.getItem("type_pembayaran") === "true") {
      this.setState({
        bayar: true,
      });
      this.props.dispatch(showModal());
      return false;
    } else if (localStorage.getItem("PenerimaanSupplier_temp_kirim") === null) {
      NotifError("Data Barang Masih Kosong, Mohon isi barang dulu");
      return false;
    } else {
      this.props.dispatch(onProgress());
      let data = {
        no_terima: localStorage.getItem("penerimaan_kode_terima"),
        tanggal_terima:
          localStorage.getItem("penerimaan_tanggal_barang") || getToday(),
        no_bon: localStorage.getItem("penerimaan_no_bon"),
        tanggal_bon:
          localStorage.getItem("penerimaan_tanggal_invoice") || getToday(),
        kode_supplier: localStorage.getItem("penerimaan_kode_supplier"),
        pembayaran_cash:
          localStorage.getItem("type_pembayaran") === "true"
            ? true
            : false || false,
        pembayaran_kredit:
          localStorage.getItem("type_pembayaran") === "true"
            ? false
            : true || false,
        keterangan: localStorage.getItem("penerimaan_keterangan"),
        diskon_rp: localStorage.getItem("penerimaan_discount") || 0,
        detail_barang:
          JSON.parse(localStorage.getItem("PenerimaanSupplier_temp_kirim")) ||
          [],
      };

      // INISIALISASI AUTOTABLE
      const tableRows = [];
      const footerRows = [];
      let table = JSON.parse(localStorage.getItem("PenerimaanSupplier_temp"));
      table.forEach((data, i) => {
        const rows = [
          ++i,
          data.kode_barcode,
          data.nama_barang,
          // data.merk,
          // data.kwalitas,
          data.type,
          data.satuan,
          data.qty,
          parseFloat(data.harga_satuan).toLocaleString("id-ID"),
          parseFloat(data.total).toLocaleString("id-ID"),
        ];
        tableRows.push(rows);
      });
      const footer = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "TOTAL TAGIHAN",
        parseFloat(
          table.map((data) => data.total).reduce((a, b) => a + b, 0)
        ).toLocaleString("id-ID"),
      ];
      footerRows.push(footer);
      let columnTabel = [
        "NO",
        "BARCODE",
        "JENIS BARANG",
        // "MERK",
        // "KW",
        "TYPE",
        "SATUAN",
        "QTY",
        "HARGA SATUAN",
        "TOTAL",
      ];
      // INISIALISASI SELESAI -> PANGGIL AXIOS DAN PANGGIL PRINT SAAT AXIOS BERHASIL

      AxiosMasterPost("terima-barang-supplier/post-transaksi", data)
        .then(() => NotifSucces("Berhasil Melakukan Pembayaran Non-Tunai"))
        .then(() => {
          CetakNota(
            "NO TERIMA",
            hasil.kode_terima,
            "TANGGAL",
            hasil.tanggal_invoice,
            "NO BON",
            hasil.no_bon,
            "SUPP",
            localStorage.getItem("penerimaan_kode_supplier"),
            getUserData().user_name,
            "01-28-2021",
            getUserData().user_name,
            columnTabel,
            "BUKTI PENERIMAAN BARANG SUPPLIER",
            tableRows,
            footerRows,
            true
          );
        })
        .then(() =>
          multipleDeleteLocal([
            "PenerimaanSupplier_temp",
            "PenerimaanSupplier_temp_kirim",
            "penerimaan_keterangan",
            "penerimaan_kode_supplier",
            "penerimaan_no_bon",
            "penerimaan_kode_terima",
            "penerimaan_tanggal_barang",
            "penerimaan_tanggal_invoice",
          ])
        )
        .then(() => this.props.dispatch(reset("HeadSupplierPenerimaan")))
        .then(() => this.getKodePenerimaan())
        .then(() => this.props.dispatch(getListTerimaSupplier()))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getFaktur()))
        .then(() => this.props.dispatch(onFinish()))
        .then(() => window.location.reload())
        .catch((err) =>
          NotifError(err.response.data).then(() =>
            this.props.dispatch(onFinish())
          )
        );
    }
  }
  showTambah() {
    this.setState({
      bayar: false,
    });
    this.props.dispatch(showModal());
  }
  getKodePenerimaan() {
    AxiosMasterGet("terima-barang-supplier/generate/no-trx").then((res) =>
      localStorage.setItem("penerimaan_kode_terima", res.data[0].no_terima)
    );
  }
  handleModal(hasil) {
    let local =
      JSON.parse(localStorage.getItem("PenerimaanSupplier_temp_kirim")) || [];
    let local2 =
      JSON.parse(localStorage.getItem("PenerimaanSupplier_temp")) || [];
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
        harga_satuan: parseFloat(hasil.harga_satuan),
        kode_lokasi_shelving: hasil.kode_lokasi_shelving,
        harga_total:
          parseFloat(hasil.total) + parseFloat(local[filtered].harga_total),
      };
      let dataTable = {
        harga_satuan: hasil.harga_satuan,
        kode_barcode: hasil.kode_barcode,
        kode_lokasi_shelving: hasil.kode_lokasi_shelving,
        // kwalitas: hasil.kwalitas,
        // merk: hasil.merk,
        nama_barang: hasil.nama_barang,
        qty: parseFloat(hasil.qty) + parseFloat(local2[filtered2].qty),
        satuan: hasil.satuan,
        total: parseFloat(hasil.total) + parseFloat(local2[filtered2].total),
        type: hasil.type,
      };
      local.splice(filtered, 1);
      local2.splice(filtered2, 1);
      local.push(data);
      local2.push(dataTable);
      localStorage.setItem("PenerimaanSupplier_temp", JSON.stringify(local2));
      localStorage.setItem(
        "PenerimaanSupplier_temp_kirim",
        JSON.stringify(local)
      );
      NotifSucces("Berhasil");
      this.props.dispatch(reset("ModalSupplierPenerimaan"));
      this.props.dispatch(getListTerimaSupplier());
    } else {
      let data = {
        kode_barcode: hasil.kode_barcode,
        qty: parseInt(hasil.qty),
        harga_satuan: parseFloat(hasil.harga_satuan),
        harga_total: parseFloat(hasil.total),
        kode_lokasi_shelving: hasil.kode_lokasi_shelving,
      };
      let dataTable = {
        harga_satuan: hasil.harga_satuan,
        kode_barcode: hasil.kode_barcode,
        kode_lokasi_shelving: hasil.kode_lokasi_shelving,
        // kwalitas: hasil.kwalitas,
        // merk: hasil.merk,
        nama_barang: hasil.nama_barang,
        qty: hasil.qty,
        satuan: hasil.satuan,
        total: hasil.total,
        type: hasil.type,
      };
      simpanLocal("PenerimaanSupplier_temp", dataTable)
        .then(() => this.props.dispatch(reset("ModalSupplierPenerimaan")))
        .then(() => this.props.dispatch(getListTerimaSupplier()));
      simpanLocal("PenerimaanSupplier_temp_kirim", data)
        .then(() => this.props.dispatch(reset("ModalSupplierPenerimaan")))
        .then(() => this.props.dispatch(getListTerimaSupplier()));
    }
  }

  handleCash(hasil) {
    console.log("cash", hasil);
    if (localStorage.getItem("PenerimaanSupplier_temp_kirim") === null) {
      NotifError("Data Barang Masih Kosong, Mohon isi barang dulu");
      return false;
    } else {
      let data = {
        no_terima: localStorage.getItem("penerimaan_kode_terima"),
        no_bon: localStorage.getItem("penerimaan_no_bon"),
        tanggal_terima:
          localStorage.getItem("penerimaan_tanggal_barang") || getToday(),
        tanggal_bon:
          localStorage.getItem("penerimaan_tanggal_invoice") || getToday(),
        kode_supplier: localStorage.getItem("penerimaan_kode_supplier"),
        no_ref: this.props.noFaktur,
        no_ref_cash: this.props.noFaktur,
        pembayaran_cash:
          localStorage.getItem("type_pembayaran") === "true"
            ? true
            : false || false,
        pembayaran_kredit:
          localStorage.getItem("type_pembayaran") === "true"
            ? false
            : true || false,
        keterangan: localStorage.getItem("penerimaan_keterangan"),
        diskon_rp: localStorage.getItem("penerimaan_discount"),
        cash_rp: hasil.cash || 0,
        transfer_rp: hasil.transfer || 0,
        no_ac_asal: (hasil.no_ac_asal && hasil.no_ac_asal.toString()) || "-",
        no_ac_tujuan: hasil.no_ac_tujuan || "-",
        detail_barang:
          JSON.parse(localStorage.getItem("PenerimaanSupplier_temp_kirim")) ||
          [],
        detail_bayar_retur:
          JSON.parse(localStorage.getItem("list_return")) || [],
      };
      console.log(JSON.stringify(data));
      // INISIALISASI AUTOTABLE
      const tableRows = [];
      const footerRows = [];
      let table = JSON.parse(localStorage.getItem("PenerimaanSupplier_temp"));
      table.forEach((data, i) => {
        const rows = [
          ++i,
          data.kode_barcode,
          data.nama_barang,
          // data.merk,
          // data.kwalitas,
          data.type,
          data.satuan,
          data.qty,
          parseFloat(data.harga_satuan).toLocaleString("id-ID"),
          parseFloat(data.total).toLocaleString("id-ID"),
        ];
        tableRows.push(rows);
      });
      const footer = [
        "",
        "",
        "",
        "",
        "",
        "",
        "Sub Total",
        parseFloat(
          table.map((data) => data.total).reduce((a, b) => a + b, 0)
        ).toLocaleString("id-ID"),
      ];
      footerRows.push(footer);
      let columnTabel = [
        "NO",
        "BARCODE",
        "JENIS BARANG",
        "TYPE",
        "SATUAN",
        "QTY",
        "HARGA SATUAN",
        "TOTAL",
      ];
      // INISIALISASI SELESAI -> PANGGIL AXIOS DAN PANGGIL PRINT SAAT AXIOS BERHASIL

      AxiosMasterPost("terima-barang-supplier/post-transaksi-tunai", data)
        .then(() => NotifSucces("Berhasil Melakukan Pembayaran Cash"))
        .then(() =>
          CetakNota(
            "NO TERIMA",
            localStorage.getItem("penerimaan_kode_terima"),
            "TANGGAL",
            localStorage.getItem("penerimaan_tanggal_invoice") ||
              getToday(true),
            "NO BON",
            localStorage.getItem("penerimaan_no_bon"),
            "SUPPLIER",
            localStorage.getItem("penerimaan_kode_supplier"),
            getUserData().user_name,
            getToday(true),
            getUserData().user_name,
            columnTabel,
            "BUKTI PENERIMAAN BARANG SUPPLIER",
            tableRows,
            footerRows,
            localStorage.getItem("penerimaan_discount"),
            hasil.cash,
            true
          )
        )
        .then(() =>
          multipleDeleteLocal([
            "PenerimaanSupplier_temp",
            "PenerimaanSupplier_temp_kirim",
            "penerimaan_keterangan",
            "penerimaan_kode_supplier",
            "penerimaan_no_bon",
            "penerimaan_kode_terima",
            "penerimaan_tanggal_barang",
            "penerimaan_tanggal_invoice",
            "penerimaan_discount",
            "noFaktur",
          ])
        )
        .then(() => this.props.dispatch(reset("HeadSupplierPenerimaan")))
        .then(() => this.getKodePenerimaan())
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getFaktur()))
        .then(() => this.props.dispatch(getListTerimaSupplier()))
        .catch((err) => NotifError(err.response.data));
    }
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Penerimaan Supplier</li>
        </ol>
        <h1 className="page-header">Penerimaan Supplier </h1>
        <div className="row">
          <div className="col-lg-12">
            <Panel>
              <PanelHeader>Penerimaan Supplier</PanelHeader>
              <PanelBody>
                <br />
                <div className="col-lg-12">
                  <HeadSupplierPenerimaan
                    onSubmit={(data) => this.handleHead(data)}
                    listterimasupplier={this.props.listterimasupplier}
                    sub_total={this.props.sub_total}
                    showTambah={() => this.showTambah()}
                  />
                </div>
                <br />

                {/* End Tambah Master Kategori  */}
              </PanelBody>
            </Panel>
            <ModalGlobal
              content={
                <Suspense fallback={<Skeleton width={"100%"} height={300} />}>
                  {this.state.bayar ? (
                    <ModalBayarSupplierPenerimaan
                      onSubmit={(data) => this.handleCash(data)}
                    />
                  ) : (
                    <ModalSupplierPenerimaan
                      onSubmit={(data) => this.handleModal(data)}
                    />
                  )}
                </Suspense>
              }
              title={
                this.state.bayar
                  ? "Pembayaran Cash"
                  : "Tambah Barang Penerimaan Supplier"
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

SupplierPenerimaan = reduxForm({
  form: "SupplierPenerimaan",
  enableReinitialize: true,
})(SupplierPenerimaan);
export default connect(maptostate, null)(SupplierPenerimaan);
