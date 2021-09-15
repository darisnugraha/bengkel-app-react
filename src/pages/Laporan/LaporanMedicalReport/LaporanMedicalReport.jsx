import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onFinish, onProgress } from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import { ToastError } from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import CetakMedicalReport from "./CetakMedicalReport";
import HeadLaporanMedicalReport from "./HeadLaporanMedicalReport";

class LaporanMedicalReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }
  getLaporan(hasil) {
    console.log(hasil);
    this.props.dispatch(onProgress());
    AxiosMasterGet(
      "laporan/service/medical-report/" +
        `${hasil.tanggal_awal}&${hasil.tanggal_akhir}&${hasil.no_polisi}`
    )
      .then((res) => {
        if (res.data.length === 0) {
          ToastError("Data Laporan Kosong");
          return false;
        } else {
          this.setState({
            listLaporan: res && res.data,
          });
        }
      })
      .then(() =>
        this.state.listLaporan.length
          ? CetakMedicalReport(
              hasil.tanggal_awal,
              hasil.tanggal_akhir,
              hasil.no_polisi,
              this.state.listLaporan
            )
          : ToastError("Data Laporan Kosong")
      )
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(
          `Gagal Mengambil Data, Detail : ${err.response.data}`
        ).then(() => this.props.dispatch(onFinish()))
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Laporan</Link>
          </li>
          <li className="breadcrumb-item active">Laporan Medical Report</li>
        </ol>
        <h1 className="page-header">Laporan Medical Report </h1>
        <Panel>
          <PanelHeader>Laporan Medical Report</PanelHeader>
          <PanelBody>
            <HeadLaporanMedicalReport
              onSubmit={(data) => this.getLaporan(data)}
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect()(LaporanMedicalReport);
