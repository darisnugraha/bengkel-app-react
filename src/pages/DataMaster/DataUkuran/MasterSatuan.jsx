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
  editSatuan,
  getSatuan,
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
const FormModalSatuan = lazy(() => import("./FormModalSatuan.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listsatuan: state.datamaster.listsatuan,
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
      AxiosMasterDelete("satuan/delete/" + params)
        .then(() => dispatch(hideModal()))
        .then(() => dispatch(getSatuan()));
    }
  });
};
class MasterSatuan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_satuan",
          text: "Kode Satuan",
          sort: true,
        },
        {
          dataField: "nama_satuan",
          text: "Nama Satuan",
        },

        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_satuan: row.kode_satuan,
              nama_satuan: row.nama_satuan,
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
                      hapusDataKategori(row.kode_satuan, this.props.dispatch)
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
          kode_satuan: "ST001",
          nama_satuan: "UNIT",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getSatuan());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editSatuan(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editSatuan(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_satuan: hasil.kode_satuan || "-",
      nama_satuan: hasil.nama_satuan || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
        "satuan/update/by-kode-satuan/" + hasil.kode_satuan,
        {
          nama_satuan: hasil.nama_satuan,
        }
      )
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("dataSatuan")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getSatuan()))
        .catch(() =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("satuan/add", data)
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(reset("dataSatuan")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getSatuan()))
        .catch((err) =>
          this.handleReactive(err, hasil.kode_satuan, {
            nama_satuan: hasil.nama_satuan || "-",
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
        "satuan/reactive/",
        data,
        "satuan/update/by-kode-satuan/"
      ).then(() => this.props.dispatch(getSatuan()))
      : NotifError("Data Gagal Ditambahkan");
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Satuan</li>
        </ol>
        <h1 className="page-header">Master Satuan </h1>
        <Panel>
          <PanelHeader>Master Satuan</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_satuan"
                data={this.props.listsatuan || []}
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
              this.state.isEdit ? "Edit Data Ukuran" : "Tambah Data Ukuran"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalSatuan
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

export default connect(maptostate, null)(MasterSatuan);
