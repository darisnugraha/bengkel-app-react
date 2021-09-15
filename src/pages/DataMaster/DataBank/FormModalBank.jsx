import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.databank !== undefined) {
    return {
      initialValues: {
        nomor_bank: state.datamaster.databank.no_acc,
        nama_bank: state.datamaster.databank.nama_bank,
        atas_nama: state.datamaster.databank.atas_nama,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalBank extends Component {
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
          name="nomor_bank"
          component={ReanderField}
          type="text"
          label="No A/C"
          placeholder="Masukan No A/C"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_bank"
          component={ReanderField}
          type="text"
          label="Nama Bank"
          placeholder="Masukan Nama Bank"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="atas_nama"
          component={ReanderField}
          type="text"
          label="Atas Nama"
          placeholder="Masukan Atas Nama"
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

FormModalBank = reduxForm({
  form: "dataBank",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalBank);
export default connect(maptostate, null)(FormModalBank);
