import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datakendaraan !== undefined) {
    return {
      initialValues: {
        merk_kendaraan: state.datamaster.datakendaraan.merk_kendaraan,
        nama_kendaraan: state.datamaster.datakendaraan.nama_kendaraan,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalKendaraan extends Component {
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
          name="merk_kendaraan"
          component={ReanderField}
          type="text"
          label="Merk Kendaraan"
          placeholder="Masukan Merk Kendaraan"
          readOnly={this.props.isEdit}
        />
        <Field
          name="nama_kendaraan"
          component={ReanderField}
          type="text"
          label="Nama Kendaraan"
          placeholder="Masukan Nama Kendaraan"
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

FormModalKendaraan = reduxForm({
  form: "dataKendaraan",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalKendaraan);
export default connect(maptostate, null)(FormModalKendaraan);
