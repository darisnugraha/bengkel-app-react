import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datawarna !== undefined) {
    return {
      initialValues: {
        kode_warna: state.datamaster.datawarna.kode_warna,
        nama_warna: state.datamaster.datawarna.nama_warna,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalWarna extends Component {
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
          name="kode_warna"
          component={ReanderField}
          type="text"
          label="Kode Warna"
          placeholder="Masukan Kode Warna"
          validate={required}
          readOnly={this.props.isEdit}
        />
        <Field
          name="nama_warna"
          component={ReanderField}
          type="text"
          label="Nama Warna"
          placeholder="Masukan Nama Warna"
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

FormModalWarna = reduxForm({
  form: "dataWarna",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalWarna);
export default connect(maptostate, null)(FormModalWarna);
