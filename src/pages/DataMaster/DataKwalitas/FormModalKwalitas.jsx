import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datakwalitas !== undefined) {
    return {
      initialValues: {
        kode_kwalitas: state.datamaster.datakwalitas.kode_kwalitas,
        nama_kwalitas: state.datamaster.datakwalitas.nama_kwalitas,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalKwalitas extends Component {
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
          name="kode_kwalitas"
          component={ReanderField}
          type="text"
          label="Kode Kualitas"
          placeholder="Masukan kode Kualitas"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_kwalitas"
          component={ReanderField}
          type="text"
          label="Nama Kualitas"
          placeholder="Masukan Nama Kualitas"
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

FormModalKwalitas = reduxForm({
  form: "dataKwalitas",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalKwalitas);
export default connect(maptostate, null)(FormModalKwalitas);
