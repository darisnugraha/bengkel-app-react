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
  editJenisKunci,
  getJenisKunci,
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
const FormModalJenisKunci = lazy(() => import("./FormModalJenisKunci.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listjeniskunci: state.datamaster.listjeniskunci,
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
        "jenis-kunci/delete/by-kode-jenis-kunci/" + params
      )
        .then(() => dispatch(hideModal()))
        .then(() => dispatch(getJenisKunci()))
        .then(() => NotifSucces("Berhasil Dihapus"));
    }
  });
};
class MasterJenisKunci extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_jenis_kunci",
          text: "Kode Jenis Kunci",
          sort: true,
        },
        {
          dataField: "nama_jenis_kunci",
          text: "Nama Jenis Kunci",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_jenis_kunci: row.kode_jenis_kunci,
              nama_jenis_kunci: row.nama_jenis_kunci,
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
                      hapusDataKategori(
                        row.kode_jenis_kunci,
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
          kode_jenis_kunci: "KC001",
          nama_jenis_kunci: "PAS UK.20",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getJenisKunci());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editJenisKunci(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editJenisKunci(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_jenis_kunci: hasil.kode_jenis_kunci || "-",
      nama_jenis_kunci: hasil.nama_jenis_kunci || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
        "jenis-kunci/update/by-kode-jenis-kunci/" + hasil.kode_jenis_kunci ||
        "-",
        { nama_jenis_kunci: hasil.nama_jenis_kunci }
      )
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("dataJenisKunci")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getJenisKunci()))
        .catch(() =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("jenis-kunci/add", data)
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(reset("dataJenisKunci")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getJenisKunci()))
        .catch((err) =>
          this.handleReactive(err, hasil.kode_jenis_kunci, {
            nama_jenis_kunci: hasil.nama_jenis_kunci,
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
        "satuan/reactive/",
        data,
        "satuan/update/by-kode-satuan/"
      ).then(() => this.props.dispatch(getJenisKunci()))
      : NotifError("Data Gagal Ditambahkan");
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Jenis Kunci</li>
        </ol>
        <h1 className="page-header">Master Jenis Kunci </h1>
        <Panel>
          <PanelHeader>Master Jenis Kunci</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_jenis_kunci"
                data={this.props.listjeniskunci || []}
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
                ? "Edit Data Jenis Kunci"
                : "Tambah Data Jenis Kunci"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalJenisKunci
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

export default connect(maptostate, null)(MasterJenisKunci);
