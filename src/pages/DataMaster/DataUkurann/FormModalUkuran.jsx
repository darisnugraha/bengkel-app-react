import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.dataukuran !== undefined) {
    return {
      initialValues: {
        kode_ukuran: state.datamaster.dataukuran.kode_ukuran,
        nama_ukuran: state.datamaster.dataukuran.nama_ukuran,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalUkuran extends Component {
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
          name="kode_ukuran"
          component={ReanderField}
          type="text"
          label="Kode Ukuran"
          placeholder="Masukan Kode Ukuran"
          validate={required}
          readOnly={this.props.isEdit}
        />
        <Field
          name="nama_ukuran"
          component={ReanderField}
          type="text"
          label="Nama Ukuran"
          placeholder="Masukan Nama Ukuran"
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

FormModalUkuran = reduxForm({
  form: "dataUkuran",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalUkuran);
export default connect(maptostate, null)(FormModalUkuran);
