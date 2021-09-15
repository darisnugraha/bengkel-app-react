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
  editHargaService,
  showModal,
  hideModal,
} from "../../../actions/datamaster_action.jsx";
import { AxiosMasterGet, AxiosMasterPut } from "../../../axios";
import { reset } from "redux-form";
import Skeleton from "react-loading-skeleton";
const FormModalParameterHargaService = lazy(() =>
  import("./FormModalParameterHargaService.jsx")
);

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
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
class MasterParameterHargaService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      listParameter: [],
      columns: [
        {
          dataField: "jenis_kategori",
          text: "Jenis Kategori",
          sort: true,
        },
        {
          dataField: "jenis_service",
          text: "Jenis Service",
          sort: true,
        },
        {
          dataField: "jasa_service",
          text: "Jasa Service",
          sort: true,
          formatter: (data) => "Rp." + data.toLocaleString("ID-id") + ",-",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              jenis_kategori: row.jenis_kategori.split(","),
              jenis_service: row.jenis_service,
              jasa_service: row.jasa_service,
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
          jasa_service: 100000,
        },
      ],
    };
  }

  componentDidMount() {
    this.getList();
  }
  getList() {
    AxiosMasterGet("kategori-service/get/all").then((res) =>
      this.setState({
        listParameter: res.data,
      })
    );
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editHargaService(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editHargaService(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      harga_jasa_service: hasil.jasa_service || "-",
    };
    this.state.isEdit
      ? console.log(data)
      : AxiosMasterPut(
          "kategori-service/update-harga-jasa-service/" +
            hasil.jenis_kategori || "-",
          data
        )
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataHargaService")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.getList())
          .catch((err) => NotifError(err));
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Harga Service</li>
        </ol>
        <h1 className="page-header">Master Harga Service </h1>
        <Panel>
          <PanelHeader>Master Harga Service</PanelHeader>
          <PanelBody>
            <br />
            <Suspense fallback={<Skeleton width={"100%"} height={200} />}>
              <div className="col-lg-12 mb-5">
                <FormModalParameterHargaService
                  onSubmit={(data) => this.handleSubmit(data)}
                  onSend={this.props.onSend}
                  isEdit={this.state.isEdit}
                  listParameter={this.state.listParameter}
                />
              </div>
            </Suspense>
            {/* End Tambah Master Kategori  */}
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(MasterParameterHargaService);
