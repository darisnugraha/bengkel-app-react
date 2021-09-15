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
} from "../../../components/notification/notification.jsx";
import {
  editSupplier,
  getSupplier,
  hideModal,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import Skeleton from "react-loading-skeleton";
import { reset } from "redux-form";
import {
  AxiosMasterDelete,
  AxiosMasterPost,
  AxiosMasterPut,
} from "../../../axios.js";
import Tabel from "../../../components/Tabel/tabel.jsx";
const FormModalSupplier = lazy(() => import("./FormModalSupplier.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listsupplier: state.datamaster.listsupplier,
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
      AxiosMasterDelete("supplier/delete/" + params)
        .then(() => NotifSucces("Data Berhasil Di Hapus"))
        .then(() => dispatch(getSupplier()));
    }
  });
};

const expandRow = {
  renderer: (row) => (
    <div>
      <p>{`Telepon : ${row.telepon} || FAX : ${row.fax} || KODE POS : ${row.kode_pos} || ALAMAT : ${row.alamat}`}</p>
    </div>
  ),
};
class MasterSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_supplier",
          text: "Kode Supplier",
          sort: true,
        },
        {
          dataField: "nama_supplier",
          text: "Nama Supplier",
        },
        {
          dataField: "contact_person",
          text: "CP",
        },
        {
          dataField: "kota",
          text: "Kota",
        },
        {
          dataField: "email",
          text: "Email",
          headerStyle: () => {
            return {
              overflowWrap: "break-word",
              whiteSpace: "unset",
            };
          },
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_supplier: row.kode_supplier,
              nama_supplier: row.nama_supplier,
              contact_person: row.contact_person,
              fax: row.fax || 0,
              telepon: row.telepon || 0,
              alamat: row.alamat,
              kota: row.kota,
              pembayaran_cash: row.pembayaran_cash,
              pembayaran_kredit: row.pembayaran_kredit,
              hari: row.hari,
              kode_pos: row.kode_pos,
              email: row.email,
              bank: row.bank,
              bank_ac: row.bank_ac,
              bank_atas_nama: row.bank_atas_nama,
              npwp: row.npwp,
              npwp_nama: row.npwp_nama,
              npwp_alamat: row.npwp_alamat,
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
                      hapusDataKategori(row.kode_supplier, this.props.dispatch)
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
          kode_supplier: "SP001",
          nama_supplier: "OCTAVIAN",
          contact_person: "990239",
          fax: "123342",
          telepon: "088489231",
          alamat: "ARIA GRAHA",
          kota: "BANDUNG",
          kode_post: "40235",
          email: "OCTAV@GMAIL.COM",
          nama_bank: "BCA",
          no_acc: "99231000",
          nama_pemilik: "OCTAV",
          NPWP: "888239918312",
          nama_NPWP: "OCTAVIAN",
          alamat_NPWP: "ARIA GRAHA",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getSupplier());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editSupplier(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editSupplier(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let type = hasil.type_pembayaran === "cash" ? true : false;
    let data = {
      kode_supplier: hasil.kode_supplier || "-",
      nama_supplier: hasil.nama_supplier || "-",
      contact_person: hasil.contact_person || "-",
      fax: hasil.fax || "-",
      telepon: hasil.telepon || "-",
      alamat: hasil.alamat || "-",
      kota: hasil.kota || "-",
      pembayaran_cash: hasil.type_pembayaran === "cash" ? true : false || false,
      pembayaran_kredit:
        hasil.type_pembayaran === "cash" ? false : true || false,
      hari: hasil.tanggal_pembayaran || 0,
      kode_pos: hasil.kode_pos || "-",
      email: hasil.email || "-",
      bank: hasil.nama_bank || "-",
      bank_ac: hasil.no_acc || "-",
      bank_atas_nama: hasil.nama_pemilik || "-",
      npwp: hasil.NPWP || "-",
      npwp_nama: hasil.nama_NPWP || "-",
      npwp_alamat: hasil.alamat_NPWP || "-",
    };
    let dataEdit = {
      nama_supplier: hasil.nama_supplier || "-",
      contact_person: hasil.contact_person || "-",
      fax: hasil.fax || "-",
      telepon: hasil.telepon || "-",
      alamat: hasil.alamat || "-",
      kota: hasil.kota || "-",
      pembayaran_cash: hasil.type_pembayaran === "cash" ? true : false || false,
      pembayaran_kredit:
        hasil.type_pembayaran === "cash" ? false : true || false,
      hari: hasil.tanggal_pembayaran || 0,
      kode_pos: hasil.kode_pos || "-",
      email: hasil.email || "-",
      bank: hasil.nama_bank || "-",
      bank_ac: hasil.no_acc || "-",
      bank_atas_nama: hasil.nama_pemilik || "-",
      npwp: hasil.NPWP || "-",
      npwp_nama: hasil.nama_NPWP || "-",
      npwp_alamat: hasil.alamat_NPWP || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
          "supplier/update/by-kode-supplier/" + hasil.kode_supplier,
          dataEdit
        )
          .then(() => NotifSucces("Berhasil Dirubah"))
          .then(() => this.props.dispatch(reset("dataBarang")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getSupplier()))
          .catch((err) =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi \n" +
                `Error Detail : \n ${err.response.data}`
            )
          )
      : AxiosMasterPost("supplier/add", data)
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataBarang")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getSupplier()))
          .catch((err) =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi\n" +
                `${err && err.response && err.response.data}`
            )
          );
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Supplier</li>
        </ol>
        <h1 className="page-header">Master Supplier </h1>
        <Panel>
          <PanelHeader>Master Supplier</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_supplier"
                data={this.props.listsupplier || []}
                columns={this.state.columns}
                expandRow={expandRow}
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
              this.state.isEdit ? "Edit Data Supplier" : "Tambah Data Supplier"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalSupplier
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

export default connect(maptostate, null)(MasterSupplier);
