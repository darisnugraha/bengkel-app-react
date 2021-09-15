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
  editParameter,
  getFaktur,
  getParameter,
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
const FormModalParameterTransaksi = lazy(() =>
  import("./FormModalParameterTransaksi.jsx")
);

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    noFaktur: state.datamaster.noFaktur,
    listparameter: state.datamaster.listparameter,
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
        "kategori-transaksi/delete/by-id-kategori/" + params
      )
        .then(() => dispatch(hideModal()))
        .then(() => dispatch(getParameter()));
    }
  });
};
class MasterParameterTransaksi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kategori",
          text: "Nama Parameter",
          sort: true,
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              id_kategori: row.id_kategori,
              kategori: row.kategori,
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
                      hapusDataKategori(row.id_kategori, this.props.dispatch)
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
    localStorage.removeItem("noFaktur");
    this.props.dispatch(getParameter());
    this.props.dispatch(getFaktur());
  }
  editModal(data) {
    console.log(data);
    this.props.dispatch(showModal());
    this.props.dispatch(editParameter(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editParameter(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      id_kategori: hasil.id_kategori || "-",
      kategori: hasil.kategori || "-",
    };
    let dataEdit = {
      kategori: hasil.kategori || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
          "kategori-transaksi/update/by-id-kategori/" + hasil.id_kategori ||
            "-",
          dataEdit
        )
          .then(() => NotifSucces("Berhasil Dirubah"))
          .then(() => this.props.dispatch(reset("dataParameterTransaksi")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getParameter()))
          .catch((err) =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
            )
          )
      : AxiosMasterPost("kategori-transaksi/add", data)
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataParameterTransaksi")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getParameter()))
          .catch((err) =>
            this.handleReactive(err, hasil.id_kategori, {
              kategori: hasil.kategori,
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
          "kategori-transaksi/reactive/by-id-kategori/",
          data,
          "kategori-transaksi/update/by-id-kategori/"
        ).then(() => this.props.dispatch(getParameter()))
      : NotifError("Data Gagal Ditambahkan");
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Parameter Transaksi</li>
        </ol>
        <h1 className="page-header">Master Parameter Transaksi </h1>
        <Panel>
          <PanelHeader>Master Parameter Transaksi</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kategori"
                data={this.props.listparameter || []}
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
                <FormModalParameterTransaksi
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

export default connect(maptostate, null)(MasterParameterTransaksi);
