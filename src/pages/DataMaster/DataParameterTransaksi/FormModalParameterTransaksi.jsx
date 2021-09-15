import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.dataparameter !== undefined) {
    return {
      initialValues: {
        id_kategori: state.datamaster.dataparameter.id_kategori,
        kategori: state.datamaster.dataparameter.kategori,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalParameterTransaksi extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if(this.props.isEdit === false){
      this.props.change("id_kategori", this.props.noFaktur);
    }
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      ><div className="d-none">
        <Field
          name="id_kategori"
          component={ReanderField}
          type="text"
          label="Kode Parameter"
          placeholder="Masukan Kode Parameter"
          readOnly
          validate={required}
        />
        </div>
        <Field
          name="kategori"
          component={ReanderField}
          type="text"
          label="Nama Parameter"
          placeholder="Masukan Nama Parameter"
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

FormModalParameterTransaksi = reduxForm({
  form: "dataParameterTransaksi",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalParameterTransaksi);
export default connect(maptostate, null)(FormModalParameterTransaksi);
