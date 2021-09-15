import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { AxiosMasterGet } from "../../../axios";
import {
  NotifError,
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const maptostate = (state) => {
  if (state.datamaster.datakunci !== undefined) {
    return {
      initialValues: {
        kode_jenis_kunci: state.datamaster.datakunci.kode_jenis_kunci,
        kode_kunci: state.datamaster.datakunci.kode_kunci,
        ukuran_kunci: state.datamaster.datakunci.ukuran,
        merk_kunci: state.datamaster.datakunci.merk_kunci,
        nama_kunci: state.datamaster.datakunci.nama_kunci,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalJenisKunci extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listKunci: [],
    };
  }
  componentDidMount() {
    AxiosMasterGet("jenis-kunci/get/all")
      .then((res) =>
        this.setState({
          listKunci: res.data,
        })
      )
      .catch(() =>
        NotifError(
          "Sepertinya ada masalah, silahkan menunggu beberapa saat lagi"
        )
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
          name="kode_jenis_kunci"
          component={ReanderSelect}
          options={this.state.listKunci.map((list) => {
            let data = {
              value: list.kode_jenis_kunci,
              name: `${list.kode_jenis_kunci} - ( ${list.nama_jenis_kunci} )`,
            };
            return data;
          })}
          label="Kode Jenis Kunci"
          placeholder="Masukan kode Jenis Kunci"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="kode_kunci"
          component={ReanderField}
          type="text"
          label="Kode Kunci"
          placeholder="Masukan kode Kunci"
          readOnly={this.props.isEdit}
          validate={required}
        />
        <Field
          name="nama_kunci"
          component={ReanderField}
          type="text"
          label="Nama Kunci"
          placeholder="Masukan Nama Kunci"
          validate={required}
        />
        <Field
          name="ukuran_kunci"
          component={ReanderField}
          type="text"
          label="Ukuran Kunci"
          placeholder="Masukan Ukuran Kunci"
        />
        <Field
          name="merk_kunci"
          component={ReanderField}
          type="text"
          label="Merk Kunci"
          placeholder="Masukan Merk Kunci"
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

FormModalJenisKunci = reduxForm({
  form: "dataKunci",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalJenisKunci);
export default connect(maptostate, null)(FormModalJenisKunci);
