import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import {
  editJenis,
  getJenis,
  hideModal,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import {
  NotifError,
  NotifSucces,
  reactive,
} from "../../../components/notification/notification.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import Skeleton from "react-loading-skeleton";
import {
  AxiosMasterDelete,
  AxiosMasterPost,
  AxiosMasterPut,
} from "../../../axios.js";
import { reset } from "redux-form";
import Tabel from "../../../components/Tabel/tabel.jsx";
const FormModalJenis = lazy(() => import("./FormModalJenis.jsx"));

const maptostate = (state) => {
  return {
    listjenis: state.datamaster.listjenis,
  };
};

const hapusDataJenis = (params, dispatch) => {
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
        "jenis/delete/by-kode-jenis/" + params
      )
        .then(() => NotifSucces("Data Berhasil Di Hapus"))
        .then(() => dispatch(getJenis()));
    }
  });
};
class MasterJenis extends React.Component {
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
          dataField: "kode_jenis",
          text: "Kode Jenis",
        },
        {
          dataField: "nama_jenis",
          text: "Nama Jenis",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_kategori: row.kode_kategori,
              kode_jenis: row.kode_jenis,
              nama_jenis: row.nama_jenis,
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
                      hapusDataJenis(row.kode_jenis, this.props.dispatch)
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
      DataJenis: [
        {
          kode_kategori: "CC",
          kode_jenis: "CCAN",
          nama_jenis: "ANTING MAS MUDA",
        },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getJenis());
  }
  handleSubmit(hasil) {
    let data = {
      kode_kategori: hasil.kode_kategori || "-",
      kode_jenis: hasil.kode_jenis || "-",
      nama_jenis: hasil.nama_jenis || "-",
    };
    // this.props.dispatch(onProgress());
    this.state.isEdit
      ? AxiosMasterPut(
        "jenis/edit/by-kode-jenis/" + hasil.kode_jenis || "-",
        {
          kode_kategori: hasil.kode_kategori || "-",

          nama_jenis: hasil.nama_jenis || "-",
        }
      )
        .then(() => this.props.dispatch(reset("DataJenis")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getJenis()))
        .then(() => NotifSucces("Berhasil Dirubah"))
        .catch(() =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("jenis/add", data)
        .then(() => this.props.dispatch(reset("DataJenis")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getJenis()))
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .catch((err) =>
          this.handleReactive(err, hasil.kode_jenis, {
            kode_kategori: hasil.kode_kategori,
            nama_jenis: hasil.nama_jenis,
          })
        );
  }

  handleReactive(err, kode, data) {
    this.props.dispatch(hideModal());
    let error = err.response.data;
    let check = error.includes("Deleted");

    check
      ? reactive(
        err,
        kode,
        "jenis/reactive/by-kode-jenis/",
        data,
        "jenis/edit/by-kode-jenis/"
      ).then(() => this.props.dispatch(getJenis()))
      : NotifError("Data Gagal Ditambahkan");
  }
  tambahModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editJenis(""));
    this.setState({
      isEdit: false,
    });
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editJenis(data));
    this.setState({
      isEdit: true,
    });
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Jenis</li>
        </ol>
        <h1 className="page-header">Master Jenis </h1>
        <Panel>
          <PanelHeader>Master Jenis</PanelHeader>
          <PanelBody>
            <br />

            {/* Master Jenis */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_jenis"
                data={this.props.listjenis || []}
                columns={this.state.columns}
                CSVExport
                tambahData={true}
                handleClick={() => this.tambahModal()}
              />
            </div>
            <br />
            {/* End Master Jenis */}
          </PanelBody>
          <ModalGlobal
            title={this.state.isEdit ? "Edit Data Jenis" : "Tambah Data Jenis"}
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalJenis
                  onSubmit={(data) => this.handleSubmit(data)}
                  isEdit={this.state.isEdit}
                />
              </Suspense>
            }
          />
          {/* End Tambah Master Jenis  */}
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(MasterJenis);
