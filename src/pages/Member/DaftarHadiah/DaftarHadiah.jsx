import React, { Component } from "react";
import { Link } from "react-router-dom";
import Gift from "../../../assets/Gift.svg";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalGlobal from "../../ModalGlobal";
import ModalDaftarHadiah from "./ModalDaftarHadiah";
import {
  hideModal,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action";
import { connect } from "react-redux";
import {
  AxiosMasterDelete,
  AxiosMasterPost,
  AxiosMasterPut,
} from "../../../axios";
import {
  NotifSucces,
  ToastError,
} from "../../../components/notification/notification";
import { reset } from "redux-form";
import { getListHadiah, setListHadiah } from "../../../actions/member_action";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;
class DaftarHadiah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      columns: [
        {
          dataField: "kode_hadiah",
          text: "Kode Hadiah",
        },
        {
          dataField: "nama_hadiah",
          text: "Nama Hadiah",
        },
        {
          dataField: "stock",
          text: "Stock",
        },
        {
          dataField: "poin",
          text: "Point",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, hasil, rowIndex) => {
            let dataEdit = {
              kode_hadiah: hasil.kode_hadiah,
              nama_hadiah: hasil.nama_hadiah,
              stock: hasil.stock,
              poin: hasil.poin,
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
                    onClick={() => this.deleteModal(hasil.kode_hadiah)}
                    className="btn btn-danger mr-3"
                  >
                    Delete
                    <i className="fa fa-trash ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }
  componentDidMount() {
    this.props.dispatch(getListHadiah());
  }
  showTambah() {
    this.setState({
      isEdit: false,
    });
    this.props.dispatch(showModal());
    this.props.dispatch(setListHadiah(""));
  }
  deleteModal(data) {
    this.props.dispatch(onProgress());
    AxiosMasterDelete("hadiah/delete-hadiah/" + data)
      .then(() => NotifSucces("Berhasi Hapus Hadiah"))
      .then(() => this.props.dispatch(getListHadiah()))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(
          `Hadiah Gagal Dihapus,Error : ${err.response.data}`
        ).then(() => this.props.dispatch(onFinish()))
      );
  }
  editModal(data) {
    this.setState({
      isEdit: true,
    });
    this.props.dispatch(setListHadiah(data));
    this.props.dispatch(showModal());
  }
  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      kode_hadiah: hasil.kode_hadiah,
      nama_hadiah: hasil.nama_hadiah,
      stock: hasil.stock,
      poin: hasil.poin,
    };
    this.state.isEdit
      ? AxiosMasterPut("hadiah/update-hadiah/" + hasil.kode_hadiah, {
          nama_hadiah: hasil.nama_hadiah,
          stock: hasil.stock,
          poin: hasil.poin,
        })
          .then(() => NotifSucces("Hadiah berhasil ditambahkan"))
          .then(() => this.props.dispatch(reset("ModalDaftarHadiah")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getListHadiah()))
          .then(() => this.props.dispatch(onFinish()))
          .catch((err) =>
            ToastError(
              `Gagal Tambah Hadiah, Error : ${err.response.data}`
            ).then(() => this.props.dispatch(onFinish()))
          )
      : AxiosMasterPost("hadiah/tambah-hadiah-baru", data)
          .then(() => NotifSucces("Hadiah berhasil ditambahkan"))
          .then(() => this.props.dispatch(reset("ModalDaftarHadiah")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getListHadiah()))
          .then(() => this.props.dispatch(onFinish()))
          .catch((err) =>
            ToastError(
              `Gagal Tambah Hadiah, Error : ${err.response.data}`
            ).then(() => this.props.dispatch(onFinish()))
          );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Stock Opname</Link>
          </li>
          <li className="breadcrumb-item active">Daftar Hadiah</li>
        </ol>
        <h1 className="page-header"> Daftar Hadiah </h1>
        <Panel>
          <PanelHeader> Daftar Hadiah</PanelHeader>
          <PanelBody>
            <div className="col-lg-12">
              <div className="text-center">
                <img src={Gift} alt="Gift" width={300} />
              </div>
            </div>
            <div className="col-lg-12">
              <ToolkitProvider
                keyField="no_acc"
                data={this.props.listhadiah || []}
                columns={this.state.columns}
                search
                exportCSV={{
                  fileName: "Export Master Kategori.csv",
                }}
              >
                {(props) => (
                  <div className="row">
                    <div className="col-6">
                      <button
                        onClick={() => this.showTambah()}
                        className="btn btn-primary"
                      >
                        Tambah Data
                        <i className="fa fa-plus ml-3"></i>
                      </button>
                    </div>
                    <div className="col-6">
                      <div className="text-right">
                        <SearchBar {...props.searchProps} />
                      </div>
                    </div>
                    <hr />
                    <div className="col-12">
                      <BootstrapTable
                        noDataIndication="Belum Ada Data"
                        pagination={paginationFactory()}
                        {...props.baseProps}
                      />
                      <br />
                      <ExportCSVButton {...props.csvProps}>
                        Export CSV!!
                      </ExportCSVButton>
                    </div>
                  </div>
                )}
              </ToolkitProvider>
            </div>
          </PanelBody>
        </Panel>
        <ModalGlobal
          title="Simpan Data Hadiah"
          content={
            <ModalDaftarHadiah
              onSubmit={(data) => this.handleSubmit(data)}
              isEdit={this.state.isEdit}
              showTambah={() => this.showTambah()}
            />
          }
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    listhadiah: state.member.listhadiah,
  };
})(DaftarHadiah);
