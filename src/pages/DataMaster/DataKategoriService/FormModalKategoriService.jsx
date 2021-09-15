import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datakategoriservice !== undefined) {
    return {
      initialValues: {
        id_kategori_service:
          state.datamaster.datakategoriservice.id_kategori_service,
        jenis_kategori: state.datamaster.datakategoriservice.kategori_service,
        jenis_service: state.datamaster.datakategoriservice.jenis_service,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalKategoriService extends Component {
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
          name="id_kategori_service"
          component={ReanderField}
          type="text"
          label="ID Kategori Service"
          placeholder="Masukan ID Kategori Service"
          validate={required}
        />
        <Field
          name="jenis_kategori"
          component={ReanderSelect}
          options={[
            {
              value: "service_ringan",
              name: "Service Ringan",
            },
            {
              value: "turun_setengah",
              name: "Turun Setengah",
            },
            {
              value: "turun_full",
              name: "Turun Full",
            },
            {
              value: "kaki",
              name: "Service Kaki",
            },
            {
              value: "body",
              name: "Service Body",
            },
            {
              value: "ganti_oli",
              name: "Ganti Oli",
            },
            {
              value: "LAIN-LAIN",
              name: "Lain-lain",
            },
          ]}
          type="text"
          label="Jenis Kategori"
          placeholder="Masukan Jenis Kategori"
          validate={required}
        />
        <Field
          name="jenis_service"
          component={ReanderField}
          type="text"
          label="Jenis Service"
          placeholder="Masukan Jenis Service"
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

FormModalKategoriService = reduxForm({
  form: "dataKategoriService",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalKategoriService);
export default connect(maptostate, null)(FormModalKategoriService);
