import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "redux-form";
import {
  getSelfing,
  getSupplier,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action";
import { getListStockOpname } from "../../../actions/supervisor_action";
import { AxiosMasterPost } from "../../../axios";
import {
  NotifSucces,
  ToastError,
} from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import { simpanLocal } from "../../../config/Helper";
import ModalGlobal from "../../ModalGlobal";
import HeadStockOpname from "./HeadStockOpname";
import ModalStockOpname from "./ModalStockOpname";

class StockOpname extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getSelfing());
    this.props.dispatch(getSupplier());
  }
  handleHead(hasil) {
    this.props.dispatch(onProgress());
    let detailBarang =
      JSON.parse(localStorage.getItem("StockOpname_temp")) || [];
    let data = {
      tanggal: hasil.tanggal,
      kode_lokasi_shelving: hasil.lokasi,
      detail_barang: detailBarang.map(
        ({ nama_barang, kode_barang, satuan, kode_supplier1, ...rest }) => rest
      ),
    };
    AxiosMasterPost("stock-opname/post-transaksi", data)
      .then(() => NotifSucces("Stockopname Berhasil"))
      .then(() => this.props.dispatch(reset("HeadStockOpname")))
      .then(() => localStorage.removeItem("StockOpname_temp"))
      .then(() => localStorage.removeItem("lokasi_stock_opname"))
      .then(() => this.props.dispatch(getListStockOpname()))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(`Gagal StockOpname , Error : ${err.response.data}`).then(
          () => this.props.dispatch(onFinish())
        )
      );
  }
  handleModal(hasil) {
    simpanLocal("StockOpname_temp", hasil);
    this.props.dispatch(getListStockOpname());
    this.props.dispatch(reset("ModalStockOpname"));
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Stock Opname</Link>
          </li>
          <li className="breadcrumb-item active">Stock Opname Barang</li>
        </ol>
        <h1 className="page-header">Stock Opname Barang </h1>
        <Panel>
          <PanelHeader>Stock Opname Barang</PanelHeader>
          <PanelBody>
            <div className="col-lg-12">
              <HeadStockOpname
                onSubmit={(data) => this.handleHead(data)}
                liststockopname={this.props.liststockopname}
              />
            </div>
          </PanelBody>
        </Panel>
        <ModalGlobal
          title="Tambah Data Barang"
          content={
            <ModalStockOpname onSubmit={(data) => this.handleModal(data)} />
          }
        />
      </div>
    );
  }
}

export default connect()(StockOpname);
