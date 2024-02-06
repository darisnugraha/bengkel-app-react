import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import ModalGlobal from "../../ModalGlobal.jsx";
import {
  NotifSucces,
  ToastError,
} from "../../../components/notification/notification.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import HeadKonversiBarang from "./HeadKonversiBarang.jsx";
import {
  getSelfing,
  getSupplier,
  hideModal,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action.jsx";
import CetakNota from "../CetakNota.jsx";
import {
  getKonversiTemp,
  getNoKonversi,
} from "../../../actions/stocking_action.jsx";
import { AxiosMasterPost } from "../../../axios.js";
import Tabel from "../../../components/Tabel/tabel.jsx";
import {
  getToday,
  multipleDeleteLocal,
} from "../../../components/notification/function.jsx";
import { reset } from "redux-form";

const ModalKonversiBarang = lazy(() => import("./ModalKonversiBarang.jsx"));

const maptostate = (state) => {
  return {
    konversi_temp: state.stocking.konversi_temp,
  };
};
class KonversiBarang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_asal",
          text: "Kode Asal",
          sort: true,
        },
        // {
        //   dataField: "nama_barang_asal",
        //   text: "Nama Barang",
        // },
        {
          dataField: "qty_asal",
          text: "Qty",
        },
        // {
        //   dataField: "satuan_asal",
        //   text: "Satuan",
        // },
        {
          dataField: "kode_tujuan",
          text: "Kode Tujuan",
        },
        // {
        //   dataField: "nama_barang_tujuan",
        //   text: "Nama Barang",
        // },
        {
          dataField: "qty_tujuan",
          text: "Qty",
        },
        // {
        //   dataField: "satuan_tujuan",
        //   text: "Satuan",
        // },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_asal: row.kode_asal,
              nama_barang_asal: row.nama_barang,
              qty_asal: row.qty,
              satuan_asal: row.satuan,
              kode_tujuan: row.kode_tujuan,
              nama_barang_tujuan: row.nama_barang,
              qty_tujuan: row.qty,
              satuan_tujuan: row.satuan,
            };

            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    onClick={() => this.editModal(dataEdit)}
                    className="btn btn-warning mr-3"
                  >
                    Edit
                    <i className="fa fa-edit ml-2"></i>
                  </button>
                  <button
                    onClick={() => this.deleteBarang(row)}
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
  deleteBarang(row) {
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
          JSON.parse(localStorage.getItem("KonversiBarang_temp")) || [];
        let hasil = data.findIndex((item) => item.kode_asal === row.kode_asal);
        data.splice(hasil, 1);
        localStorage.setItem("KonversiBarang_temp", JSON.stringify(data) || []);
        // deleteLocalItemBarcode("PermintaanBarang_temp", row.kode_barcode);
        this.props.dispatch(getKonversiTemp());
      }
    });
  }
  componentDidMount() {
    this.props.dispatch(getKonversiTemp());
    this.props.dispatch(getSelfing());
    this.props.dispatch(getSupplier());
  }
  handleSubmit(hasil) {
    let array = JSON.parse(localStorage.getItem("KonversiBarang_temp")) || [];
    let data = {
      kode_asal: hasil.kode_asal,
      nama_barang_asal: hasil.nama_barang_asal,
      qty_asal: hasil.qty_asal,
      satuan_asal: hasil.satuan_asal,
      kode_tujuan: hasil.kode_tujuan,
      nama_barang_tujuan: hasil.nama_barang_tujuan,
      qty_tujuan: hasil.qty_tujuan,
      satuan_tujuan: hasil.satuan_tujuan,
    };

    array.push(data);
    localStorage.setItem("KonversiBarang_temp", JSON.stringify(array));
    NotifSucces("Berhasil Menambahan Data")
      .then(() => this.props.dispatch(getKonversiTemp()))
      .then(() => this.props.dispatch(hideModal()));
  }
  sendData(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      no_pindah: hasil.no_pindah,
      tanggal: hasil.tanggal,
      kode_lokasi_shelving: hasil.lokasi,
      kode_supplier: hasil.supplier,
      detail_barang:
        JSON.parse(localStorage.getItem("KonversiBarang_temp")) || [],
    };
    console.log(data);
    // INISIALISASI AUTOTABLE
    const tableRows = [];
    let table = JSON.parse(localStorage.getItem("KonversiBarang_temp"));
    table.forEach((data, i) => {
      const rows = [
        ++i,
        data.kode_asal,
        // data.nama_barang_asal,
        data.qty_asal,
        // data.satuan_asal,
        data.kode_tujuan,
        // data.nama_barang_tujuan,
        data.qty_tujuan,
        // data.satuan_tujuan,
      ];
      tableRows.push(rows);
    });
    let columnTabel = [
      "NO",
      "KODE ASAL",
      // "NAMA BARANG",
      "QTY",
      // "SAT",
      "KODE TUJUAN",
      // "NAMA BARANG",
      "QTY",
      // "SAT",
    ];
    // INISIALISASI SELESAI -> PANGGIL AXIOS DAN PANGGIL PRINT SAAT AXIOS BERHASIL
    AxiosMasterPost("konversi-barang/post-transaksi", data)
      .then(() =>
        CetakNota(
          "Tanggal",
          hasil.tanggal,
          "",
          "",
          "No Bukti",
          hasil.no_konversi,
          "",
          "",
          "ADMIN",
          getToday(true),
          "ADMIN",
          columnTabel,
          "KONVERSI BARANG",
          tableRows,
          [],
          false
        )
      )
      .then(() => NotifSucces("Berhasil Konversi barang"))
      .then(() =>
        multipleDeleteLocal([
          "no_pindah",
          "lokasi_pilihan",
          "supplier_pilihan",
          "KonversiBarang_temp",
        ])
      )
      .then(() => this.props.dispatch(getKonversiTemp()))
      .then(() => this.props.dispatch(reset("konversiBarang")))
      .then(() => this.props.dispatch(getNoKonversi()))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(`Error : ${err}`).then(() => this.props.dispatch(onFinish()))
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Stocking</Link>
          </li>
          <li className="breadcrumb-item active">Konversi Barang</li>
        </ol>
        <h1 className="page-header">Konversi Barang </h1>
        <Panel>
          <PanelHeader>Konversi Barang</PanelHeader>
          <PanelBody>
            <br />
            <div className="col-lg-12">
              <HeadKonversiBarang onSubmit={(data) => this.sendData(data)} />
            </div>
            {/* Master Kategori */}

            <div className="col-lg-12">
              <Tabel
                empty={true}
                data={this.props.konversi_temp}
                columns={this.state.columns}
                keyField="kode_asal"
                textEmpty="Silahkan pilih Lokasi -> lalu pilih Supplier -> lalu tambah barang"
              />
            </div>

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
                  <ModalKonversiBarang
                    onSubmit={(data) => this.handleSubmit(data)}
                    onSend={this.props.onSend}
                    isEdit={this.state.isEdit}
                  />
                </Suspense>
              }
            />

            {/* End Tambah Master Kategori  */}
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(KonversiBarang);
