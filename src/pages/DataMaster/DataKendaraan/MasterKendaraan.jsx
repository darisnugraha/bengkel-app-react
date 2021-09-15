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
  editKendaraan,
  getKendaraan,
  showModal,
  hideModal,
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
const FormModalKendaraan = lazy(() => import("./FormModalKendaraan.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listkendaraan: state.datamaster.listkendaraan,
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
      AxiosMasterDelete(
        "merk-kendaraan/delete/" + params
      ).then(() =>
        NotifSucces("Berhasil Menghapus Data")
          .then(() => dispatch(getKendaraan()))
          .catch(() =>
            NotifError(
              "Seperitnya ada kesalahan, Silahkan Ulangi Beberapa Saat lagi"
            )
          )
      );
    }
  });
};
class MasterKendaraan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_merk_kendaraan",
          text: "Kode Merk Kendaraan",
          sort: true,
        },
        {
          dataField: "nama_merk_kendaraan",
          text: "Nama Merk Kendaraan",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              merk_kendaraan: row.kode_merk_kendaraan,
              nama_kendaraan: row.nama_merk_kendaraan,
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
                        row.kode_merk_kendaraan,
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
          merk_kendaraan: "YMH",
          nama_kendaraan: "YAMAHA",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getKendaraan());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editKendaraan(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editKendaraan(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_merk_kendaraan: hasil.merk_kendaraan || "-",
      nama_merk_kendaraan: hasil.nama_kendaraan || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
          "merk-kendaraan/update/by-kode-merk-kendaraan/" +
            hasil.merk_kendaraan,
          { nama_merk_kendaraan: hasil.nama_kendaraan }
        )
          .then(() => NotifSucces("Berhasil Dirubah"))
          .then(() => this.props.dispatch(reset("dataKendaraan")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getKendaraan()))
          .catch(() =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
            )
          )
      : AxiosMasterPost("merk-kendaraan/add", data)
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataKendaraan")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getKendaraan()))
          .catch((err) =>
            this.handleReactive(err, hasil.merk_kendaraan, {
              nama_merk_kendaraan: hasil.nama_kendaraan,
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
          "merk-kendaraan/reactive/",
          data,
          "merk-kendaraan/update/by-kode-merk-kendaraan/"
        ).then(() => this.props.dispatch(getKendaraan()))
      : NotifError("Data Gagal Ditambahkan");
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Merk Kendaraan</li>
        </ol>
        <h1 className="page-header">Master Merk Kendaraan </h1>
        <Panel>
          <PanelHeader>Master Merk Kendaraan</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_kategori"
                data={this.props.listkendaraan || []}
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
              this.state.isEdit
                ? "Edit Data Kendaraan"
                : "Tambah Data Kendaraan"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalKendaraan
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

export default connect(maptostate, null)(MasterKendaraan);
