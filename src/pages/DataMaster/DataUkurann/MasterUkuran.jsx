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
  editUkuran,
  getFaktur,
  getUkuran,
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
const FormModalUkuran = lazy(() => import("./FormModalUkuran.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    noFaktur: state.datamaster.noFaktur,
    listukuran: state.datamaster.listukuran,
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
        "ukuran/delete/by-kode-ukuran/" + params
      )
        .then(() => dispatch(hideModal()))
        .then(() => dispatch(getUkuran()))
        .then(() => NotifSucces("Data Berhasil Dihapus"));
    }
  });
};
class MasterUkuran extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_ukuran",
          text: "Kode Ukuran",
          sort: true,
        },
        {
          dataField: "nama_ukuran",
          text: "Nama Ukuran",
          sort: true,
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_ukuran: row.kode_ukuran,
              nama_ukuran: row.nama_ukuran,
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
                      hapusDataKategori(row.kode_ukuran, this.props.dispatch)
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
          nama_parameter: "LISTRIK",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getUkuran());
    this.props.dispatch(getFaktur());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editUkuran(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editUkuran(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_ukuran: hasil.kode_ukuran || "-",
      nama_ukuran: hasil.nama_ukuran || "-",
    };
    let dataEdit = {
      nama_ukuran: hasil.nama_ukuran || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
        this.props.dispatch,
        "ukuran/update/by-kode-ukuran/" + hasil.kode_ukuran,
        dataEdit
      )
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("dataUkuran")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getUkuran()))
        .catch((err) =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("ukuran/add", data)
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(reset("dataUkuran")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getUkuran()))
        .catch((err) =>
          this.handleReactive(err, hasil.kode_ukuran, {
            nama_ukuran: hasil.nama_ukuran,
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
        "ukuran/reactive/by-kode-ukuran/",
        data,
        "ukuran/update/by-kode-ukuran/"
      ).then(() => this.props.dispatch(getUkuran()))
      : NotifError("Data Gagal Ditambahkan");
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Ukuran</li>
        </ol>
        <h1 className="page-header">Master Ukuran </h1>
        <Panel>
          <PanelHeader>Master Ukuran</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_ukuran"
                data={this.props.listukuran || []}
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
                ? "Edit Data Parameter Transaksi"
                : "Tambah Data Parameter Transaksi"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalUkuran
                  onSubmit={(data) => this.handleSubmit(data)}
                  onSend={this.props.onSend}
                  isEdit={this.state.isEdit}
                  noFaktur={this.props.noFaktur}
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

export default connect(maptostate, null)(MasterUkuran);
