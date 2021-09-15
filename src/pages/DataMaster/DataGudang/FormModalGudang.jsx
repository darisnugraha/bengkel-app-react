import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datagudang !== undefined) {
    return {
      initialValues: {
        kode_gudang: state.datamaster.datagudang.kode_gudang,
        nama_gudang: state.datamaster.datagudang.nama_gudang,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalGudang extends Component {
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
          name="kode_gudang"
          component={ReanderField}
          type="text"
          label="Kode Gudang"
          placeholder="Masukan kode Gudang"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_gudang"
          component={ReanderField}
          type="text"
          label="Nama Gudang"
          placeholder="Masukan Nama Gudang"
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

FormModalGudang = reduxForm({
  form: "dataGudang",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalGudang);
export default connect(maptostate, null)(FormModalGudang);
