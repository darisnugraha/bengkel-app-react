import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getKendaraan, getWarna } from "../../../actions/datamaster_action";
import {
  ReanderFieldInline,
  ReanderSelectInline,
} from "../../../components/notification/notification";

class HeadInputDataMember extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getKendaraan());
    this.props.dispatch(getWarna());
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
            <div className="col-lg-12">
              <Field
                name="nama_member"
                component={ReanderFieldInline}
                type="text"
                label="Nama Member"
                placeholder="Masukan Nama Member"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="alamat"
                component={ReanderFieldInline}
                type="text"
                label="Alamat"
                placeholder="Masukan Alamat"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="kota"
                component={ReanderFieldInline}
                type="text"
                label="Kota"
                placeholder="Masukan Kota"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="kode_pos"
                component={ReanderFieldInline}
                type="number"
                label="Kode Pos"
                placeholder="Masukan Kode Pos"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="no_ktp"
                component={ReanderFieldInline}
                type="number"
                label="No KTP"
                placeholder="Masukan No KTP"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="tanggal_lahir"
                component={ReanderFieldInline}
                type="date"
                label="Tanggal Lahir"
                placeholder="Masukan Tanggal Lahir"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="col-lg-12">
              <Field
                name="telepon"
                component={ReanderFieldInline}
                type="number"
                label="Telepon"
                placeholder="Masukan Telepon"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="handphone"
                component={ReanderFieldInline}
                type="number"
                label="Handphone"
                placeholder="Masukan Handphone"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="nopol_kendaraan"
                component={ReanderFieldInline}
                type="text"
                label="Nomor Polisi"
                placeholder="Masukan Nomor Polisi"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="type_kendaraan"
                component={ReanderFieldInline}
                type="text"
                label="Type Kendaraan"
                placeholder="Masukan Type "
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="merk_kendaraan"
                component={ReanderSelectInline}
                options={this.props.listkendaraan.map((list) => {
                  let data = {
                    value: list.kode_merk_kendaraan,
                    name: list.nama_merk_kendaraan,
                  };
                  return data;
                })}
                type="number"
                label="Merk Kendaraan"
                placeholder="Masukan Merk"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="warna_kendaraan"
                component={ReanderSelectInline}
                options={this.props.listwarna.map((list) => {
                  let data = {
                    value: list.kode_warna,
                    name: list.nama_warna,
                  };
                  return data;
                })}
                type="number"
                label="Warna Kendaraan"
                placeholder="Masukan Warna Kendaraan"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="nomesin_kendaraan"
                component={ReanderFieldInline}
                type="text"
                label="Nomor Mesin"
                placeholder="Masukan Nomor mesin"
              />
            </div>
            <div className="col-lg-12 d-none">
              <Field
                name="kode_customer"
                component={ReanderFieldInline}
                type="text"
                label="Nomor Mesin"
                placeholder="Masukan Nomor mesin"
              />
            </div>
          </div>
          <div className="col-lg-12">
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
        </div>
      </form>
    );
  }
}

HeadInputDataMember = reduxForm({
  form: "HeadInputDataMember",
  enableReinitialize: true,
})(HeadInputDataMember);
export default connect((state) => {
  if (state.member.listEdit !== []) {
    return {
      initialValues: {
        nama_member: state.member.listEdit.nama_customer,
        alamat: state.member.listEdit.alamat,
        kota: state.member.listEdit.kota,
        kode_pos: state.member.listEdit.kode_pos,
        no_ktp: state.member.listEdit.no_ktp,
        tanggal_lahir: state.member.listEdit.tgl_lahir,
        telepon: state.member.listEdit.telepon,
        handphone: state.member.listEdit.handphone,
        nopol_kendaraan: state.member.listEdit.nopol_kendaraan,
        merk_kendaraan: state.member.listEdit.merk_kendaraan,
        type_kendaraan: state.member.listEdit.type_kendaraan,
        warna_kendaraan: state.member.listEdit.warna_kendaraan,
        nomesin_kendaraan: state.member.listEdit.nomesin_kendaraan,
        kode_customer: state.member.listEdit.kode_customer,
      },
      listkendaraan: state.datamaster.listkendaraan,
      listwarna: state.datamaster.listwarna,
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      listkendaraan: state.datamaster.listkendaraan,
      listwarna: state.datamaster.listwarna,
      onSend: state.datamaster.onSend,
    };
  }
})(HeadInputDataMember);
