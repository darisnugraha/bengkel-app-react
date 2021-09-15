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
  editDivisi,
  getDivisi,
  showModal,
  hideModal,
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
const FormModalDivisi = lazy(() => import("./FormModalDivisi.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listdivisi: state.datamaster.listdivisi,
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
        "divisi/delete/by-kode-divisi/" + params
      )
        .then(() => dispatch(hideModal()))
        .then(() => dispatch(getDivisi()))
        .then(() => NotifSucces("Berhasil Dihapus"));
    }
  });
};
class MasterDivisi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_divisi",
          text: "Kode Divisi",
          sort: true,
        },
        {
          dataField: "nama_divisi",
          text: "Nama Divisi",
        },

        // {
        //   dataField: "action",
        //   text: "Action",
        //   csvExport: false,
        //   headerClasses: "text-center",
        //   formatter: (rowcontent, row) => {
        //     let dataEdit = {
        //       kode_divisi: row.kode_divisi,
        //       nama_divisi: row.nama_divisi,
        //     };
        //     this.setState({});
        //     return (
        //       <div className="row text-center">
        //         <div className="col-12">
        //           {/* <button
        //             onClick={() => this.editModal(dataEdit)}
        //             className="btn btn-warning mr-3"
        //           >
        //             Edit
        //             <i className="fa fa-edit ml-2"></i>
        //           </button>
        //           <button
        //             onClick={() =>
        //               hapusDataKategori(row.kode_divisi, this.props.dispatch)
        //             }
        //             className="btn btn-danger"
        //           >
        //             Hapus
        //             <i className="fa fa-trash ml-2"></i>
        //           </button> */}
        //         </div>
        //       </div>
        //     );
        //   },
        // },
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
    this.props.dispatch(getDivisi());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editDivisi(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editDivisi(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_divisi: hasil.kode_divisi || "-",
      nama_divisi: hasil.nama_divisi || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
          "divisi/update/by-kode-divisi/" + hasil.kode_divisi || "-",
          {
            nama_divisi: hasil.nama_divisi || "-",
          }
        )
          .then(() => NotifSucces("Berhasil Dirubah"))
          .then(() => this.props.dispatch(reset("dataDivisi")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getDivisi()))
          .catch((err) =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
              
            )
          )
      : AxiosMasterPost("divisi/add", data)
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataDivisi")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getDivisi()))
          .catch((err) =>
            this.handleReactive(err, hasil.kode_divisi, {
              nama_divisi: hasil.nama_divisi,
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
          "divisi/reactive/by-kode-divisi/",
          data,
          "divisi/update/by-kode-divisi/"
        ).then(() => this.props.dispatch(getDivisi()))
      : NotifError("Data Gagal Ditambahkan");
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Divisi</li>
        </ol>
        <h1 className="page-header">Master Divisi </h1>
        <Panel>
          <PanelHeader>Master Divisi</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_divisi"
                data={this.props.listdivisi || []}
                columns={this.state.columns}
                CSVExport
                tambahData={false}
                handleClick={() => this.tambahModal()}
              />
            </div>
            <br />
            {/* End Master Kategori */}
          </PanelBody>
          <ModalGlobal
            title={
              this.state.isEdit ? "Edit Data Divisi" : "Tambah Data Divisi"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalDivisi
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

export default connect(maptostate, null)(MasterDivisi);
