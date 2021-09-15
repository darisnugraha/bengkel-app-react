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
  editRak,
  getRak,
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
const FormModalRak = lazy(() => import("./FormModalRak.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listrak: state.datamaster.listrak,
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
      AxiosMasterDelete("lokasi-rak/delete/" + params)
        .then(() => dispatch(getRak()))
        .then(() => NotifSucces("Data Berhasil Di Hapus"))
        .catch(() => NotifError("Sepertinya ada yang error"));
    }
  });
};
class MasterRak extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_lokasi_gudang",
          text: "Kode Gudang",
          sort: true,
        },
        {
          dataField: "kode_lokasi_rak",
          text: "Kode Rak",
        },
        {
          dataField: "nama_lokasi_rak",
          text: "Nama Rak",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_gudang: row.kode_lokasi_gudang,
              kode_rak: row.kode_lokasi_rak,
              nama_rak: row.nama_lokasi_rak,
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
                        row.kode_lokasi_rak, this.props.dispatch
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
          kode_gudang: "RAK001",
          nama_gudang: "RAK 1",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getRak());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editRak(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editRak(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_lokasi_gudang: hasil.kode_gudang || "-",
      kode_lokasi_rak: hasil.kode_rak || "-",
      nama_lokasi_rak: hasil.nama_rak || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
          "lokasi-rak/update/by-kode-lokasi-rak/" + hasil.kode_rak || "-",
          {
            kode_lokasi_gudang: hasil.kode_gudang || "-",

            nama_lokasi_rak: hasil.nama_rak || "-",
          }
        )
          .then(() => NotifSucces("Berhasil Dirubah"))
          .then(() => this.props.dispatch(reset("")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getRak()))
          .catch(() =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
            )
          )
      : AxiosMasterPost("lokasi-rak/add", data)
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataRak")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getRak()))
          .catch((err) =>
            this.handleReactive(err, hasil.kode_rak, {
              kode_lokasi_gudang: hasil.kode_gudang || "-",
              nama_lokasi_rak: hasil.nama_rak || "-",
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
          "lokasi-rak/reactive/",
          data,
          "lokasi-rak/update/by-kode-lokasi-rak/"
        ).then(() => this.props.dispatch(getRak()))
      : NotifError("Data Gagal Ditambahkan");
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Rak</li>
        </ol>
        <h1 className="page-header">Master Rak </h1>
        <Panel>
          <PanelHeader>Master Rak</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_lokasi_rak"
                data={this.props.listrak || []}
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
            title={this.state.isEdit ? "Edit Data Rak" : "Tambah Data Rak"}
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalRak
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

export default connect(maptostate, null)(MasterRak);
