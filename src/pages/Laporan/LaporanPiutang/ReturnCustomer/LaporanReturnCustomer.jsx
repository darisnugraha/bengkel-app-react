import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AxiosMasterGet } from "../../../../axios";
import { ToastError } from "../../../../components/notification/notification";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../../components/panel/panel";
import HeadLaporanReturnCustomer from "./HeadLaporanReturnCustomer";
import CetakReturnCustomer from "./CetakReturnCustomer";
import { getToday } from "../../../../components/notification/function";
import Moment from "moment";

class LaporanReturnCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan:[],
    };
  }

  handleSubmit(hasil){
    let tglawal = Moment(hasil.tanggal_awal).format('DD/MM/YYYY');
    let tglakhir = Moment(hasil.tanggal_akhir).format('DD/MM/YYYY');
    console.log(hasil);
    AxiosMasterGet(`retur-barang/lap-retur-barang/${hasil.tanggal_awal}&${hasil.tanggal_akhir}`)
    .then((res) => {
      this.setState({
      listLaporan: res && res.data
    })
  })
    .then(() => {
      if(this.state.listLaporan.length === 0){
        ToastError("Data Laporan Kosong");
      }else{
        CetakReturnCustomer(
              `${tglawal} s/d ${tglakhir}`,
              "SEMUA",
              "ADMIN",
              getToday(),
              "ADMIN",
              this.state.listLaporan,
            )
      }
    })
    .catch((err) => ToastError(err))
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Laporan</Link>
          </li>
          <li className="breadcrumb-item active">Laporan Retur Customer</li>
        </ol>
        <h1 className="page-header">Laporan Retur Customer </h1>
        <Panel>
          <PanelHeader>Laporan Retur Customer</PanelHeader>
          <PanelBody>
            <HeadLaporanReturnCustomer 
            onSubmit = {(data)=>this.handleSubmit(data)}/>
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default LaporanReturnCustomer;
