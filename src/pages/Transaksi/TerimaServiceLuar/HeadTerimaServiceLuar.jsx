import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  getListKirimServiceLuar,
  setGrandTotal,
} from "../../../actions/transaksi_action";
import { AxiosMasterGet } from "../../../axios";
import { getToday } from "../../../components/notification/function";
import {
  ReanderField,
  RenderFieldGroup,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

class HeadServiceLuar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          dataField: "no_service_kirim",
          text: "Nomor",
        },
        {
          dataField: "tgl_service_kirim",
          text: "Tanggal Kirim",
        },
        {
          dataField: "nopol_kendaraan",
          text: "Nomor Polisi",
        },
        {
          dataField: "kode_supplier",
          text: "Supplier",
        },
        {
          dataField: "nama_customer",
          text: "Customer",
        },
        {
          dataField: "sub_total",
          text: "Sub Total",
          formatter: (data) => {
            return data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "diskon_rp",
          text: "Diskon",
          formatter: (data) => {
            return data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "grand_total",
          text: "Total",
          formatter: (data) => {
            return data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let data = {
              grand_total: row.grand_total,
              no_bon: row.no_service_kirim,
            };
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    onClick={() => {
                      this.props.showBayar();
                      this.props.dispatch(setGrandTotal(data));
                    }}
                    className="btn btn-primary mr-3"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }
  getServiceLuar() {
    alert("ITS WORKED");
  }
  componentDidMount() {
    this.props.dispatch(getListKirimServiceLuar());
    this.props.change("tanggal", getToday());
    AxiosMasterGet("terima-service-luar/generate/no-trx").then((res) =>
      this.props.change(
        "no_service_terima",
        res && res.data[0].no_service_terima
      )
    );
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-4">
          <Field
            name="no_service_kirim"
            component={RenderFieldGroup}
            type="text"
            label="Nomor Service Kirim"
            placeholder="Masukan Nomor Service Kirim"
            handleClick={(data) => this.getServiceLuar(data)}
          />
        </div>
        <div className="col-lg-4 d-none">
          <Field
            name="no_service_terima"
            component={RenderFieldGroup}
            type="text"
            label="Nomor Service Kirim"
            placeholder="Masukan Nomor Service Kirim"
            handleClick={(data) => this.getServiceLuar(data)}
            readOnly
          />
        </div>
        <div className="col-lg-4">
          <Field
            name="tanggal"
            component={ReanderField}
            type="date"
            label="Tanggal"
            placeholder="Masukan Tanggal"
          />
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-12">
          <Tabel
            keyField="nama_supplier"
            data={this.props.listkirimserviceluar || []}
            columns={this.state.columns}
            empty={true}
            emptyText="Silahkan Masukan Nomor Service dan klik cari"
          />
        </div>
      </div>
    );
  }
}

HeadServiceLuar = reduxForm({
  form: "HeadServiceLuar",
  enableReinitialize: true,
})(HeadServiceLuar);
export default connect((state) => {
  return {
    no_service_kirim: localStorage.getItem("terima_service_luar_nomor"),
    listkirimserviceluar: state.transaksi.listkirimserviceluar,
  };
})(HeadServiceLuar);
