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
  if (state.datamaster.datasales !== undefined) {
    return {
      initialValues: {
        kode_divisi: state.datamaster.datasales.kode_divisi,
        kode_pegawai: state.datamaster.datasales.kode_pegawai,
        nama_pegawai: state.datamaster.datasales.nama_pegawai,
        alamat: state.datamaster.datasales.alamat,
        kota: state.datamaster.datasales.kota,
        handphone: state.datamaster.datasales.handphone,
        tanggal_masuk: state.datamaster.datasales.tgl_masuk,
        tanggal_keluar: state.datamaster.datasales.tgl_keluar,
        status_aktif: state.datamaster.datasales.status_aktif,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    };
  }

  componentDidMount() {
    AxiosMasterGet("divisi/get/all").then((res) =>
      this.setState({
        listData: res.data,
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
        <div className="row">
          <div className="col-lg-6">
            <Field
              name="kode_divisi"
              component={ReanderSelect}
              options={this.state.listData.map((list) => {
                let data = {
                  value: list.kode_divisi,
                  name: list.nama_divisi,
                };
                return data;
              })}
              type="text"
              label="Kode Divisi"
              placeholder="Masukan kode Divisi"
              readOnly={this.props.isEdit}
              validate={required}
            />
          </div>
          <div className="col-lg-6">
            <Field
              name="kode_pegawai"
              component={ReanderField}
              type="text"
              label="Kode Pegawai"
              placeholder="Masukan Kode Pegawai"
              validate={required}
            />
          </div>
          <div className="col-lg-6">
            <Field
              name="nama_pegawai"
              component={ReanderField}
              type="text"
              label="Nama Pegawai"
              placeholder="Masukan Nama Pegawai"
              validate={required}
            />
          </div>
          <div className="col-lg-6">
            <Field
              name="alamat"
              component={ReanderField}
              type="text"
              label="Alamat"
              placeholder="Masukan Alamat"
            />
          </div>
          <div className="col-lg-6">
            <Field
              name="kota"
              component={ReanderField}
              type="text"
              label="Kota"
              placeholder="Masukan Kota"
            />
          </div>
          <div className="col-lg-6">
            <Field
              name="handphone"
              component={ReanderField}
              type="text"
              label="Handphone"
              placeholder="Masukan Handphone"
            />
          </div>
          <div className="col-lg-6">
            <Field
              name="tanggal_masuk"
              component={ReanderField}
              type="date"
              label="Tanggal Masuk"
              placeholder="Masukan Tanggal Masuk"
            />
          </div>
          <div className="col-lg-6">
            <Field
              name="tanggal_keluar"
              component={ReanderField}
              type="date"
              label="Tanggal Keluar"
              placeholder="Masukan Tanggal Keluar"
            />
          </div>
          {/* <div className="col-lg-6">
            <Field
              name="status_aktif"
              component={ReanderSelect}
              options={[
                {
                  value: "true",
                  name: "AKTIF",
                },
                {
                  value: "false",
                  name: "NON-AKTIF",
                },
              ]}
              type="text"
              label="Status Aktif"
              placeholder="Masukan Status Aktif"
            />
          </div> */}
        </div>
        <div className="col-lg-12">
          <button className="btn btn-primary" disabled={this.props.onSend}>
            {this.props.onSend ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                Menyimpan
              </>
            ) : (
              <>
                Simpan <i className="fa fa-paper-plane ml-3 "></i>
              </>
            )}
          </button>
        </div>
      </form>
    );
  }
}

FormModalSales = reduxForm({
  form: "dataSales",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalSales);
export default connect(maptostate, null)(FormModalSales);
