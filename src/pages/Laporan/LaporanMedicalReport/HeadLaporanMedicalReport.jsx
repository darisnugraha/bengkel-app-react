import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getCustomer } from "../../../actions/datamaster_action";
import { getToday } from "../../../components/notification/function";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";

class HeadLaporanMedicalReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listNopol: [],
    };
  }
  componentDidMount() {
    this.props.change("tanggal_awal", getToday());
    this.props.change("tanggal_akhir", getToday());
    this.props.dispatch(getCustomer());
  }
  getNopol(data) {
    let listNopol = this.props.listcustomer.filter(
      (list) => list.kode_customer === data
    );
    let final = listNopol[0].nopol_kendaraan.map((hasil) => {
      let data = {
        value: hasil.nopol_kendaraan,
        name: hasil.nopol_kendaraan,
      };
      return data;
    });
    this.setState({
      listNopol: final,
    });
    localStorage.setItem("no_polisi", final[0].name);
    this.props.change("no_polisi", localStorage.getItem("no_polisi"));
  }

  setNopol(data){
    this.props.change("no_polisi",data);
  }

  setCustomer(data) {
    let hasil = data.split("||");
    console.log(data);
    // this.props.change("alamat", hasil[1]);
    // this.props.change("kota", hasil[2]);
    // this.props.change("handphone", hasil[3]);
    this.getNopol(hasil[0]);
    this.props.change("nopol_kendaraan", hasil[0]);
    localStorage.setItem("kode_cust", data);
    // this.props.change("merk_kendaraan", hasil[5]);
    // this.props.change("type_kendaraan", hasil[6]);
    // this.props.change("warna_kendaraan", hasil[7]);
    // this.props.change("nomesin_kendaraan", hasil[8]);
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="row">
          <div className="col-lg-3">
            <Field
              name="nama_customer"
              component={ReanderSelect}
              options={this.props.listcustomer.map((list) => {
                let data = {
                  value: `${list.kode_customer}`,
                  name: `${list.nama_customer}`,
                };
                return data;
              })}
              type="text"
              label="Nama Customer"
              placeholder="Masukan Nama Customer"
              onChange={(e) => this.setCustomer(e)}
            />
          </div>
          <div className="col-lg-3">
            {this.state.listNopol.length === 0 ? (
              <Field
                name="nopol_kendaraan"
                component={ReanderSelect}
                type="text"
                label="Nomor Polisi"
                placeholder="Masukan Nomor Polisi"
                // options={this.state.listNopol}
                // options={this.state.listCustomer.map((list)=>{
                //   let data={
                //     value:JSON.stringify(list.nopol_kendaraan),
                //     name:list.nopol_kendaraan
                //   };
                //   console.log("iki ganteng", list)
                //   return data
                // })}
              />
            ) : (
              <Field
                name="nopol_kendaraan"
                component={ReanderSelect}
                type="text"
                label="Nomor Polisi"
                // placeholder="Masukan Nomor Polisi"
                options={this.state.listNopol}
                onChange={(data)=>this.setNopol(data)}
                // options={this.state.listCustomer.map((list)=>{
                //   let data={
                //     value:JSON.stringify(list.nopol_kendaraan),
                //     name:list.nopol_kendaraan
                //   };
                //   console.log("iki ganteng", list)
                //   return data
                // })}
              />
            )}
          </div>
          <div className="col-lg-3 d-none">
          <Field
            name="no_polisi"
            component={ReanderField}
            type="text"
            label="no_polisi"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="tanggal_awal"
              component={ReanderField}
              type="date"
              label="Dari Tanggal"
              placeholder="Masukan Tanggal Awal"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="tanggal_akhir"
              component={ReanderField}
              type="date"
              label="Sampai Tanggal"
              placeholder="Masukan Sampai Tanggal"
            />
          </div>

          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary" disabled={this.props.onSend}>
                {this.props.onSend ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                    Menyiapkan Laporan
                  </>
                ) : (
                  <>
                    Lihat Data <i className="fa fa-print ml-3 "></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

HeadLaporanMedicalReport = reduxForm({
  form: "HeadLaporanMedicalReport",
  enableReinitialize: true,
})(HeadLaporanMedicalReport);
export default connect((state) => {
  return {
    listcustomer: state.datamaster.listcustomer,
    onSend: state.datamaster.onSend,
  };
})(HeadLaporanMedicalReport);
