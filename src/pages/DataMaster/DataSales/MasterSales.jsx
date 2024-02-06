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
  editSales,
  getSales,
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
import { parseIsoDatetime } from "../../../components/notification/function.jsx";
import Tabel from "../../../components/Tabel/tabel.jsx";
const FormModalSales = lazy(() => import("./FormModalSales.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listsales: state.datamaster.listsales,
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
        "pegawai/delete/by-kode-pegawai/" + params
      )
        .then(() => dispatch(hideModal()))
        .then(() => dispatch(getSales()))
        .then(() => NotifSucces("Data Berhasil Dihapus"));
    }
  });
};
class MasterSales extends React.Component {
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
          dataField: "kode_pegawai",
          text: "Kode Pegawai",
        },
        {
          dataField: "nama_pegawai",
          text: "Nama Pegawai",
        },
        {
          dataField: "alamat",
          text: "Alamat",
        },
        {
          dataField: "kota",
          text: "Kota",
        },
        {
          dataField: "handphone",
          text: "Handphone",
        },
        {
          dataField: "tgl_masuk",
          text: "Tanggal Masuk",
          formatter: (data) => parseIsoDatetime(data),
        },
        {
          dataField: "tgl_keluar",
          text: "Tanggal Keluar",
          formatter: (data) => parseIsoDatetime(data),
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_divisi: row.kode_divisi,
              kode_pegawai: row.kode_pegawai,
              nama_pegawai: row.nama_pegawai,
              alamat: row.alamat,
              kota: row.kota,
              handphone: row.handphone,
              tgl_masuk: parseIsoDatetime(row.tgl_masuk),
              tgl_keluar: parseIsoDatetime(row.tgl_keluar),
              status_aktif: row.status_aktif,
            };

            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    onClick={() => this.editModal(dataEdit)}
                    className="btn btn-warning"
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    onClick={() =>
                      hapusDataKategori(row.kode_pegawai, this.props.dispatch)
                    }
                    className="btn btn-danger ml-2"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
      datakategori: [
        {
          kode_divisi: "SALES",
          kode_pegawai: "PG001",
          nama_pegawai: "OCTA",
          alamat: "ARIA GRAHA",
          kota: "BANDUNG",
          handphone: "085998233",
          tanggal_masuk: "2020-01-01",
          tanggal_keluar: "2020-01-01",
          status_aktif: "aktif",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getSales());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editSales(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editSales(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_divisi: hasil.kode_divisi || "-",
      kode_pegawai: hasil.kode_pegawai || "-",
      nama_pegawai: hasil.nama_pegawai || "-",
      alamat: hasil.alamat || "-",
      kota: hasil.kota || "-",
      handphone: hasil.handphone || "-",
      tgl_masuk: hasil.tanggal_masuk || "-",
      tgl_keluar: hasil.tanggal_keluar || "-",
      status_aktif: hasil.status_aktif === "true" ? true : false,
    };
    let dataEdit = {
      kode_divisi: hasil.kode_divisi || "-",
      nama_pegawai: hasil.nama_pegawai || "-",
      alamat: hasil.alamat || "-",
      kota: hasil.kota || "-",
      handphone: hasil.handphone || "-",
      tgl_masuk: hasil.tanggal_masuk || "-",
      tgl_keluar: hasil.tanggal_keluar || "-",
      status_aktif: hasil.status_aktif === "true" ? true : false,
    };
    console.log(data);
    this.state.isEdit
      ? AxiosMasterPut(
        "pegawai/update/by-kode-pegawai/" + hasil.kode_pegawai,
        dataEdit
      )
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("dataSales")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getSales()))
        .catch((err) =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : AxiosMasterPost("pegawai/add", data)
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(reset("dataSales")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getSales()))
        .catch((err) =>
          this.handleReactive(err, hasil.kode_pegawai, dataEdit)
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
        "pegawai/reactive/by-kode-pegawai/",
        data,
        "pegawai/update/by-kode-pegawai/"
      ).then(() => this.props.dispatch(getSales()))
      : NotifError(err.response.data);
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Sales & Mekanik</li>
        </ol>
        <h1 className="page-header">Master Sales & Mekanik </h1>
        <Panel>
          <PanelHeader>Master Sales & Mekanik</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_pegawai"
                data={this.props.listsales || []}
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
                ? "Edit Data Sales & Mekanik"
                : "Tambah Data Sales & Mekanik"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalSales
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

export default connect(maptostate, null)(MasterSales);
