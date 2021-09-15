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
  if (state.datamaster.datakategoriservice !== undefined) {
    return {
      initialValues: {
        jenis_kategori: state.datamaster.datakategoriservice.kode_kategori,
        nominal_discount: state.datamaster.datakategoriservice.diskon,
        jenis_discount: state.datamaster.datakategoriservice.status_diskon,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalParameterDiscount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRp: true,
      listKategori: [],
    };
  }

  componentDidMount() {
    AxiosMasterGet("kategori/get/all").then((res) =>
      this.setState({
        listKategori: res.data,
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
          name="jenis_kategori"
          component={ReanderSelect}
          options={this.state.listKategori.map((list) => {
            let data = {
              value: list.kode_kategori,
              name: list.nama_kategori,
            };
            return data;
          })}
          type="text"
          label="Jenis Kategori"
          placeholder="Masukan Jenis Kategori"
          validate={required}
        />
        <label htmlFor="">Jenis Discount</label>
        <div className="form-check">
          <label>
            <Field
              className="form-check-input"
              name="jenis_discount"
              component="input"
              type="radio"
              value="RP"
              onClick={() =>
                this.setState({
                  isRp: true,
                })
              }
            />
            Rp
          </label>
          <label className="ml-5">
            <Field
              className="form-check-input"
              name="jenis_discount"
              component="input"
              type="radio"
              value="PERSEN"
              onClick={() =>
                this.setState({
                  isRp: false,
                })
              }
            />
            %
          </label>
        </div>

        <Field
          name="nominal_discount"
          component={ReanderField}
          type="number"
          label={this.state.isRp ? "Nominal Discount RP" : "Nominal Discount %"}
          placeholder="Masukan Nominal Discount"
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

FormModalParameterDiscount = reduxForm({
  form: "dataParameterDiscount",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalParameterDiscount);
export default connect(maptostate, null)(FormModalParameterDiscount);
