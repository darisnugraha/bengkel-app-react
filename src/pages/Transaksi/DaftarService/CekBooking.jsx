import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { hideModal } from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import Tabel from "../../../components/Tabel/tabel";

class CekBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBooking: [],
      columns: [
        {
          dataField: "no_booking",
          text: "No Booking",
        },
        {
          dataField: "tgl_booking",
          text: "Tanggal Booking",
        },
        {
          dataField: "nopol_kendaraan",
          text: "Nomor Polisi",
        },
        {
          dataField: "jenis_service",
          text: "Jenis Service",
        },
        {
          dataField: "tgl_layanan",
          text: "Tanggal",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let data = {
             no_booking : row.no_booking,
            };
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    className="btn btn-teal mr-3"
                    onClick={() => {
                      localStorage.setItem("no_booking", row.no_booking);
                      this.handlePilih()
                    }}
                    // onClick={() => {
                    //   this.detail(data);
                    // }}
                    type="button"
                  >
                    Pilih
                    <i className="fa fa-cart-arrow-down ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }

  componentDidMount() {
    AxiosMasterGet("service/booking/getDataBookingAll").then((res) =>
      this.setState({
        listBooking: res && res.data,
      })
    );
  }

  handlePilih(){
    this.props.dispatch(hideModal())
    window.location.reload()
  }

  render() {
    return (
      <div>
        <Tabel
          data={this.state.listBooking || []}
          columns={this.state.columns}
          keyField="no_booking"
          empty={"true"}
          emptyText="Data Kosong"
        />
        <div className="col-lg-12">
          <p>
            Untuk Sementara, Silahkan Copy Nomor Booking dan Paste di Nomor
            Booking Pendaftaran
          </p>
          <p>Sedang Dalam Pengembangan agar bisa langsung copy</p>
        </div>
      </div>
    );
  }
}

CekBooking = reduxForm({
  form: "CekBooking",
  enableReinitialize: true,
})(CekBooking);
export default connect((state) => {
  return{

  };
})(CekBooking);
