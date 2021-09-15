import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import HeadInputDataMember from "./HeadInputDataMember";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import ModalGlobal from "../../ModalGlobal";
import {
  hideModal,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action";
import { connect } from "react-redux";
import { AxiosMasterPost, AxiosMasterPut } from "../../../axios";
import {
  NotifSucces,
  ToastError,
} from "../../../components/notification/notification";
import { reset } from "redux-form";
import { getListMember, setListMember } from "../../../actions/member_action";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;
class InputDataMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          dataField: "nama_customer",
          text: "Nama Customer",
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
          dataField: "no_ktp",
          text: "Nomor KTP",
        },
        {
          dataField: "tgl_lahir",
          text: "Tangga Lahir",
        },

        {
          dataField: "handphone",
          text: "Handphone",
        },
        {
          dataField: "point",
          text: "Point",
        },
        {
          dataField: "nopol_kendaraan",
          text: "Nomor Polisi",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, hasil, rowIndex) => {
            let dataEdit = {
              nama_customer: hasil.nama_customer,
              alamat: hasil.alamat,
              kota: hasil.kota,
              kode_pos: hasil.kode_pos,
              no_ktp: hasil.no_ktp,
              tgl_lahir: hasil.tgl_lahir,
              telepon: hasil.telepon,
              handphone: hasil.handphone,
              nopol_kendaraan: hasil.nopol_kendaraan,
              merk_kendaraan: hasil.merk_kendaraan,
              type_kendaraan: hasil.type_kendaraan,
              warna_kendaraan: hasil.warna_kendaraan,
              nomesin_kendaraan: hasil.nomesin_kendaraan,
              kode_customer: hasil.kode_customer,
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
                </div>
              </div>
            );
          },
        },
      ],
    };
  }

  editModal(data) {
    this.props.dispatch(setListMember(data));
    this.props.dispatch(showModal());
    this.setState({
      isEdit: true,
    });
  }

  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      nama_customer: hasil.nama_member,
      alamat: hasil.alamat,
      kota: hasil.kota,
      kode_pos: hasil.kode_pos,
      no_ktp: hasil.no_ktp,
      tgl_lahir: hasil.tanggal_lahir,
      telepon: hasil.telepon,
      handphone: hasil.handphone,
      nopol_kendaraan: hasil.nopol_kendaraan,
      merk_kendaraan: hasil.merk_kendaraan,
      type_kendaraan: hasil.type_kendaraan,
      warna_kendaraan: hasil.warna_kendaraan,
      nomesin_kendaraan: hasil.nomesin_kendaraan,
    };

    this.state.isEdit
      ? AxiosMasterPut("member/update-member/" + hasil.kode_customer, data)
          .then(() => NotifSucces("Tambah member berhasil"))
          .then(() => this.props.dispatch(reset("HeadInputDataMember")))
          .then(() => this.props.dispatch(getListMember()))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(onFinish()))
          .catch((err) =>
            ToastError(
              `Error Tambah Member , Error: ${err.response.data}`
            ).then(() => this.props.dispatch(onFinish()))
          )
      : AxiosMasterPost("member/tambah-member-baru", data)
          .then(() => NotifSucces("Tambah member berhasil"))
          .then(() => this.props.dispatch(reset("HeadInputDataMember")))
          .then(() => this.props.dispatch(getListMember()))
          .then(() => this.props.dispatch(onFinish()))
          .catch((err) =>
            ToastError(
              `Error Tambah Member , Error: ${err.response.data}`
            ).then(() => this.props.dispatch(onFinish()))
          );
  }
  componentDidMount() {
    this.props.dispatch(getListMember());
  }
  showTambah() {
    this.setState({
      isEdit: false,
    });
    this.props.dispatch(setListMember(""));
    this.props.dispatch(showModal());
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Member</Link>
          </li>
          <li className="breadcrumb-item active">Input Data Member</li>
        </ol>
        <h1 className="page-header">Input Data Member </h1>
        <Panel>
          <PanelHeader>Input Data Member</PanelHeader>
          <PanelBody>
            <div className="col-lg-12">
              <ToolkitProvider
                keyField="no_acc"
                data={this.props.listmember || []}
                columns={this.state.columns}
                search
                exportCSV={{
                  fileName: "Export Master Kategori.csv",
                }}
              >
                {(props) => (
                  <div className="row mt-3">
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
                    <div className="col-12 mt-3">
                      <BootstrapTable
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
          title="Tambah Data Member"
          content={
            <HeadInputDataMember onSubmit={(data) => this.handleSubmit(data)} />
          }
        />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    listmember: state.member.listmember,
  };
})(InputDataMember);
