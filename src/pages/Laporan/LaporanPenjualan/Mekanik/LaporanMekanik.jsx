import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onFinish, onProgress } from "../../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../../axios";
import Moment from "moment";
import {
  ToastError,
} from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import CetakMekanik from "./CetakMekanik";
import HeadLaporanMekanik from "./HeadLaporanMekanik";

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    onProgress: (() => dispatch(onProgress())),
    onFinish: (() => dispatch(onFinish()))
  }
}

class LaporanMekanik extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }

  getLaporan(hasil) {
    let tglawal = Moment(hasil.tanggal_awal).format('DD/MM/YYYY');
    let tglakhir = Moment(hasil.tanggal_akhir).format('DD/MM/YYYY');
    this.props.onProgress()
    AxiosMasterGet(
      `laporan/service/lap-mekanik/${hasil.tanggal_awal}&${hasil.tanggal_akhir}&${hasil.kode_mekanik}`
    )
      .then((res) => {
        console.log(res.data);
        if (res && res.data.length === 0) {
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
          ? CetakMekanik(
            `${tglawal} - ${tglakhir}`,
            hasil.kode_mekanik || "SEMUA",
            this.state.listLaporan
          )
          : ToastError("Data Laporan Kosong")
      )
      .then(() => this.props.onFinish())
      .catch((err) =>
        ToastError(`Error get data, Error : ${err.response.data}`).then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Laporan</Link>
          </li>
          <li className="breadcrumb-item active">Laporan Mekanik</li>
        </ol>
        <h1 className="page-header">Laporan Mekanik </h1>
        <Panel>
          <PanelHeader>Laporan Mekanik</PanelHeader>
          <PanelBody>
            <HeadLaporanMekanik onSubmit={(data) => this.getLaporan(data)} />
          </PanelBody>
        </Panel>
        {/* <Panel>
          <PanelBody>
            <TabelLaporanMekanik/>
          </PanelBody>
        </Panel> */}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(LaporanMekanik);
