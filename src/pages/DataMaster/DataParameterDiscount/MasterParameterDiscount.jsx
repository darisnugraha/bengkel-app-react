import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { NotifSucces } from "../../../components/notification/notification.jsx";
import {
  editKategoriService,
  getDiskon,
  hideModal,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import Skeleton from "react-loading-skeleton";
import { AxiosMasterPut } from "../../../axios.js";
import Tabel from "../../../components/Tabel/tabel.jsx";
const FormModalParameterDiscount = lazy(() =>
  import("./FormModalParameterDiscount.jsx")
);

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listDiskons: state.datamaster.listDiskon,
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
      NotifSucces("Data Berhasil Di Hapus");
    }
  });
};
class MasterParameterDiscount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      columns: [
        {
          dataField: "kode_kategori",
          text: "Jenis Kategori",
          sort: true,
        },
        {
          dataField: "nama_kategori",
          text: "Nama Kategori",
          sort: true,
        },
        {
          dataField: "diskon",
          text: "Nominal Discount",
          sort: true,
          formatter: (data) => {
            return data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "status_diskon",
          text: "Status Discount",
          sort: true,
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
              diskon: row.diskon,
              status_diskon: row.status_diskon,
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
                      hapusDataKategori(row.kodeProvinsi, this.props.dispatch)
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
          jenis_service: "LISTRIK",
          jenis_kategori: "Kaki,Tune Up,Turun Mesin,Electric",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getDiskon());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editKategoriService(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editKategoriService(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    this.state.isEdit
      ? AxiosMasterPut(
        "kategori/update-diskon/" + hasil.jenis_kategori || "-",
        {
          status_diskon: hasil.jenis_discount || "-",
          diskon: hasil.nominal_discount || "-",
        }
      )
        .then(() => this.props.dispatch(hideModal()))
        .then(() => NotifSucces("Diskon Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(getDiskon()))
      : AxiosMasterPut(
        "kategori/update-diskon/" + hasil.jenis_kategori || "-",
        {
          status_diskon: hasil.jenis_discount || "-",
          diskon: hasil.nominal_discount || "-",
        }
      )
        .then(() => this.props.dispatch(hideModal()))
        .then(() => NotifSucces("Diskon Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(getDiskon()));
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Parameter Discount</li>
        </ol>
        <h1 className="page-header">Master Parameter Discount </h1>
        <Panel>
          <PanelHeader>Master Parameter Discount</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_kategori"
                data={this.props.listDiskons || []}
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
                ? "Edit Data Parameter Discount"
                : "Tambah Data Parameter Discount"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalParameterDiscount
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

export default connect(maptostate, null)(MasterParameterDiscount);
