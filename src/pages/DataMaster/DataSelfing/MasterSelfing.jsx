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
  editSelfing,
  getSelfing,
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

const FormModalSelfing = lazy(() => import("./FormModalSelfing.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listselfing: state.datamaster.listselfing,
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
      AxiosMasterDelete("lokasi-selving/delete/" + params)
        .then(() => NotifSucces("Data Berhasil Di Hapus"))
        .then(() => dispatch(getSelfing()));
    }
  });
};
class MasterSelfing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_lokasi_rak",
          text: "Kode Rak",
          sort: true,
        },
        {
          dataField: "kode_lokasi_selving",
          text: "Kode Shelving",
        },
        {
          dataField: "nama_lokasi_selving",
          text: "Nama Shelving",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_rak: row.kode_lokasi_rak,
              kode_selving: row.kode_lokasi_selving,
              nama_selving: row.nama_lokasi_selving,
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
                        row.kode_lokasi_selving, this.props.dispatch
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
          kode_rak: "RAK001",
          nama_selving: "RAK 1",
          kode_selving: "RAK 1",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getSelfing());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editSelfing(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editSelfing(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_lokasi_rak: hasil.kode_rak || "-",
      kode_lokasi_selving: hasil.kode_selving || "-",
      nama_lokasi_selving: hasil.nama_selving || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
          "lokasi-selving/update/by-kode-lokasi-selving/" + hasil.kode_selving,
          {
            kode_lokasi_rak: hasil.kode_rak || "-",
            nama_lokasi_selving: hasil.nama_selving || "-",
          }
        )
          .then(() => NotifSucces("Berhasil Dirubah"))
          .then(() => this.props.dispatch(reset("")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getSelfing()))
          .catch(() =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
            )
          )
      : AxiosMasterPost("lokasi-selving/add", data)
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataSelving")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getSelfing()))
          .catch((err) =>
            this.handleReactive(err, hasil.kode_selving, {
              kode_lokasi_rak: hasil.kode_rak,
              nama_lokasi_selving: hasil.nama_selving,
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
          "lokasi-selving/reactive/",
          data,
          "lokasi-selving/update/by-kode-lokasi-selving/"
        ).then(() => this.props.dispatch(getSelfing()))
      : NotifError("Data Gagal Ditambahkan");
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Shelving</li>
        </ol>
        <h1 className="page-header">Master Shelving </h1>
        <Panel>
          <PanelHeader>Master Shelving</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_lokasi_selving"
                data={this.props.listselfing || []}
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
              this.state.isEdit ? "Edit Data Selving" : "Tambah Data Selving"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalSelfing
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

export default connect(maptostate, null)(MasterSelfing);
