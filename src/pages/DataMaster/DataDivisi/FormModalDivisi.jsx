import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datadivisi !== undefined) {
    return {
      initialValues: {
        kode_divisi: state.datamaster.datadivisi.kode_divisi,
        nama_divisi: state.datamaster.datadivisi.nama_divisi,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalDivisi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <Field
          name="kode_divisi"
          component={ReanderField}
          type="text"
          label="Kode Divisi"
          placeholder="Masukan kode Divisi"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_divisi"
          component={ReanderField}
          type="text"
          label="Nama Divisi"
          placeholder="Masukan Nama Divisi"
          validate={required}
        />
        <button className="btn btn-primary" disabled={this.props.onSend}>
          {this.props.onSend ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang Menyimpan
            </>
          ) : (
            <>
              Simpan <i className="fa fa-paper-plane ml-3 "></i>
            </>
          )}
        </button>
      </form>
    );
  }
}

FormModalDivisi = reduxForm({
  form: "dataDivisi",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalDivisi);
export default connect(maptostate, null)(FormModalDivisi);
