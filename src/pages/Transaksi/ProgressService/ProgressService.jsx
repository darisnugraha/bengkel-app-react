import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "redux-form";
import { getServiceProgress } from "../../../actions/transaksi_action";
import { AxiosMasterGet } from "../../../axios";
import { ToastError } from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import Tabel from "../../../components/Tabel/tabel";
import { PageSettings } from "../../../config/page-settings.js";

class ProgressService extends Component {
  static contextType = PageSettings;
  constructor(props) {
    super(props);
    this.state = {
      listDaftar: [],
      columns: [
        {
          dataField: "nama_customer",
          text: "Nama Customer",
        },
        {
          dataField: "nopol_kendaraan",
          text: "Nomor Polisi",
        },
        {
          dataField: "merk_kendaraan",
          text: "Merk Kendaraan",
        },
        {
          dataField: "tgl_masuk",
          text: "Tanggal Masuk",
        },
        {
          dataField: "mekanik",
          text: "Nama Mekanik",
        },
        {
          dataField: "status",
          text: "Status",
          formatter: (list) => {
            return list === undefined ? "On Progress" : "FINISH";
          },
        },
      ],
    };
  }
  componentDidMount() {
    this.context.handleSetPageSidebar(false);
    this.context.handleSetPageHeader(false);
    this.context.handleSetBodyWhiteBg(true);
    this.props.dispatch(getServiceProgress());
    this.setState({
      listDaftar: JSON.parse(localStorage.getItem("progress_service")) || [],
    });
  }
  componentWillUnmount() {
    this.context.handleSetPageSidebar(true);
    this.context.handleSetPageHeader(true);
    this.context.handleSetBodyWhiteBg(false);
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Booking Service</li>
        </ol>
        <h1 className="page-header">Booking Service </h1>
        <Panel>
          <PanelHeader>Booking Service</PanelHeader>
          <PanelBody>
            <br />
            <Tabel
              data={this.state.listDaftar}
              columns={this.state.columns}
              keyField="nopol_kendaraan"
              textEmpty="Daftar Service Kosong"
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect()(ProgressService);
