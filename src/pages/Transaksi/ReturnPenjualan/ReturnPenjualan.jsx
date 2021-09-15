import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import ModalGlobal from "../../ModalGlobal";
import HeadReturnPenjualan from "./HeadReturnPenjualan";
import ModalDetailReturnPenjualan from "./ModalDetailReturnPenjualan";
import ModalReturnPenjualan from "./ModalReturnPenjualan";
import ModalBayarService from "../PembayaranService/ModalBayarService.jsx";
import { showModal } from "../../../actions/datamaster_action";
import { connect } from "react-redux";
import ModalCC from "../PembayaranService/ModalCC";

class ReturnPenjualan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cari_barang: false,
      bayar: false,
      columnsListBayar: [
        {
          dataField: "jenis_bayar",
          text: "Jenis Bayar",
        },
        {
          dataField: "nama_bank",
          text: "Bank",
        },
        {
          dataField: "jumlah",
          text: "Jumlah",
        },
      ],
      dataListBayar: [
        {
          jenis_bayar: "CREDIT CARD",
          bank: "BCA",
          jumlah: 100000000,
        },
      ],
    };
  }

  handleSubmit(data) {
    console.log(data);
  }
  setCariBarang() {
    this.setState({
      cari_barang: true,
    });
  }
  setBack() {
    this.setState({
      cari_barang: false,
    });
  }
  setBayar() {
    this.setState({
      bayar: true,
    });
  }
  showCC() {
    this.props.dispatch(showModal());
    this.setState({
      jenisModal: "CC",
    });
  }
  handleSimpanCC(data) {
    console.log(data);
  }
  showDetail() {
    this.props.dispatch(showModal());
    this.setState({
      jenisModal: "DETAIL",
    });
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Return Penjualan</li>
        </ol>
        <h1 className="page-header">Return Penjualan </h1>
        <div className="row">
          <div className="col-lg-12">
            <Panel>
              <PanelHeader>Return Penjualan</PanelHeader>
              <PanelBody>
                <br />
                {this.state.cari_barang ? (
                  <ModalReturnPenjualan
                    setBack={() => this.setBack()}
                    showDetail={() => this.showDetail()}
                  />
                ) : this.state.bayar ? (
                  <ModalBayarService
                    showCC={() => this.showCC()}
                    columns={this.state.columnsListBayar}
                    data={this.state.dataListBayar}
                    backMenu={() =>
                      this.setState({
                        bayar: false,
                      })
                    }
                  />
                ) : (
                  <HeadReturnPenjualan
                    onSubmit={(data) => this.handleSubmit(data)}
                    setCariBarang={() => this.setCariBarang()}
                    setBayar={() => this.setBayar()}
                  />
                )}
                <br />

                {/* End Tambah Master Kategori  */}
              </PanelBody>
            </Panel>
            <ModalGlobal
              title={
                this.state.jenisModal === "DETAIL"
                  ? "Detail Barang"
                  : this.state.jenisModal === "CC"
                  ? "Credit Card"
                  : null
              }
              content={
                this.state.jenisModal === "DETAIL" ? (
                  <ModalDetailReturnPenjualan />
                ) : this.state.jenisModal === "CC" ? (
                  <ModalCC onSubmit={(data) => this.handleSimpanCC(data)} />
                ) : null
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ReturnPenjualan);
