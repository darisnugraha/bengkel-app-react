import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onFinish, onProgress } from "../../../actions/datamaster_action";
import { AxiosMasterPost } from "../../../axios";
import {
  NotifError,
  NotifSucces,
  ToastError,
} from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import HeadTambahPointManual from "./HeadTambahPointManual";

class TambahPointManual extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      kode_customer: hasil.kode_customer,
      jenis_trx: hasil.jenis,
      poin: hasil.poin,
    };

    AxiosMasterPost("member/tambah-ambil-poin-manual", data)
      .then(() => this.props.dispatch(onFinish()))
      .then(() => NotifSucces(`${hasil.jenis} Berhasil`))
      .catch((err) =>
        ToastError(`${err.response.data}`).then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Member</Link>
          </li>
          <li className="breadcrumb-item active">
            Tambah / Ambil Point Manual
          </li>
        </ol>
        <h1 className="page-header"> Tambah / Ambil Point Manual </h1>
        <Panel>
          <PanelHeader> Tambah / Ambil Point Manual</PanelHeader>
          <PanelBody>
            <div className="col-lg-12 mt-3">
              <HeadTambahPointManual
                onSubmit={(data) => this.handleSubmit(data)}
              />
            </div>
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect()(TambahPointManual);
