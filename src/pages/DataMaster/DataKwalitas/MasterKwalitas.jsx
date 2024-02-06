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
  editKwalitas,
  getKwalitas,
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
const FormModalKwalitas = lazy(() => import("./FormModalKwalitas.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listkwalitas: state.datamaster.listkwalitas,
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
      AxiosMasterDelete("kwalitas/delete/" + params)
        .then(() => dispatch(hideModal()))
        .then(() => dispatch(getKwalitas()))
        .then(() => NotifSucces("Data Terhapus"));
    }
  });
};
class MasterKwalitas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_kwalitas",
          text: "Kode Kualitas",
          sort: true,
        },
        {
          dataField: "nama_kwalitas",
          text: "Nama Kualitas",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_kwalitas: row.kode_kwalitas,
              nama_kwalitas: row.nama_kwalitas,
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
                      hapusDataKategori(row.kode_kwalitas)
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
          kode_kwalitas: "KW001",
          nama_kwalitas: "ORIGINAL",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getKwalitas());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editKwalitas(data));
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
      kode_kwalitas: hasil.kode_kwalitas || "-",
      nama_kwalitas: hasil.nama_kwalitas || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
        "kwalitas/update/by-kode-kwalitas/" + hasil.kode_kwalitas || "-",
        { nama_kwalitas: hasil.nama_kwalitas }
      )
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("dataKwalitas")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getKwalitas()))
        .catch(() =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("kwalitas/add", data)
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(reset("dataKwalitas")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getKwalitas()))
        .catch((err) =>
          this.handleReactive(err, hasil.kode_kwalitas, {
            nama_kwalitas: hasil.nama_kwalitas,
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
        "kwalitas/reactive/",
        data,
        "kwalitas/update/by-kode-kwalitas/"
      ).then(() => this.props.dispatch(getKwalitas()))
      : NotifError("Data Gagal Ditambahkan");
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Kualitas</li>
        </ol>
        <h1 className="page-header">Master Kualitas </h1>
        <Panel>
          <PanelHeader>Master Kualitas</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_kwalitas"
                data={this.props.listkwalitas || []}
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
              this.state.isEdit ? "Edit Data Kualitas" : "Tambah Data Kualitas"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalKwalitas
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

export default connect(maptostate, null)(MasterKwalitas);
