import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import ModalGlobal from "../../ModalGlobal.jsx";
import { NotifSucces } from "../../../components/notification/notification.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { getKunciBarang } from "../../../actions/stocking_action.jsx";
import HeadKunciBarang from "./HeadKunciBarang.jsx";
import { reset } from "redux-form";
import { simpanLocal } from "../../../config/Helper.jsx";

const ModalKunciBarang = lazy(() => import("./ModalKunciBarang.jsx"));

const maptostate = (state) => {
  return {
    kunci_temp: state.stocking.kunci_temp,
  };
};
const hapusDataKategori = (params, dispatch) => {
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
      NotifSucces("Data Berhasil Di Hapus");
    }
  });
};
class KunciBarang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "id_mekanik",
          text: "ID Mekanik",
          sort: true,
        },
        {
          dataField: "nama_mekanik",
          text: "Nama Mekanik",
        },
        {
          dataField: "kode_kunci",
          text: "Kode kunci",
        },
        {
          dataField: "nama_kunci",
          text: "Nama Kunci",
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
          formatter: (rowcontent, row) => {
            let dataEdit = {
              id_mekanik: row.id_mekanik,
              nama_mekanik: row.nama_mekanik,
              kode_kunci: row.kode_kunci,
              nama_kunci: row.nama_kunci,
              qty: row.qty,
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
                    onClick={() =>
                      hapusDataKategori(row.kodeProvinsi, this.props.dispatch)
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
    this.props.dispatch(getKunciBarang());
  }
  handleSubmit(hasil) {
    let local =
      JSON.parse(localStorage.getItem("KunciBarang_temp_kirim")) || [];
    let local2 = JSON.parse(localStorage.getItem("KunciBarang_temp")) || [];
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
        kode_supplier: hasil.kode_supplier,
      };
      let dataTable = {
        kode_barcode: hasil.kode_barcode,
        nama_barang: hasil.nama_barang,
        merk_barang: hasil.merk,
        kwalitas: hasil.kwalitas,
        ukuran: hasil.ukuran,
        stock: hasil.stock,
        qty: parseInt(hasil.qty) + parseInt(local2[filtered2].qty),
      };
      local.splice(filtered, 1);
      local2.splice(filtered2, 1);
      local.push(data);
      local2.push(dataTable);
      localStorage.setItem("KunciBarang_temp", JSON.stringify(local2));
      localStorage.setItem("KunciBarang_temp_kirim", JSON.stringify(local));
      NotifSucces("Berhasil");
      this.props.dispatch(reset("ModalReturnSupplier"));
      this.props.dispatch(getKunciBarang());
    } else {
      let data = {
        kode_barcode: hasil.kode_barcode,
        qty: parseInt(hasil.qty),
        kode_supplier: hasil.kode_supplier,
      };
      let dataTable = {
        kode_barcode: hasil.kode_barcode,
        nama_barang: hasil.nama_barang,
        merk_barang: hasil.merk,
        kwalitas: hasil.kwalitas,
        ukuran: hasil.ukuran,
        stock: hasil.stock,
        qty: hasil.qty,
      };
      simpanLocal("KunciBarang_temp", dataTable)
        .then(() => this.props.dispatch(reset("ModalPermintaanBarang")))
        .then(() => this.props.dispatch(getKunciBarang()));
      simpanLocal("KunciBarang_temp_kirim", data)
        .then(() => this.props.dispatch(reset("ModalPermintaanBarang")))
        .then(() => this.props.dispatch(getKunciBarang()));
    }
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Kunci Barang</li>
        </ol>
        <h1 className="page-header">Kunci Barang </h1>
        <Panel>
          <PanelHeader>Kunci Barang</PanelHeader>
          <PanelBody>
            <HeadKunciBarang onSubmit={(data) => this.handleKirim(data)} />
            {/* End Master Kategori */}
            <ModalGlobal
              title={
                this.state.isEdit ? "Edit Data Kunci" : "Tambah Data Kunci"
              }
              content={
                <Suspense
                  fallback={<Skeleton width={"100%"} height={50} count={2} />}
                >
                  <ModalKunciBarang
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

export default connect(maptostate, null)(KunciBarang);
