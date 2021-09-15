import React, { Component } from "react";
import { Link } from "react-router-dom";
import hakakses from "../../../assets/HakAkses.svg";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import HeadHakAkses from "./HeadHakAkses";
import { getListUser } from "../../../actions/supervisor_action";
import { connect } from "react-redux";

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
          dataField: "nama_lengkap",
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
    console.log(hasil);
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Supervisor</Link>
          </li>
          <li className="breadcrumb-item active">Hak Akses User</li>
        </ol>
        <h1 className="page-header">Hak Akses User </h1>
        <Panel>
          <PanelHeader>Hak Akses User</PanelHeader>
          <div className="col-lg-12">
            <div className="text-center">
              <img src={hakakses} alt="Add Logo" width={300} />
              <h5>
                Hak Akses Berguna untuk membatasi User didalam mengakses menu
                dan pengisian form
              </h5>
            </div>
          </div>
          <PanelBody>
            <div className="col-lg-12 mb-3">
              <HeadHakAkses onSubmit={(data) => this.handleSubmit(data)} />
            </div>
            {/* <div className="container text-center mt-5 ">
              <div className="align-item-center">
                <img src={access} alt="Access" width="30%" />
                <h1> Mohon Maaf</h1>
                <h1 className="f-w-900">Menu ini Masih Dalam Pengembangan</h1>
                <h5>Mungkin akan ada dalam update selanjutnya</h5>
                <div>
                  <Link to="/dashboard">
                    <button className="btn btn-primary mt-3">
                      <i className="fa fa-chevron-left mr-3"></i> Go Home
                    </button>
                  </Link>
                </div>
              </div>
            </div> */}
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(CreateUser);
