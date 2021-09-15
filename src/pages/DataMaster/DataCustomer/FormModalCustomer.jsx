import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { AxiosMasterGet } from "../../../axios";
import {
  NotifError,
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datacustomer !== undefined) {
    return {
      initialValues: {
        nama_customer: state.datamaster.datacustomer.nama_customer,
        // kode_customer: state.datamaster.datacustomer.kode_customer,
        alamat_customer: state.datamaster.datacustomer.alamat,
        kota_customer: state.datamaster.datacustomer.kota,
        handphone_customer: state.datamaster.datacustomer.handphone,
        // no_polisi: state.datamaster.datacustomer.nopol_kendaraan,
        merk: state.datamaster.datacustomer.merk_kendaraan,
        type: state.datamaster.datacustomer.type_kendaraan,
        no_mesin: state.datamaster.datacustomer.nomesin_kendaraan,
        warna: state.datamaster.datacustomer.warna_kendaraan,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMerk: [],
      listNopol: [],
      listWarna: []
    };
  }

  componentDidMount() {
    AxiosMasterGet("merk-kendaraan/get/all")
      .then((res) =>
        this.setState({
          listMerk: res.data,
        })
      )
      .catch((err) => NotifError(err.response.data || "Tidak Ada Koneksi"));
    this.props.change("kode_customer", this.props.noFaktur);

    AxiosMasterGet("kendaraan-customer/get/all")
      .then((res) => this.setState({ listNopol: res.data }))
      // .then(() => console.log(this.state.listNopol))
      .catch((err) => NotifError(err.response.data || "Tidak Ada Koneksi"));

      AxiosMasterGet("warna/get/all")
      .then((res) =>
        this.setState({
          listWarna: res.data,
        })
      )
      .catch((err) => NotifError(err.response.data || "Tidak Ada Koneksi"));
  }

  getKendaraanCustomer(e) {
    AxiosMasterGet("kendaraan-customer/get/by-nopol/" + e)
    .then((res) =>
      // this.setState({
      //   listkendaraan:
      //     res &&
      //     res.data.map((list) => {
      //       let data = {
      //         value: `${list.nopol_kendaraan}||${list.nomesin_kendaraan}||${list.merk_kendaraan}||${list.warna_kendaraan}||${list.type_kendaraan}||${list.id_customer}`,
      //         name: list.nama_customer,
      //       };
      //       console.log("data",data);
      //       return data;
      //     }),
      // }
      {
        let data = res && res.data 
        this.props.change("type", data[0].type_kendaraan)
        // this.props.change("merk", data[0].merk_kendaraan)
        this.props.change("warna", data[0].warna_kendaraan)
        this.props.change("no_mesin",data[0].nomesin_kendaraan)
      }
      
    );
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="row">
          <div className="col-lg-6">
            <div className="col-lg-3 d-none">
              <Field
                name="kode_customer"
                component={ReanderField}
                type="text"
                label="Kode CUstomer"
                placeholder="Masukan Kode Customer"
                validate={required}
              />
            </div>
            <h3 className="mb-3">Data Pemilik :</h3>
            <Field
              name="nama_customer"
              component={ReanderField}
              type="text"
              label="Nama"
              placeholder="Masukan Nama"
              validate={required}
              value={this.props.kode_customer}
            />
            <Field
              name="alamat_customer"
              component={ReanderField}
              type="text"
              label="Alamat"
              placeholder="Masukan Alamat"
            />
            <Field
              name="kota_customer"
              component={ReanderField}
              type="text"
              label="Kota"
              placeholder="Masukan Kota"
            />
            <Field
              name="handphone_customer"
              component={ReanderField}
              type="text"
              label="Handphone"
              placeholder="Masukan Handphone"
            />
          </div>
          <div className="col-lg-6">
            <h3 className="mb-3">Data Kendaraan :</h3>
            <Field
              name="no_polisi"
              component={ReanderSelect}
              type="text"
              label="Nomor Polisi"
              options={this.state.listNopol
                .filter((fill)=> fill.id_customer === localStorage.getItem("kode_customer"))
                .map((list)=>{
                let data = {
                  value: list.nopol_kendaraan,
                  name: list.nopol_kendaraan
                }
                return data
              })}
              validate={required}
              onChange={(e)=>this.getKendaraanCustomer(e)}
            />
            <Field
              name="merk"
              component={ReanderSelect}
              options={this.state.listMerk.map((list) => {
                let data = {
                  value: list.kode_merk_kendaraan,
                  name: list.nama_merk_kendaraan,
                };
                return data;
              })}
              type="text"
              label="Merk"
            />
            <Field
              name="type"
              component={ReanderField}
              type="text"
              label="Type"
              placeholder="Masukan Type"
            />
            <Field
              name="warna"
              component={ReanderSelect}
              options={this.state.listWarna.map((list) => {
                let data = {
                  value: list.kode_warna,
                  name: list.nama_warna,
                };
                return data;
              })}
              type="text"
              label="Warna"
            />
            <Field
              name="no_mesin"
              component={ReanderField}
              type="text"
              label="Nomor Mesin"
              placeholder="Masukan Nomor Mesin"
              validate={required}
            />
          </div>
        </div>
        <div className="col-lg-12">
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
          {/* <button className="btn btn-danger ml-3" disabled={this.props.onSend}>
            {this.props.onSend ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                Menyimpan
              </>
            ) : (
              <>
                Batal <i className="fa fa-times ml-3 "></i>
              </>
            )}
          </button> */}
        </div>
      </form>
    );
  }
}

FormModalCustomer = reduxForm({
  form: "dataCustomer",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalCustomer);
export default connect(maptostate, null)(FormModalCustomer);
