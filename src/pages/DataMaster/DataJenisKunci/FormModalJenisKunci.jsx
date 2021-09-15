import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datajeniskunci !== undefined) {
    return {
      initialValues: {
        kode_jenis_kunci: state.datamaster.datajeniskunci.kode_jenis_kunci,
        nama_jenis_kunci: state.datamaster.datajeniskunci.nama_jenis_kunci,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalJenisKunci extends Component {
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
          name="kode_jenis_kunci"
          component={ReanderField}
          type="text"
          label="Kode Jenis Kunci"
          placeholder="Masukan kode Jenis Kunci"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_jenis_kunci"
          component={ReanderField}
          type="text"
          label="Nama Jenis Kunci"
          placeholder="Masukan Nama Jenis Kunci"
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

FormModalJenisKunci = reduxForm({
  form: "dataJenisKunci",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalJenisKunci);
export default connect(maptostate, null)(FormModalJenisKunci);
