import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  getListHadiah,
  getListMember,
  pilihcustomer,
} from "../../../actions/member_action";
import paginationFactory from "react-bootstrap-table2-paginator";
import { showModal } from "../../../actions/datamaster_action";

const { SearchBar } = Search;
class HeadTukarPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          dataField: "nama_customer",
          text: "Nama Customer",
        },
        {
          dataField: "point",
          text: "Point",
        },
        {
          dataField: "alamat",
          text: "Alamat",
        },
        {
          dataField: "kota",
          text: "Kota",
        },
        {
          dataField: "no_ktp",
          text: "Nomor KTP",
        },
        {
          dataField: "tgl_lahir",
          text: "Tangga Lahir",
        },

        {
          dataField: "handphone",
          text: "Handphone",
        },
        {
          dataField: "nopol_kendaraan",
          text: "Nomor Polisi",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, hasil, rowIndex) => {
            this.setState({});
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    className="btn btn-warning mr-3"
                    onClick={() => this.pilih(hasil.kode_customer)}
                  >
                    Pilih
                    <i className="fa fa-gift ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }
  componentDidMount() {
    this.props.dispatch(getListHadiah());
    this.props.dispatch(getListMember());
  }
  pilih(data) {
    this.props.dispatch(pilihcustomer(data));
    this.props.dispatch(showModal());
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
          <ToolkitProvider
            keyField="no_ktp"
            data={this.props.listmember || []}
            columns={this.state.columns}
            search
            exportCSV={{
              fileName: "Export Master Kategori.csv",
            }}
          >
            {(props) => (
              <div className="row mt-3">
                <div className="col-6">
                  <div className="text-left">
                    <SearchBar {...props.searchProps} />
                  </div>
                </div>
                <hr />
                <div className="col-12 mt-3">
                  <BootstrapTable
                    pagination={paginationFactory()}
                    {...props.baseProps}
                  />
                  <br />
                </div>
              </div>
            )}
          </ToolkitProvider>
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

HeadTukarPoint = reduxForm({
  form: "HeadTukarPoint",
  enableReinitialize: true,
})(HeadTukarPoint);
export default connect((state) => {
  return {
    listhadiah: state.member.listhadiah,
    listmember: state.member.listmember,
    onSend: state.datamaster.onSend,
  };
})(HeadTukarPoint);
