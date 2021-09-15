import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader } from "../components/panel/panel.jsx";


class BlankPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
  }
 
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Barang</Link>
          </li>
          <li className="breadcrumb-item active">Terima Barang</li>
        </ol>
        <h1 className="page-header">Terima Barang </h1>
        <Panel>
          <PanelHeader>Terima Barang</PanelHeader>
          <br />
          {/* Terima Barang */}
          <div className="container">
           
          </div>
          <br />
          {/* End Tambah Terima Barang  */}
        </Panel>
      </div>
    );
  }
}

export default BlankPages;
