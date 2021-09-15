import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onFinish, onProgress } from "../../../actions/datamaster_action";
import { AxiosMasterPost } from "../../../axios";
import {
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import HeadParameterPoint from "./HeadParameterPoint";

class ParameterPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  HandleSubmit(hasil) {
    this.props.dispatch(onProgress());
    let data = {
      rupiah: hasil.rupiah,
      poin: hasil.poin,
    };
    AxiosMasterPost("member/parameter-poin", data)
      .then(() => NotifSucces("Setting parameter berhasil"))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        NotifError("Gagal Setting Parameter").then(() =>
          this.props.dispatch(onFinish())
        )
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Stock Opname</Link>
          </li>
          <li className="breadcrumb-item active">Parameter Point</li>
        </ol>
        <h1 className="page-header"> Parameter Point </h1>
        <Panel>
          <PanelHeader> Parameter Point</PanelHeader>
          <PanelBody>
            <div className="col-lg-12 mt-3">
              <HeadParameterPoint
                onSubmit={(data) => this.HandleSubmit(data)}
              />
            </div>
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect()(ParameterPoint);
