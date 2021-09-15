import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datakategori !== undefined) {
    return {
      initialValues: {
        kode_kategori: state.datamaster.datakategori.kode_kategori,
        nama_kategori: state.datamaster.datakategori.nama_kategori,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalKategori extends Component {
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
          name="kode_kategori"
          component={ReanderField}
          type="text"
          label="Kode Kategori"
          placeholder="Masukan Kode Kategori"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_kategori"
          component={ReanderField}
          type="text"
          label="Nama Kategori"
          placeholder="Masukan Nama Kategori"
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

FormModalKategori = reduxForm({
  form: "DataKategoriTambah",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalKategori);
export default connect(maptostate, null)(FormModalKategori);
