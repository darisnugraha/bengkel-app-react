import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { AxiosMasterGet } from "../../../axios";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.dataselfing !== undefined) {
    return {
      initialValues: {
        kode_rak: state.datamaster.dataselfing.kode_rak,
        kode_selving: state.datamaster.dataselfing.kode_selving,
        nama_selving: state.datamaster.dataselfing.nama_selving,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalSelfing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listrak: [],
    };
  }
  componentDidMount() {
    AxiosMasterGet("lokasi-rak/get/all").then((res) =>
      this.setState({
        listrak: res.data,
      })
    );
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
          name="kode_selving"
          component={ReanderField}
          type="text"
          label="Kode Shelving"
          placeholder="Masukan kode Shelving"
          readOnly={this.props.isEdit}
        />
        <Field
          name="kode_rak"
          component={ReanderSelect}
          options={this.state.listrak.map((list) => {
            let data = {
              value: list.kode_lokasi_rak,
              name: list.nama_lokasi_rak,
            };
            return data;
          })}
          type="text"
          label="Kode Rak"
          placeholder="Masukan kode Rak"
          readOnly={this.props.isEdit}
          validate={required}
        />

        <Field
          name="nama_selving"
          component={ReanderField}
          type="text"
          label="Nama Shelving"
          placeholder="Masukan Nama Shelving"
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

FormModalSelfing = reduxForm({
  form: "dataSelving",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalSelfing);
export default connect(maptostate, null)(FormModalSelfing);
