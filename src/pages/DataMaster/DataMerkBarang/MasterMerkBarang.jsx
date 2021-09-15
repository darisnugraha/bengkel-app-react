import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  NotifError,
  NotifSucces,
  reactive,
} from "../../../components/notification/notification.jsx";
import {
  editMerkBarang,
  getMerkBarang,
  hideModal,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import Skeleton from "react-loading-skeleton";
import {
  AxiosMasterDelete,
  AxiosMasterPost,
  AxiosMasterPut,
} from "../../../axios.js";
import { reset } from "redux-form";
import Tabel from "../../../components/Tabel/tabel.jsx";
const FormModalMerkBarang = lazy(() => import("./FormModalMerkBarang.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listmerkbarang: state.datamaster.listmerkbarang,
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
      AxiosMasterDelete("merk-barang/delete/" + params)
        .then(() => NotifSucces("Data Berhasil Di Hapus"))
        .then(() => dispatch(getMerkBarang()));
    }
  });
};
class MasterMerkBarang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_merk_barang",
          text: "Kode Merk Barang",
          sort: true,
        },
        {
          dataField: "nama_merk_barang",
          text: "Nama Merk Barang",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_merk_barang: row.kode_merk_barang,
              nama_merk_barang: row.nama_merk_barang,
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
                      hapusDataKategori(
                        row.kode_merk_barang,
                        this.props.dispatch
                      )
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
      datakategori: [
        {
          merk_barang: "YMH",
          nama_barang: "YAMAHA",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getMerkBarang());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editMerkBarang(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editMerkBarang(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_merk_barang: hasil.merk_barang || "-",
      nama_merk_barang: hasil.nama_barang || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
          this.props.dispatch,
          "merk-barang/update/by-kode-merk-barang/" + hasil.merk_barang || "-",
          { nama_merk_barang: hasil.nama_barang }
        )
          .then(() => NotifSucces("Berhasil Dirubah"))
          .then(() => this.props.dispatch(reset("dataBarang")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getMerkBarang()))
          .catch(() =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
            )
          )
      : AxiosMasterPost("merk-barang/add", data)
          .then(() => this.props.dispatch(reset("dataBarang")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getMerkBarang()))
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .catch((err) =>
            this.handleReactive(err, hasil.merk_barang, {
              nama_merk_barang: hasil.nama_barang,
            })
          );
  }
  handleReactive(err, kode, data) {
    this.props.dispatch(hideModal());
    let error = err.response.data;
    let check = error.includes("hapus");

    check
      ? reactive(
          err,
          kode,
          "merk-barang/reactive/",
          data,
          "merk-barang/update/by-kode-merk-barang/"
        ).then(() => this.props.dispatch(getMerkBarang()))
      : NotifError("Data Gagal Ditambahkan");
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Barang</li>
        </ol>
        <h1 className="page-header">Master Barang </h1>
        <Panel>
          <PanelHeader>Master Barang</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_kategori"
                data={this.props.listmerkbarang || []}
                columns={this.state.columns}
                CSVExport
                tambahData={true}
                handleClick={() => this.tambahModal()}
              />
            </div>
            <br />
            {/* End Master Kategori */}
          </PanelBody>
          <ModalGlobal
            title={
              this.state.isEdit ? "Edit Data Barang" : "Tambah Data Barang"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalMerkBarang
                  onSubmit={(data) => this.handleSubmit(data)}
                  onSend={this.props.onSend}
                  isEdit={this.state.isEdit}
                />
              </Suspense>
            }
          />

          {/* End Tambah Master Kategori  */}
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(MasterMerkBarang);
