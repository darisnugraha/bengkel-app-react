import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datasatuan !== undefined) {
    return {
      initialValues: {
        kode_satuan: state.datamaster.datasatuan.kode_satuan,
        nama_satuan: state.datamaster.datasatuan.nama_satuan,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalSatuan extends Component {
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
          name="kode_satuan"
          component={ReanderField}
          type="text"
          label="Kode Satuan"
          placeholder="Masukan kode Satuan"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_satuan"
          component={ReanderField}
          type="text"
          label="Nama Satuan"
          placeholder="Masukan Nama Satuan"
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

FormModalSatuan = reduxForm({
  form: "dataSatuan",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalSatuan);
export default connect(maptostate, null)(FormModalSatuan);
