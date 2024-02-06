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
  editWarna,
  getFaktur,
  getWarna,
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
const FormModalWarna = lazy(() => import("./FormModalWarna.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    noFaktur: state.datamaster.noFaktur,
    listwarna: state.datamaster.listwarna,
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
        "warna/delete/by-kode-warna/" + params
      )
        .then(() => dispatch(hideModal()))
        .then(() => dispatch(getWarna()))
        .then(() => NotifSucces("Data Berhasil Dihapus"));
    }
  });
};
class MasterWarna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_warna",
          text: "Kode Warna",
          sort: true,
        },
        {
          dataField: "nama_warna",
          text: "Nama Warna",
          sort: true,
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_warna: row.kode_warna,
              nama_warna: row.nama_warna,
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
                      hapusDataKategori(row.kode_warna, this.props.dispatch)
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
    this.props.dispatch(getWarna());
    this.props.dispatch(getFaktur());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editWarna(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editWarna(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_warna: hasil.kode_warna,
      nama_warna: hasil.nama_warna,
    };
    let dataEdit = {
      nama_warna: hasil.nama_warna,
    };
    this.state.isEdit
      ? AxiosMasterPut(
        "warna/update/by-kode-warna/" + hasil.kode_warna,
        dataEdit
      )
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("dataWarna")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getWarna()))
        .catch((err) =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("warna/add", data)
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(reset("dataWarna")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getWarna()))
        .catch((err) =>
          this.handleReactive(err, hasil.kode_warna, {
            nama_warna: hasil.nama_warna,
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
        "warna/reactive/by-kode-warna/",
        data,
        "warna/update/by-kode-warna/"
      ).then(() => this.props.dispatch(getWarna()))
      : NotifError("Data Gagal Ditambahkan");
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Warna</li>
        </ol>
        <h1 className="page-header">Master Warna </h1>
        <Panel>
          <PanelHeader>Master Warna</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_warna"
                data={this.props.listwarna || []}
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
            title={this.state.isEdit ? "Edit Data Warna" : "Tambah Data Warna"}
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalWarna
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

export default connect(maptostate, null)(MasterWarna);
