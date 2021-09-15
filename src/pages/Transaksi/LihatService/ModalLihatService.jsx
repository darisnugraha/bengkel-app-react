import React, { Component } from "react";
import { connect } from "react-redux";
import { onFinish, onProgress } from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import { ToastError } from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";
import CetakFaktur from "../PembayaranService/CetakFaktur";
import Moment from "moment";

class ModalLihatService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLaporan: [],
      columns: [
        {
          dataField: "no_service",
          text: "No Service",
        },
        {
          dataField: "nama_customer",
          text: "Nama Customer",
        },

        {
          dataField: "nopol_kendaraan",
          text: "Nomor Polisi",
        },
        {
          dataField: "id_mekanik",
          text: "ID Mekanik",
        },
        {
          dataField: "tgl_masuk",
          text: "Tgl.Masuk",
          formatter: (data) => Moment(data).format('DD/MM/YYYY'),
        },
        {
          dataField: "tgl_keluar",
          text: "Tgl.Keluar",
          formatter: (data) => Moment(data).format('DD/MM/YYYY'),
        },
        {
          dataField: "km_masuk",
          text: "KM Masuk",
          formatter: (data) => {
            return + data.toLocaleString("id-ID")+" KM";
          },
        },
        {
          dataField: "km_keluar",
          text: "KM Keluar",
          formatter: (data) => {
            return + data.toLocaleString("id-ID")+" KM";
          },
        },
        {
          dataField: "km_service",
          text: "KM Service",
          formatter: (data) => {
            return + data.toLocaleString("id-ID")+" KM";
          },
        },
        {
          dataField: "total_bayar",
          text: "Total Bayar",
          formatter: (data) => {
            return "Rp. " + data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            this.setState({});
            return (
              <div className="text-center">
                <div className="col-12">
                  <button
                    className="btn btn-warning"
                    type="button"
                    onClick={() => this.printLaporan(row.no_service)}
                  >
                    {this.props.onSend ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                      </>
                    ) : (
                      <i className="fa fa-print"></i>
                    )}
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }
  printLaporan(hasil) {
    this.props.dispatch(onProgress());
    AxiosMasterGet(`bayar-service/getDataServiceByNoService/${hasil}`)
      .then((res) =>
        this.setState({
          listLaporan: res && res.data,
        })
      )
      .then(() => CetakFaktur(this.state.listLaporan))
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(
          `Error Mengambil Data, Detail : ${err.response.data}`
        ).then(() => this.props.dispatch(onFinish()))
      );
  }
  render() {
    return (
      <div className="col-lg-12">
        <Tabel
          keyField="no_service"
          data={this.props.data}
          columns={this.state.columns}
          emptyText="Sepertinya Nomor Service Tidak Ada"
          empty={true}
        />
        {/* {console.log(this.props.data)} */}
      </div>
    );
  }
}

export default connect((state) => {
  return {
    onSend: state.datamaster.onSend,
  };
})(ModalLihatService);
