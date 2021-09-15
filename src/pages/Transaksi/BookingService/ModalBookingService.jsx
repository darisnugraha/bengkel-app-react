import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  ReanderField,
  ReanderSelect,
  ToastError,
} from "../../../components/notification/notification";
import {
  getCustomer,
  getKategoriService,
  getNopolCustomer,
  getSales,
} from "../../../actions/datamaster_action";
import { required } from "../../../validasi/normalize";
import { getToday } from "../../../components/notification/function";
import { AxiosMasterGet } from "../../../axios";

class ModalBookingService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: false,
      reguler: false,
      listCustomer: [],
      listkendaraan: [],
      listNopol: []
    };
  }
  handleChange(nama, data) {
    let split = data || "DEFAULT|DEFAULT";
    let hasil = split.split("|");
    this.props.change(nama, hasil[1]);
  }
  componentDidMount() {
    this.props.dispatch(getCustomer());
    this.props.dispatch(getKategoriService());
    this.props.dispatch(getSales());
    this.props.change("tanggal", getToday());
    getCustomer();
  }
  getMember() {
    this.setState({
      member: true,
      reguler: false,
    });
    this.props.change("pelaggan", "");
    AxiosMasterGet("member/get-member-all")
      .then((res) =>
        this.setState({
          listCustomer:
            res &&
            res.data.map((list) => {
              let data = {
                value: `${list.nama_customer}||${list.alamat}||${list.handphone}||${list.nopol_kendaraan}`,
                name: list.nama_customer,
              };
              return data;
            }),
        })
      )
      .catch(() => ToastError("Error Get Member"));
  }
  getCustomer() {
    this.setState({
      member: false,
      reguler: true,
    });
    this.props.change("pelaggan", "");
    AxiosMasterGet("customer/get/all").then((res) =>
      this.setState({
        listCustomer:
          res &&
          res.data.map((list) => {
            let data = {
              value: `${list.nama_customer}||${list.alamat}||${list.handphone}||${list.kode_customer}`,
              name: list.nama_customer,
            };
            console.log(data)
            return data;
          }),
      })
    );
  }
  getNopol(data){
  let listNopol =   this.props.listCustomer.filter((list) => list.kode_customer === data)
   let final =  listNopol[0].nopol_kendaraan.map((hasil) => {
    let data = {
      value : hasil.nopol_kendaraan,
      name : hasil.nopol_kendaraan
    }
    return data
  })
  this.setState({
    listNopol : final
  })
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-2">
                <label className="mb-4">Jenis Penjualan</label>
                <div>
                  <label className="ml-3">
                    <Field
                      name="jenis_penjualan"
                      component="input"
                      type="radio"
                      value="member"
                      className="mr-3"
                      onClick={() => this.getMember()}
                      checked={this.state.member}
                    />
                    Member
                  </label>
                  <label className="ml-3">
                    <Field
                      name="jenis_penjualan"
                      component="input"
                      type="radio"
                      value="reguler"
                      className="mr-3"
                      onClick={() => this.getCustomer()}
                      checked={this.state.reguler}
                    />
                    Reguler
                  </label>
                </div>
              </div>
              <div className="col-lg-3">
                <Field
                  name="pelaggan"
                  component={ReanderSelect}
                  options={this.state.listCustomer}
                  onChange={(data) =>
                  this.getNopol(data.split("||")[3])
                  }
                  type="text"
                  label="Nama customer"
                  placeholder="Nama customer"
                  validate={required}
                  loading={this.props.listCustomer === [] ? true : false}
                />
              </div>
              <div className="col-lg-3 d-none">
                {/* <Field
                  name="nopol_kendaraan"
                  component={ReanderField}
                  type="text"
                  label="nopol"
                  placeholder="Masukan nopol"
                  options=""
                /> */}
              </div>
              <div className="col-lg-2">
                <Field
                  name="kategori_service"
                  component={ReanderSelect}
                  options={this.props.listkategoriservice.map((list) => {
                    let data = {
                      value: list.jenis_service,
                      name: list.jenis_service,
                    };
                    return data;
                  })}
                  type="text"
                  label="Jenis Service"
                  placeholder="Jenis Service"
                  validate={required}
                  loading={this.props.listkategoriservice === [] ? true : false}
                />
              </div>
              <div className="col-lg-2">
                <Field
                  name="tanggal"
                  component={ReanderField}
                  type="date"
                  label="Tanggal Pelayanan"
                  placeholder="Masukan Tanggal Pelayanan"
                  validate={required}
                />
              </div>
              <div className="col-lg-2">
                <Field
                  name="jam"
                  component={ReanderField}
                  type="text"
                  label="Jam"
                  placeholder="Masukan Jam"
                />
              </div>
              {/* <div className="col-lg-3 mt-2">
                <Field  
                  name="id_kepala_montir"
                  component={ReanderSelect}
                  options={this.props.listsales
                    .filter((list) => list.kode_divisi === "KPM")
                    .map((list) => {
                      let data = {
                        value: list.kode_pegawai,
                        name: list.nama_pegawai,
                      };
                      return data;
                    })}
                  type="text"
                  label="ID Kepala Montir"
                  placeholder="Masukan ID Kepala Montir"
                  validate={required}
                  loading={this.props.listsales === [] ? true : false}
                />
              </div> */}
              <div className="col-lg-3 mt-2">
                <Field  
                  name="id_mekanik"
                  component={ReanderSelect}
                  options={this.props.listsales
                    .filter((list) => list.kode_divisi === "MKN")
                    .map((list) => {
                      let data = {
                        value: list.kode_pegawai,
                        name: list.nama_pegawai,
                      };
                      return data;
                    })}
                  type="text"
                  label="ID Mekanik"
                  placeholder="Masukan ID Mekanik"
                  validate={required}
                  loading={this.props.listsales === [] ? true : false}
                />
              </div>
              {/* <div className="col-lg-3 mt-2">
                <Field  
                  name="id_helper"
                  component={ReanderSelect}
                  options={this.props.listsales
                    .filter((list) => list.kode_divisi === "HLP")
                    .map((list) => {
                      let data = {
                        value: list.kode_pegawai,
                        name: list.nama_pegawai,
                      };
                      return data;
                    })}
                  type="text"
                  label="ID Helper"
                  placeholder="Masukan ID Helper"
                  validate={required}
                  loading={this.props.listsales === [] ? true : false}
                />
              </div> */}
              {/* {console.log(this.state.listNopol)} */}
              <div className="col-lg-3 mt-2">
                <Field 
                name="no_polisi"
                component={ReanderSelect}
                options={this.state.listNopol}
                type="text"
                label="Nomor Polisi"
                placeholder="Masukan Nomor Polisi"
                validate={required}
                loading={this.props.listcustomer === [] ? true : false}
                />
              </div>
              <div className="col-lg-12">
                <label htmlFor="">Catatan</label>
                <Field
                  name="catatan"
                  component="textarea"
                  type="text"
                  label="Catatan"
                  placeholder="Masukan Catatan"
                  className="form-control"
                  validate={required}
                />
                <span>**Mohon Isi Catatan</span>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <div className="text-right">
              <button className="btn btn-primary" disabled={this.props.onSend}>
                {this.props.onSend ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                    Menyimpan
                  </>
                ) : (
                  <>
                    Simpan <i className="fa fa-paper-plane ml-3 "></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ModalBookingService = reduxForm({
  form: "ModalBookingService",
  enableReinitialize: true,
})(ModalBookingService);
export default connect((state) => {
  return {
    listCustomer: state.datamaster.listcustomer,
    listkategoriservice: state.datamaster.listkategoriservice,
    listkendaraan: state.datamaster.listkendaraan,
    listsales: state.datamaster.listsales,
    listNopol: state.datamaster.listNopol,
    onSend: state.datamaster.onSend,
  };
})(ModalBookingService);
