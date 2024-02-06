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
  editBank,
  getBank,
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
const FormModalBank = lazy(() => import("./FormModalBank.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listbank: state.datamaster.listbank,
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
      AxiosMasterDelete("bank/delete/by-no-ac/" + params)
        .then(() => dispatch(hideModal()))
        .then(() => dispatch(getBank()))
        .then(() => NotifSucces("Berhasil Dihapus"));
    }
  });
};
class MasterBank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "no_ac",
          text: "Nomor A/C",
          sort: true,
        },
        {
          dataField: "nama_bank",
          text: "Nama Bank",
        },
        {
          dataField: "atas_nama",
          text: "Atas Nama",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              no_acc: row.no_ac,
              nama_bank: row.nama_bank,
              atas_nama: row.atas_nama,
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
                      hapusDataKategori(row.no_ac, this.props.dispatch)
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
          no_acc: "8200930213",
          nama_bank: "BCA",
          atas_nama: "OCTAVIAN",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getBank());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editBank(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editBank(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      no_ac: hasil.nomor_bank || "-",
      nama_bank: hasil.nama_bank || "-",
      atas_nama: hasil.atas_nama || "-",
    };
    let dataEdit = {
      atas_nama: hasil.atas_nama || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut("bank/update/by-no-ac/" + hasil.nomor_bank, dataEdit)
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getBank()))
        .catch((err) =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("bank/add", data)
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(reset("dataBank")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getBank()))
        .catch((err) => this.handleReactive(err, hasil.nomor_bank, dataEdit));
  }
  handleReactive(err, kode, data) {
    this.props.dispatch(hideModal());
    let error = err.response.data;
    let check = error.includes("Deleted");
    check
      ? reactive(
        err,
        kode,
        "bank/reactive/by-no-ac",
        data,
        "bank/update/by-no-ac/"
      ).then(() => this.props.dispatch(getBank()))
      : NotifError("Data Gagal Ditambahkan");
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Bank</li>
        </ol>
        <h1 className="page-header">Master Bank </h1>
        <Panel>
          <PanelHeader>Master Bank</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="no_acc"
                data={this.props.listbank || []}
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
            title={this.state.isEdit ? "Edit Data Bank" : "Tambah Data Bank"}
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalBank
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

export default connect(maptostate, null)(MasterBank);
