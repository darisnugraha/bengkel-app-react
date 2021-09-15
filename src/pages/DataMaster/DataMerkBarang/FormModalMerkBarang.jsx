import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datamerkbarang !== undefined) {
    return {
      initialValues: {
        merk_barang: state.datamaster.datamerkbarang.kode_merk_barang,
        nama_barang: state.datamaster.datamerkbarang.nama_merk_barang,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalMerkBarang extends Component {
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
          name="merk_barang"
          component={ReanderField}
          type="text"
          label="Merk Barang"
          placeholder="Masukan Merk Barang"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_barang"
          component={ReanderField}
          type="text"
          label="Nama Barang"
          placeholder="Masukan Nama Barang"
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

FormModalMerkBarang = reduxForm({
  form: "dataBarang",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalMerkBarang);
export default connect(maptostate, null)(FormModalMerkBarang);
