import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  locale: "id-ID",
});
const maptostate = (state) => {
  if (state.datamaster.datahargaservice !== undefined) {
    return {
      initialValues: {
        jenis_kategori: state.datamaster.datahargaservice.jenis_kategori,
        jenis_service: state.datamaster.datahargaservice.jenis_service,
        jasa_service: state.datamaster.datahargaservice.jasa_service,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
};

class FormModalParameterHargaService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listParameter: [],
    };
  }
  componentDidMount() {}

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        {this.props.listParameter ? (
          <Field
            name="jenis_kategori"
            component={ReanderSelect}
            options={this.props.listParameter.map((list) => {
              let data = {
                value: list.id_kategori_service,
                name:
                  list.jenis_service +
                  ` ( Harga Sekarang: ${
                    "Rp. " + list.harga_jasa_service.toLocaleString("id-ID")
                  } )`,
              };
              return data;
            })}
            type="text"
            label="Jenis Kategori"
            placeholder="Masukan Jenis Kategori"
            validate={required}
          />
        ) : (
          <Skeleton width={"100%"} height={50} />
        )}
        <Field
          name="jasa_service"
          component={ReanderField}
          type="telp"
          label="Jasa Service (RP)"
          placeholder="Masukan Jasa Service"
          {...currencyMask}
        />

        <button className="btn btn-primary mb-3" disabled={this.props.onSend}>
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

FormModalParameterHargaService = reduxForm({
  form: "dataHargaService",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(FormModalParameterHargaService);
export default connect(maptostate, null)(FormModalParameterHargaService);
