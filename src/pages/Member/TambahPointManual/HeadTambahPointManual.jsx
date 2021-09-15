import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getListMember } from "../../../actions/member_action";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";

class HeadTambahPointManual extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(getListMember());
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
              name="kode_customer"
              component={ReanderSelect}
              options={this.props.listmember.map((list) => {
                let data = {
                  value: list.kode_customer,
                  name: list.nama_customer,
                };
                return data;
              })}
              type="text"
              label="Kode Member"
              validate={required}
              placeholder="Masukan Kode Member"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="jenis"
              component={ReanderSelect}
              options={[
                { value: "TAMBAH POINT MANUAL", name: " TAMBAH POINT MANUAL" },
                { value: "AMBIL POINT MANUAL", name: " AMBIL POINT MANUAL" },
              ]}
              type="text"
              label="Type"
              placeholder="Masukan Type"
              validat={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="poin"
              component={ReanderField}
              type="text"
              label="Point"
              placeholder="Masukan Point"
              validate={required}
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

HeadTambahPointManual = reduxForm({
  form: "HeadTambahPointManual",
  enableReinitialize: true,
})(HeadTambahPointManual);
export default connect((state) => {
  return {
    listmember: state.member.listmember,
    onSend: state.datamaster.onSend,
  };
})(HeadTambahPointManual);
