import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";
import Stepper from "react-stepper-horizontal";
import { required } from "../../../validasi/normalize";

class FormModalSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      step1: "row",
      step2: "row d-none",
      step3: "row d-none",
    };
  }
  nextStep() {
    switch (this.state.step) {
      case 0:
        this.setState({
          step: this.state.step + 1,
          step1: "row d-none",
          step2: "row",
          step3: "row d-none",
        });
        break;
      case 1:
        this.setState({
          step: this.state.step + 1,
          step1: "row d-none",
          step2: "row d-none",
          step3: "row ",
        });
        break;
      default:
        break;
    }
  }
  prevStep() {
    switch (this.state.step) {
      case 1:
        this.setState({
          step: this.state.step - 1,
          step1: "row ",
          step2: "row d-none",
          step3: "row d-none",
        });
        break;
      case 2:
        this.setState({
          step: this.state.step - 1,
          step1: "row d-none",
          step2: "row ",
          step3: "row d-none ",
        });
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="col-lg-12">
          <div className="mb-5">
            <Stepper
              defaultBarColor={"#98CCEC"}
              completeColor={"#00ACAC"}
              steps={[
                { title: "Data Diri" },
                { title: "Data Rekening" },
                { title: "Data NPWP" },
              ]}
              activeStep={this.state.step}
            />
          </div>
          <div className="col-lg-12">
            <div className={this.state.step1}>
              <div className="col-lg-4">
                <Field
                  name="kode_supplier"
                  component={ReanderField}
                  type="text"
                  label="Kode Supplier"
                  placeholder="Masukan Kode Supplier"
                  readOnly={this.props.isEdit}
                  validate={required}
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="nama_supplier"
                  component={ReanderField}
                  type="text"
                  label="Nama Supplier"
                  placeholder="Masukan Nama Supplier"
                  validate={required}
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="contact_person"
                  component={ReanderField}
                  type="number"
                  label="Nomor Handphone"
                  placeholder="Masukan Nomor Handphone"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="fax"
                  component={ReanderField}
                  type="number"
                  label="Fax"
                  placeholder="Masukan Fax"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="telepon"
                  component={ReanderField}
                  type="number"
                  label="Telepon"
                  placeholder="Masukan Telepon"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="alamat"
                  component={ReanderField}
                  type="text"
                  label="Alamat"
                  placeholder="Masukan Alamat"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="kota"
                  component={ReanderField}
                  type="text"
                  label="Kota"
                  placeholder="Masukan Kota"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="kode_pos"
                  component={ReanderField}
                  type="number"
                  label="Kode Pos"
                  placeholder="Masukan Kode Pos"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="email"
                  component={ReanderField}
                  type="text"
                  label="Email"
                  placeholder="Masukan Email"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="type_pembayaran"
                  component={ReanderSelect}
                  options={[
                    { value: "cash", name: "CASH" },
                    { value: "kredit", name: "KREDIT" },
                  ]}
                  type="text"
                  label="Type Pembayaran"
                  placeholder="Masukan Type Pembayaran"
                />
              </div>

              <div className="col-lg-2">
                <Field
                  name="tanggal_pembayaran"
                  component={ReanderField}
                  type="number"
                  label="Lama Pembayaran"
                  placeholder="Lama Pembayaran"
                  readOnly={
                    this.props.jenis_bayar === "cash"
                      ? true
                      : this.props.jenis_bayar === undefined
                      ? true
                      : false
                  }
                />
              </div>
            </div>
            <div className={this.state.step2}>
              <div className="col-lg-4">
                <Field
                  name="nama_bank"
                  component={ReanderField}
                  type="text"
                  label="Nama Bank"
                  placeholder="Masukan Nama Bank"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="no_acc"
                  component={ReanderField}
                  type="number"
                  label="Nomor A/C"
                  placeholder="Masukan Nomor A/C"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="nama_pemilik"
                  component={ReanderField}
                  type="text"
                  label="Nama Pemilik"
                  placeholder="Masukan Nama Pemilik"
                />
              </div>
            </div>
            <div className={this.state.step3}>
              <div className="col-lg-4">
                <Field
                  name="NPWP"
                  component={ReanderField}
                  type="number"
                  label="NPWP"
                  placeholder="Masukan NPWP"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="nama_NPWP"
                  component={ReanderField}
                  type="text"
                  label="Nama NPWP"
                  placeholder="Masukan Nama NPWP"
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="alamat_NPWP"
                  component={ReanderField}
                  type="text"
                  label="Alamat NPWP"
                  placeholder="Masukan Alamat NPWP"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="text-left">
                  <button
                    type="button"
                    className={
                      this.state.step === 0
                        ? "btn btn-primary d-none"
                        : "btn btn-primary"
                    }
                    onClick={() => this.prevStep()}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="text-right">
                  <button
                    type="button"
                    className={
                      this.state.step === 2
                        ? "btn btn-primary d-none"
                        : "btn btn-primary"
                    }
                    onClick={() => this.nextStep()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-5">
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
      </form>
    );
  }
}

FormModalSupplier = reduxForm({
  form: "dataBarang",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalSupplier);
const selector = formValueSelector("dataBarang");
export default connect((state) => {
  if (state.datamaster.datasupplier !== undefined) {
    return {
      initialValues: {
        kode_supplier: state.datamaster.datasupplier.kode_supplier,
        nama_supplier: state.datamaster.datasupplier.nama_supplier,
        contact_person: state.datamaster.datasupplier.contact_person,
        fax: state.datamaster.datasupplier.fax,
        telepon: state.datamaster.datasupplier.telepon,
        alamat: state.datamaster.datasupplier.alamat,
        kota: state.datamaster.datasupplier.kota,
        kode_pos: state.datamaster.datasupplier.kode_pos,
        email: state.datamaster.datasupplier.email,
        nama_bank: state.datamaster.datasupplier.bank,
        no_acc: state.datamaster.datasupplier.bank_ac,
        nama_pemilik: state.datamaster.datasupplier.bank_atas_nama,
        NPWP: state.datamaster.datasupplier.npwp,
        nama_NPWP: state.datamaster.datasupplier.npwp_nama,
        alamat_NPWP: state.datamaster.datasupplier.npwp_alamat,
        cash: state.datamaster.datasupplier.cash,
        kredit: state.datamaster.datasupplier.kredit,
        type_pembayaran: state.datamaster.datasupplier.cash ? "cash" : "kredit",
        tanggal_pembayaran: state.datamaster.datasupplier.hari,
      },
      jenis_bayar: selector(state, "type_pembayaran"),
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
      jenis_bayar: selector(state, "type_pembayaran"),
    };
  }
})(FormModalSupplier);
