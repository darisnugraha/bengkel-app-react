import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  NotifSucces,
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { reset } from "redux-form";
import ModalPencarianService from "./ModalPencarianService.jsx";
import ModalBayarService from "../PembayaranService/ModalBayarService.jsx";
import { showModal } from "../../../actions/datamaster_action.jsx";

import { AxiosMasterGet } from "../../../axios.js";

const ModalLihatService = lazy(() => import("./ModalLihatService.jsx"));

const maptostate = (state) => {
  return {
    kunci_temp: state.stocking.kunci_temp,
  };
};

class LihatService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
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

  handleSubmit(hasil) {
    console.log(hasil);
    let array = JSON.parse(localStorage.getItem("DaftarService")) || [];
    localStorage.setItem("DaftarService", JSON.stringify(array));
    NotifSucces("Berhasil Menambahan Data Booking").then(() =>
      this.props.dispatch(reset("ModalLihatService"))
    );
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
  setBayar() {
    this.setState({
      bayar: true,
    });
  }
  setPencarian(hasil) {
    AxiosMasterGet(
      "bayar-service/getLihatDataService/" +
        `${hasil.tanggal_awal}&${hasil.tanggal_akhir}`
    )
      .then((res) => {
        if (res.data.length === 0) {
          ToastError("Data Laporan Kosong!");
        } else {
          ToastSucces("Berhasil Mengambil Data!");
          this.setState({
            listService: res && res.data,
          });
        }
      })
      .catch((err) =>
        ToastError(`Error Mengambil Data, Detial : ${err.response.data}`)
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Lihat Service</li>
        </ol>
        <h1 className="page-header">Lihat Service </h1>
        <div className="row">
          {/* <div className="col-lg-12"> */}
            {/* <Panel>
              <PanelHeader>Pencarian</PanelHeader>
              <PanelBody> */}
                <br />
                {/* <ModalPencarianService
                  onSubmit={(data) => this.setPencarian(data)}
                /> */}
                {/* End Tambah Master Kategori  */}
              {/* </PanelBody>
            </Panel> */}
          {/* </div> */}
          <div className="col-lg-12">
            <Panel>
              <PanelHeader>Data Service</PanelHeader>
              <PanelBody>
              <ModalPencarianService
                  onSubmit={(data) => this.setPencarian(data)}
                />
                <br />
                {this.state.bayar ? (
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
                  <ModalLihatService
                    setBayar={() => this.setBayar()}
                    data={this.state.listService}
                  />
                )}
                {/* End Tambah Master Kategori  */}
              </PanelBody>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(maptostate, null)(LihatService);
