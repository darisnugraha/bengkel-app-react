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
  editKunci,
  editKwalitas,
  getKunci,
  hideModal,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import Skeleton from "react-loading-skeleton";
import { AxiosMasterDelete, AxiosMasterPost, AxiosMasterPut } from "../../../axios.js";
import { reset } from "redux-form";
import Tabel from "../../../components/Tabel/tabel.jsx";
const FormModalKunci = lazy(() => import("./FormModalKunci.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listkunci: state.datamaster.listkunci,
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
      AxiosMasterDelete("kunci/delete/by-kode-kunci/"+params)
      .then(()=> NotifSucces("Data Berhasil Di Hapus"))
      .then(()=> window.location.reload())
      
    }
  });
};
class MasterKunci extends React.Component {
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
          dataField: "kode_kunci",
          text: "Kode Kunci",
          sort: true,
        },
        {
          dataField: "nama_kunci",
          text: "Nama Kunci",
        },
        {
          dataField: "ukuran",
          text: "Ukuran kunci",
        },
        {
          dataField: "merk_kunci",
          text: "Merk Kunci",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_jenis_kunci: row.kode_jenis_kunci,
              kode_kunci: row.kode_kunci,
              nama_kunci: row.nama_kunci,
              merk_kunci: row.merk_kunci,
              ukuran: row.ukuran,
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
                      hapusDataKategori(row.kode_kunci, this.props.dispatch)
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
          kode_kunci: "C001",
          nama_kunci: "KUNCI PAS",
          merk_kunci: "SIMBADA",
          ukuran_kunci: "20",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getKunci());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editKunci(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editKwalitas(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_jenis_kunci: hasil.kode_jenis_kunci || "-",
      kode_kunci: hasil.kode_kunci || "-",
      nama_kunci: hasil.nama_kunci || "-",
      merk_kunci: hasil.merk_kunci || "-",
      ukuran: hasil.ukuran_kunci || "-",
    };
    let dataEdit = {
      kode_jenis_kunci: hasil.kode_jenis_kunci || "-",
      nama_kunci: hasil.nama_kunci || "-",
      merk_kunci: hasil.merk_kunci || "-",
      ukuran: hasil.ukuran_kunci || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
          "kunci/update/by-kode-kunci/" + hasil.kode_kunci || "-",
          dataEdit
        )
          .then(() => NotifSucces("Berhasil Dirubah"))
          .then(() => this.props.dispatch(reset("dataKunci")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getKunci()))
          .catch(() =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
            )
          )
      : AxiosMasterPost("kunci/add", data)
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataKunci")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getKunci()))
          .catch((err) => this.handleReactive(err, hasil.kode_kunci, dataEdit));
  }
  handleReactive(err, kode, data) {
    this.props.dispatch(hideModal());
    let error = err.response.data;
    let check = error.includes("hapus");
    check
      ? reactive(
          err,
          kode,
          "kunci/reactive/by-kode-kunci/",
          data,
          "kunci/update/by-kode-kunci/"
        ).then(() => this.props.dispatch(getKunci()))
      : NotifError("Data Gagal Ditambahkan");
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Kunci</li>
        </ol>
        <h1 className="page-header">Master Kunci </h1>
        <Panel>
          <PanelHeader>Master Kunci</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_kunci"
                data={this.props.listkunci || []}
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
            title={this.state.isEdit ? "Edit Data Kunci" : "Tambah Data Kunci"}
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalKunci
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

export default connect(maptostate, null)(MasterKunci);
