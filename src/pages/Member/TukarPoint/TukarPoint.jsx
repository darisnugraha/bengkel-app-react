import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  hideModal,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action";
import { AxiosMasterPost } from "../../../axios";
import {
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import ModalGlobal from "../../ModalGlobal";
import HeadTukarPoint from "./HeadTukarPoint";
import ModalTukar from "./ModalTukar";

class TukarPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      kode_customer: hasil.kode_customer,
      kode_hadiah: hasil.kode_hadiah,
    };

    AxiosMasterPost("member/tukar-poin", data)
      .then(() => NotifSucces("Tukar Point Berhasil"))
      .then(() => this.props.dispatch(hideModal()))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        NotifError(
          `Gagal Tukar Point , Detail :  ${err.response.data}`
        ).then(() => this.props.dispatch(onFinish()))
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Member</Link>
          </li>
          <li className="breadcrumb-item active">Tukar Point</li>
        </ol>
        <h1 className="page-header"> Tukar Point </h1>
        <Panel>
          <PanelHeader> Tukar Point</PanelHeader>
          <PanelBody>
            <div className="col-lg-12 mt-3">
              <HeadTukarPoint />
            </div>
          </PanelBody>
        </Panel>

        <ModalGlobal
          size="l"
          content={<ModalTukar onSubmit={(data) => this.handleSubmit(data)} />}
        />
      </div>
    );
  }
}

export default connect()(TukarPoint);
