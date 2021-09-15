import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import adduser from "../../../assets/AddUser.svg";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import HeadCreateUser from "./HeadCreateUser";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import { getListUser } from "../../../actions/supervisor_action";
import { connect } from "react-redux";
import { reset } from "redux-form";
import { AxiosMasterPost } from "../../../axios";
import {
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification";
import { onFinish, onProgress } from "../../../actions/datamaster_action";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const maptostate = (state) => {
  return {
    listuser: state.supervisor.listuser,
  };
};
class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          dataField: "user_id",
          text: "User ID",
        },
        {
          dataField: "user_name",
          text: "Nama Lengkap",
        },
        {
          dataField: "level",
          text: "Level",
        },
      ],
    };
  }
  componentDidMount() {
    this.props.dispatch(getListUser());
  }
  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      user_name: hasil.nama_lengkap,
      user_id: hasil.user_id,
      password: hasil.password,
      retype_password: hasil.retype_password,
      level: hasil.level,
    };
    AxiosMasterPost("users/add/user", data)
      .then(() => NotifSucces("Tambah User Berhasil"))
      .then(() => this.props.dispatch(reset("HeadCreateUser")))
      .then(() => this.props.dispatch(getListUser()))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        NotifError("Sepertinya ada kesalahan").then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Supervisor</Link>
          </li>
          <li className="breadcrumb-item active">Tambah / Ubah User</li>
        </ol>
        <h1 className="page-header">Tambah / Ubah User </h1>
        <Panel>
          <PanelHeader>Tambah / Ubah User</PanelHeader>
          <div className="col-lg-12">
            <div className="text-center">
              <img src={adduser} alt="Add Logo" width={300} />
              <h5>
                Simpan dan ingat baik-baik password anda. Jangan gunakan
                password dengan istilah yang umum seperti tanggal lahir atau
                nama
              </h5>
            </div>
          </div>
          <PanelBody>
            <div className="col-lg-12 mb-3">
              <HeadCreateUser onSubmit={(data) => this.handleSubmit(data)} />
            </div>
            <div className="col-lg-12">
              <ToolkitProvider
                keyField="no_acc"
                data={this.props.listuser || []}
                columns={this.state.columns}
                search
                exportCSV={{
                  fileName: "Export Master Kategori.csv",
                }}
              >
                {(props) => (
                  <div className="row">
                    <div className="col-6">
                      <div className="text-left">
                        <SearchBar {...props.searchProps} />
                      </div>
                      <div className="col-6"></div>
                    </div>
                    <hr />
                    <div className="col-12">
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
      </div>
    );
  }
}

export default connect(maptostate, null)(CreateUser);
