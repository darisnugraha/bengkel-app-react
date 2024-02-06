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
  editGudang,
  getGudang,
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
const FormModalGudang = lazy(() => import("./FormModalGudang.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listgudang: state.datamaster.listgudang,
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
      AxiosMasterDelete("lokasi-gudang/delete/" + params)
        .then(() => NotifSucces("Data Berhasil Di Hapus"))
        .then(() => dispatch(getGudang()));
    }
  });
};
class MasterGudang extends React.Component {
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
          dataField: "nama_lokasi_gudang",
          text: "Nama Gudang",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_gudang: row.kode_lokasi_gudang,
              nama_gudang: row.nama_lokasi_gudang,
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
                        row.kode_lokasi_gudang,
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
          kode_gudang: "GD001",
          nama_gudang: "Gudang 1",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getGudang());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editGudang(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editGudang(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_lokasi_gudang: hasil.kode_gudang || "-",
      nama_lokasi_gudang: hasil.nama_gudang || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
        "lokasi-gudang/update/by-kode-lokasi-gudang/" + hasil.kode_gudang ||
        "-",
        { nama_lokasi_gudang: hasil.nama_gudang }
      )
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getGudang()))
        .catch(() =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("lokasi-gudang/add", data)
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(reset("dataGudang")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getGudang()))
        .catch((err) =>
          this.handleReactive(err, hasil.kode_gudang, {
            nama_lokasi_gudang: hasil.nama_gudang,
          })
        );
  }

  handleReactive(err, kode, data) {
    this.props.dispatch(hideModal());
    let error = err.response.data;
    let check = error.includes("delete");
    check
      ? reactive(
        err,
        kode,
        "lokasi-gudang/reactive/",
        data,
        "lokasi-gudang/update/by-kode-lokasi-gudang/"
      ).then(() => this.props.dispatch(getGudang()))
      : NotifError("Data Gagal Ditambahkan");
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Gudang</li>
        </ol>
        <h1 className="page-header">Master Gudang </h1>
        <Panel>
          <PanelHeader>Master Gudang</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_lokasi_gudang"
                data={this.props.listgudang || []}
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
              this.state.isEdit ? "Edit Data Gudang" : "Tambah Data Gudang"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalGudang
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

export default connect(maptostate, null)(MasterGudang);
