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
  if (state.datamaster.datajenis !== undefined) {
    return {
      initialValues: {
        kode_kategori: state.datamaster.datajenis.kode_kategori,
        nama_jenis: state.datamaster.datajenis.nama_jenis,
        kode_jenis: state.datamaster.datajenis.kode_jenis,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalJenis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listkategori: [],
    };
  }

  componentDidMount() {
    AxiosMasterGet("kategori/get/all")
      .then((res) =>
        this.setState({
          listkategori: res.data,
        })
      )
      .catch((err) => console.log(err));
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
          name="kode_jenis"
          component={ReanderField}
          type="text"
          label="Kode Jenis"
          placeholder="Masukan Kode Jenis"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="kode_kategori"
          component={ReanderSelect}
          options={this.state.listkategori.map((obj) => {
            var payload = {
              value: obj.kode_kategori,
              name: obj.nama_kategori,
            };
            return payload;
          })}
          type="text"
          label="Kode Kategori"
          placeholder="Masukan Kode Kategori"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_jenis"
          component={ReanderField}
          type="text"
          label="Nama Jenis"
          placeholder="Masukan Nama Jenis"
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

FormModalJenis = reduxForm({
  form: "DataJenis",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalJenis);
export default connect(maptostate, null)(FormModalJenis);
