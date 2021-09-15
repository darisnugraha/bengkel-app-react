import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getCustomer } from "../../../actions/datamaster_action";
import { getToday } from "../../../components/notification/function";
import { ReanderField } from "../../../components/notification/notification";

const validate = (value) => {
  const error = {};
  if (value.tanggal_akhir < value.tanggal_awal) {
    error.tanggal_akhir = "Tanggal Akhir Kurang Dari Tanggal Awal";
  }

  return error;
};

class ModalPencarianService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.change("tanggal_awal", getToday());
    this.props.change("tanggal_akhir", getToday());
    this.props.dispatch(getCustomer());
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div>
          <div className="col-lg-12">
            <Field
              name="tanggal_awal"
              component={ReanderField}
              type="date"
              label="Tanggal Mulai"
              placeholder="Masukan Tanggal Mulai"
            />
          </div>
          <div className="col-lg-12">
            <Field
              name="tanggal_akhir"
              component={ReanderField}
              type="date"
              label="Tanggal Akhir"
              placeholder="Masukan Tanggal Akhir"
            />
          </div>
          <div className="col-lg-6">
            <button className="btn btn-block btn-primary">
              {this.props.onSend ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                </>
              ) : (
                <i className="fa fa-search mr-3"></i>
              )}
              CARI
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ModalPencarianService = reduxForm({
  form: "ModalPencarianService",
  enableReinitialize: true,
  validate: validate,
})(ModalPencarianService);
export default connect((state) => {
  return {
    listcustomer: state.datamaster.listcustomer,
    onSend: state.datamaster.onSend,
  };
})(ModalPencarianService);
