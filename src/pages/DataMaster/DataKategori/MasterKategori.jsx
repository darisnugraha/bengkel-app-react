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
  editKategori,
  getKategori,
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
const FormModalKategori = lazy(() => import("./FormModalKategori.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listkategori: state.datamaster.listkategori,
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
      AxiosMasterDelete("kategori/delete/" + params).then(() =>
        NotifSucces("Data Berhasil Di Hapus")
          .then(() => dispatch(getKategori()))
          .catch(() =>
            NotifError(
              "Sepertinya ada gangguan, Mohon lakukan beberapa saat lagi"
            )
          )
      );
    }
  });
};
class MasterKategori extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_kategori",
          text: "Kode Kategori",
          sort: true,
        },
        {
          dataField: "nama_kategori",
          text: "Nama Kategori",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_kategori: row.kode_kategori,
              nama_kategori: row.nama_kategori,
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
                      hapusDataKategori(row.kode_kategori, this.props.dispatch)
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
          kode_kategori: "KAT001",
          nama_kategori: "KATEGORI 01",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getKategori());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editKategori(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editKategori(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_kategori: hasil.kode_kategori || "-",
      nama_kategori: hasil.nama_kategori || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
        "kategori/update/by-kode-kategori/" +
        hasil.kode_kategori.toLowerCase() || "-",
        { nama_kategori: hasil.nama_kategori }
      )
        .then(() => this.props.dispatch(reset("ModalKategori")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getKategori()))
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .catch(() =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("kategori/add", data)
        .then(() => this.props.dispatch(reset("ModalKategori")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getKategori()))
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .catch((err) =>
          this.handleReactive(err, hasil.kode_kategori, {
            nama_kategori: hasil.nama_kategori,
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
        "kategori/reactive/",
        data,
        "kategori/update/by-kode-kategori/"
      ).then(() => this.props.dispatch(getKategori()))
      : NotifError("Data Gagal Ditambahkan");
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Kategori</li>
        </ol>
        <h1 className="page-header">Master Kategori </h1>
        <Panel>
          <PanelHeader>Master Kategori</PanelHeader>

          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_kategori"
                data={this.props.listkategori || []}
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
              this.state.isEdit ? "Edit Data Kategori" : "Tambah Data Kategori"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalKategori
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

export default connect(maptostate, null)(MasterKategori);
