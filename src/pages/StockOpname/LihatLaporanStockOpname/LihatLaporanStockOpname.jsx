import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onFinish, onProgress } from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import { ToastError } from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import CetakStockOpname from "./CetakStockOpname";
import HeadLihatLaporanStockOpname from "./HeadLihatLaporanStockOpname";

class StockOpname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
    };
  }

  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    AxiosMasterGet(
      `laporan/lap-stock-opname/${hasil.tanggal_awal}&${hasil.tanggal_akhir}`
    )
      .then((res) => console.log(res.data))
      .then(() =>
        CetakStockOpname(
          hasil.tanggal_awal,
          hasil.tanggal_akhir,
          this.state.listLaporan
        )
      )
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(`Error Get Data , Error : ${err.response.data}`)
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Stock Opname</Link>
          </li>
          <li className="breadcrumb-item active">
            Lihat Laporan Stock Opname Barang
          </li>
        </ol>
        <h1 className="page-header"> Lihat Laporan Stock Opname Barang </h1>
        <Panel>
          <PanelHeader> Lihat Laporan Stock Opname Barang</PanelHeader>
          <PanelBody>
            <HeadLihatLaporanStockOpname
              onSubmit={(data) => this.handleSubmit(data)}
            />
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect()(StockOpname);
