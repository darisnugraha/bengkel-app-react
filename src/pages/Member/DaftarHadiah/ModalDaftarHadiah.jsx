import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../../components/notification/notification";

class ModalDaftarHadiah extends Component {
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
        <div className="row">
          <div className="col-lg-3">
            <Field
              name="kode_hadiah"
              component={ReanderField}
              type="text"
              label="Kode Hadiah"
              placeholder="Masukan Kode hadiah"
              readOnly={this.props.isEdit}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="nama_hadiah"
              component={ReanderField}
              type="text"
              label="Nama Hadiah"
              placeholder="Masukan Nama Hadiah"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="stock"
              component={ReanderField}
              type="text"
              label="Stock Hadiah"
              placeholder="Masukan Stock Hadiah"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="poin"
              component={ReanderField}
              type="text"
              label="Point"
              placeholder="Masukan Point"
            />
          </div>
          <div className="col-lg-12">
            <div className="text-right">
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
          </div>
        </div>
      </form>
    );
  }
}

ModalDaftarHadiah = reduxForm({
  form: "ModalDaftarHadiah",
  enableReinitialize: true,
})(ModalDaftarHadiah);
export default connect((state) => {
  if (state.member.hadiahEdit !== []) {
    return {
      initialValues: {
        kode_hadiah: state.member.hadiahEdit.kode_hadiah,
        nama_hadiah: state.member.hadiahEdit.nama_hadiah,
        stock: state.member.hadiahEdit.stock,
        poin: state.member.hadiahEdit.poin,
      },
      onSend: state.datamaster.onSend,
    };
  } else {
    return {
      onSend: state.datamaster.onSend,
    };
  }
})(ModalDaftarHadiah);
