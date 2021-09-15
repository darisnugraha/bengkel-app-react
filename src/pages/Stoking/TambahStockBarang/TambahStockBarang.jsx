import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import ModalGlobal from "../../ModalGlobal.jsx";
import {
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import {
  hideModal,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action.jsx";
import CetakNota from "../CetakNota.jsx";
import {
  getHancurTemp,
  getTambahStockTemp,
} from "../../../actions/stocking_action.jsx";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios.js";
import Tabel from "../../../components/Tabel/tabel.jsx";
import { multipleDeleteLocal } from "../../../components/notification/function.jsx";
import { reset } from "redux-form";
import HeadTambahStockBarang from "./HeadTambahStockBarang.jsx";

const ModalTambahStockBarang = lazy(() =>
  import("./ModalTambahStockBarang.jsx")
);

const maptostate = (state) => {
  return {
    tambahStock_temp: state.stocking.tambahStock_temp,
  };
};
const hapusDataKategori = (row, dispatch) => {
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
      let data = JSON.parse(localStorage.getItem("TambahBarang_temp"));
      let data2 = JSON.parse(localStorage.getItem("TambahBarang_temp_kirim"));
      data.splice(row, 1);
      data2.splice(row, 1);
      localStorage.setItem("TambahBarang_temp", JSON.stringify(data));
      localStorage.setItem("TambahBarang_temp_kirim", JSON.stringify(data2));
      NotifSucces("Berhasil Menghapus Data");
      dispatch(getTambahStockTemp());
    }
  });
};
class TambahBarang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
          sort: true,
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        // {
        //   dataField: "merk",
        //   text: "Merk",
        // },
        // {
        //   dataField: "kwalitas",
        //   text: "Kualitas",
        // },
        {
          dataField: "satuan",
          text: "Satuan",
        },
        {
          dataField: "qty",
          text: "Qty",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row, rowIndex) => {
            let dataEdit = {
              kode_barcode: row.kode_barcode,
              nama_barang: row.nama_barang,
              // merk: row.merk,
              // kwalitas: row.kwalitas,
              satuan: row.satuan,
              qty: row.qty,
              harga_satuan: row.harga_satuan,
              total: row.total,
            };
            this.setState({});
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
                    onClick={() =>
                      hapusDataKategori(rowIndex, this.props.dispatch)
                    }
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

  componentDidMount() {
    this.props.dispatch(getTambahStockTemp());
    AxiosMasterGet("import-barang/generate/no-trx").then((res) =>
      localStorage.setItem("kode_tambah_stock", res.data[0].no_import_barang)
    );
  }
  handleSubmit(hasil) {
    let supplier = hasil.kode_supplier && hasil.kode_supplier.split("||");
    let array = JSON.parse(localStorage.getItem("TambahBarang_temp")) || [];
    let array_kirim =
      JSON.parse(localStorage.getItem("TambahBarang_temp_kirim")) || [];
    let data = {
      kode_barcode: hasil.kode_barcode,
      nama_barang: hasil.nama_barang,
      // merk: hasil.merk,
      // kwalitas: hasil.kwalitas,
      satuan: hasil.satuan,
      kode_supplier: supplier[0],
      qty: hasil.qty,
      kondisi: hasil.kondisi,
    };
    let data_kirim = {
      kode_barcode: hasil.kode_barcode,
      kode_supplier: supplier[0],
      qty: hasil.qty,
    };

    array.push(data);
    array_kirim.push(data_kirim);
    localStorage.setItem("TambahBarang_temp", JSON.stringify(array));
    localStorage.setItem(
      "TambahBarang_temp_kirim",
      JSON.stringify(array_kirim)
    );
    NotifSucces("Berhasil Menambahan Data")
      .then(() => this.props.dispatch(getTambahStockTemp()))
      .then(() => this.props.dispatch(hideModal()));
  }
  sendData(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      no_import_barang: localStorage.getItem("kode_tambah_stock") || "-",
      tanggal: hasil.tanggal,
      detail_barang:
        JSON.parse(localStorage.getItem("TambahBarang_temp_kirim")) || [],
    };
    console.log(data);
    // INISIALISASI AUTOTABLE
    const tableRows = [];
    let table = JSON.parse(localStorage.getItem("TambahBarang_temp"));
    table.forEach((hasil, i) => {
      const rows = [
        ++i,
        hasil.kode_barcode,
        hasil.nama_barang,
        // hasil.merk,
        // hasil.kwalitas,
        hasil.satuan,
        hasil.qty,
      ];
      tableRows.push(rows);
    });
    let columnTabel = [
      "NO",
      "BARCODE",
      "NAMA BARANG",
      // "MERK",
      // "KW",
      "SATUAN",
      "QTY",
    ];
    // INISIALISASI SELESAI -> PANGGIL AXIOS DAN PANGGIL PRINT SAAT AXIOS BERHASIL
    AxiosMasterPost("import-barang/post-transaksi", data)
      .then(() =>
        CetakNota(
          "Tanggal",
          hasil.tanggal,
          "Lokasi",
          hasil.lokasi,
          "No Bukti",
          hasil.no_pindah,
          "",
          "",
          "ADMIN",
          "01-28-2021",
          "ADMIN",
          columnTabel,
          "BUKTI TAMBAH STOK",
          tableRows,
          [],
          false
        )
      )
      .then(() => NotifSucces("Berhasil Hancur Barang"))
      .then(() =>
        multipleDeleteLocal([
          "TambahBarang_temp",
          "TambahBarang_temp_kirim",
          "kode_hancur",
          "lokasi_hancur",
        ])
      )
      .then(() => this.props.dispatch(reset("permintaanBarang")))
      .then(() => this.props.dispatch(getHancurTemp()))
      .then(() => this.props.dispatch(getTambahStockTemp()))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        NotifError(`Gagal Mengirim Data, Detail: ${err}`).then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Stocking</Link>
          </li>
          <li className="breadcrumb-item active">Tambah Stock Barang</li>
        </ol>
        <h1 className="page-header">Tambah Stock Barang </h1>
        <Panel>
          <PanelHeader>Tambah Stock Barang</PanelHeader>
          <PanelBody>
            <br />
            <div className="col-lg-12">
              <HeadTambahStockBarang onSubmit={(data) => this.sendData(data)} />
            </div>
            {/* Master Kategori */}

            <div className="col-lg-12">
              <Tabel
                empty={true}
                keyField="kode_barcode"
                data={this.props.tambahStock_temp || []}
                columns={this.state.columns}
                CSVExport
                textEmpty="Silahkan Piilih Lokasi Gudang dan Tekan Tombol Kuning Untuk Menambah Data"
              />
            </div>

            <br />
            {/* End Master Kategori */}
            <ModalGlobal
              title={"Tambah Stock Barang"}
              content={
                <Suspense
                  fallback={<Skeleton width={"100%"} height={50} count={2} />}
                >
                  <ModalTambahStockBarang
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

export default connect(maptostate, null)(TambahBarang);
