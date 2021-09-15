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
  if (state.datamaster.datarak !== undefined) {
    return {
      initialValues: {
        kode_gudang: state.datamaster.datarak.kode_gudang,
        kode_rak: state.datamaster.datarak.kode_rak,
        nama_rak: state.datamaster.datarak.nama_rak,
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
    this.state = {
      listgroup: [],
    };
  }
  componentDidMount() {
    AxiosMasterGet("lokasi-gudang/get/all").then((res) =>
      this.setState({
        listgroup: res.data,
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
          name="kode_rak"
          component={ReanderField}
          type="text"
          label="Kode Rak"
          placeholder="Masukan kode Rak"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="kode_gudang"
          component={ReanderSelect}
          options={this.state.listgroup.map((list) => {
            let data = {
              value: list.kode_lokasi_gudang,
              name: list.nama_lokasi_gudang,
            };
            return data;
          })}
          type="text"
          label="Kode Gudang"
          placeholder="Masukan kode Gudang"
          readOnly={this.props.isEdit}
          validate={required}
        />

        <Field
          name="nama_rak"
          component={ReanderField}
          type="text"
          label="Nama Rak"
          placeholder="Masukan Nama Rak"
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
  form: "dataRak",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalGudang);
export default connect(maptostate, null)(FormModalGudang);
