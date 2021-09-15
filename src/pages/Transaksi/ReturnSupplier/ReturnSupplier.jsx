import React, { Component, lazy } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import ModalGlobal from "../../ModalGlobal";
import { reduxForm, reset } from "redux-form";
import { simpanLocal } from "../../../config/Helper";
import { getListReturnSupplier } from "../../../actions/transaksi_action";
import { connect } from "react-redux";
import CetakNota from "../../Stoking/CetakNota";
import {
  getUserData,
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios";
import { multipleDeleteLocal } from "../../../components/notification/function";
import { onFinish, onProgress } from "../../../actions/datamaster_action";

const HeadReturnSupplier = lazy(() =>
  import("../ReturnSupplier/HeadReturnSupplier")
);
const ModalReturnSupplier = lazy(() => import("./ModalReturnSupplier"));
const maptostate = (state) => {
  return {
    listreturnsupplier: state.transaksi.listreturnsupplier,
    sub_total: state.transaksi.sub_total,
  };
};
class SupplierPenerimaan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getListReturnSupplier());
    this.getKodeReturn();
  }
  handleHead(hasil) {
    this.props.dispatch(onProgress());
    console.log("aku",hasil);
    let data = {
      no_retur_supplier: hasil.kode_return,
      tanggal_retur: hasil.tanggal,
      no_bon: hasil.no_bon,
      kode_supplier: hasil.kode_supplier,
      keterangan: hasil.keterangan,
      diskon_rp: hasil.discount || 0,
      detail_barang:
        JSON.parse(localStorage.getItem("ReturnSupplier_temp_kirim")) || [],
    };
    console.log(data);
    // return false;
    // INISIALISASI AUTOTABLE
    const tableRows = [];
    const footerRows = [];
    let table = JSON.parse(localStorage.getItem("ReturnSupplier_temp"));
    table.forEach((data, i) => {
      const rows = [
        ++i,
        data.kode_barcode,
        data.nama_barang,
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
      "TYPE",
      "SATUAN",
      "QTY",
      "HARGA SATUAN",
      "TOTAL",
    ];
    // INISIALISASI SELESAI -> PANGGIL AXIOS DAN PANGGIL PRINT SAAT AXIOS BERHASIL
    AxiosMasterPost("retur-barang-supplier/post-transaksi", data)
      .then(() => NotifSucces("Berhasil"))
      .then(() =>
        CetakNota(
          "NO RETURN",
          hasil.kode_return,
          "TANGGAL",
          hasil.tanggal,
          "NO BON",
          hasil.no_bon,
          "SUPP",
          hasil.kode_supplier,
          getUserData().user_name,
          "01-28-2021",
          getUserData().user_name,
          columnTabel,
          "BUKTI RETURN BARANG SUPPLIER",
          tableRows,
          footerRows,
          true
        )
      )
      .then(() =>
        multipleDeleteLocal([
          "ReturnSupplier_temp",
          "ReturnSupplier_temp_kirim",
          "return_supplier",
          "return_keterangan",
          "return_tanggal_bon",
          "return_kode",
        ])
      )
      .then(() => this.props.dispatch(reset("HeadSupplierPenerimaan")))
      .then(() => this.getKodeReturn())
      .then(() => this.props.dispatch(getListReturnSupplier()))
      .then(() => this.props.dispatch(onFinish()))
      // .then(() => window.location.reload())
      .catch((err) =>
        NotifError(err.response.data).then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }

  getKodeReturn() {
    AxiosMasterGet("retur-barang-supplier/generate/no-trx")
      .then((res) =>
        localStorage.setItem("kode_return", res.data[0].no_retur_supplier)
      )
      .catch((err) => console.log(err));
  }
  handleModal(hasil) {
    let local =
      JSON.parse(localStorage.getItem("ReturnSupplier_temp_kirim")) || [];
    let local2 = JSON.parse(localStorage.getItem("ReturnSupplier_temp")) || [];
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
        harga_total:
          parseFloat(hasil.total) + parseFloat(local[filtered].harga_total),
      };
      let dataTable = {
        harga_satuan: hasil.harga_satuan,
        kode_barcode: hasil.kode_barcode,
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
      localStorage.setItem("ReturnSupplier_temp", JSON.stringify(local2));
      localStorage.setItem("ReturnSupplier_temp_kirim", JSON.stringify(local));
      NotifSucces("Berhasil");
      this.props.dispatch(reset("ModalReturnSupplier"));
      this.props.dispatch(getListReturnSupplier());
    } else {
      let data = {
        kode_barcode: hasil.kode_barcode,
        qty: parseInt(hasil.qty),
        harga_satuan: parseFloat(hasil.harga_satuan),
        harga_total: parseFloat(hasil.total),
      };
      let dataTable = {
        harga_satuan: hasil.harga_satuan,
        kode_barcode: hasil.kode_barcode,
        nama_barang: hasil.nama_barang,
        qty: hasil.qty,
        satuan: hasil.satuan,
        harga_total: hasil.total,
        type: hasil.type,
      };
      simpanLocal("ReturnSupplier_temp", dataTable)
        .then(() => this.props.dispatch(reset("ModalReturnSupplier")))
        .then(() => this.props.dispatch(getListReturnSupplier()));
      simpanLocal("ReturnSupplier_temp_kirim", data)
        .then(() => this.props.dispatch(reset("ModalReturnSupplier")))
        .then(() => this.props.dispatch(getListReturnSupplier()));
    }
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Return Barang Supplier</li>
        </ol>
        <h1 className="page-header">Return Barang Supplier</h1>
        <div className="row">
          <div className="col-lg-12">
            <Panel>
              <PanelHeader>Return Barang Supplier</PanelHeader>
              <PanelBody>
                <br />
                <div className="col-lg-12">
                  <HeadReturnSupplier
                    onSubmit={(data) => this.handleHead(data)}
                    listreturnsupplier={this.props.listreturnsupplier}
                    sub_total={this.props.sub_total}
                  />
                </div>
                <br />

                {/* End Tambah Master Kategori  */}
              </PanelBody>
            </Panel>
            <ModalGlobal
              title="Return Barang Supplier"
              content={
                <ModalReturnSupplier
                  onSubmit={(data) => this.handleModal(data)}
                />
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
