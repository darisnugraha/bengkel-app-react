import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getListHadiah } from "../../../actions/member_action";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";

class ModalTukar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getListHadiah());
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
          <div className="col-lg-3 d-none">
            <Field
              name="kode_customer"
              component={ReanderField}
              type="text"
              label="Kode Customer"
              placeholder="Masukan Kode Customer"
            />
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <Field
              name="kode_hadiah"
              component={ReanderSelect}
              options={this.props.listhadiah.map((list) => {
                let data = {
                  value: list.kode_hadiah,
                  name: list.nama_hadiah,
                };
                return data;
              })}
              type="text"
              label="Hadiah"
              placeholder="Masukan Hadiah"
            />
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary">
                Simpan <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

ModalTukar = reduxForm({
  form: "ModalTukar",
  enableReinitialize: true,
})(ModalTukar);
export default connect((state) => {
  return {
    listhadiah: state.member.listhadiah,
    initialValues: {
      kode_customer: state.member.customerpilihan,
    },
  };
})(ModalTukar);
