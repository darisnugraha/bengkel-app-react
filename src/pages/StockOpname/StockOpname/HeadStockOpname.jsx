import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getGudang, showModal } from "../../../actions/datamaster_action";
import { getListStockOpname } from "../../../actions/supervisor_action";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";
import { required } from "../../../validasi/normalize";

class HeadStockOpname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
        },
        {
          dataField: "kode_supplier",
          text: "Kode Supplier",
        },
        {
          dataField: "qty",
          text: "Qty",
        },
      ],
    };
  }
  componentDidMount() {
    this.props.dispatch(getGudang());
    this.props.dispatch(getListStockOpname());
    this.props.change(
      "lokasi",
      localStorage.getItem("lokasi_stock_opname") || ""
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
          <div className="col-lg-3">
            <Field
              name="tanggal"
              component={ReanderField}
              type="date"
              label="Tanggal"
              placeholder="Masukan Tanggal"
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="lokasi"
              component={ReanderSelect}
              options={this.props.listgudang.map((list) => {
                let data = {
                  value: list.kode_lokasi_gudang,
                  name: list.nama_lokasi_gudang,
                };
                return data;
              })}
              type="text"
              label="Lokasi"
              placeholder="Masukan Lokasi"
              onChange={(e) => localStorage.setItem("lokasi_stock_opname", e)}
              validate={required}
            />
          </div>
          <div className="col-lg-12 mb-3">
            <div className="text-right">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => this.props.dispatch(showModal())}
                disabled={
                  localStorage.getItem("lokasi_stock_opname") ? false : true
                }
              >
                Tambah Data <i className="fa fa-plus ml-3"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <Tabel
              keyField="kode_barcode"
              data={this.props.liststockopname || []}
              columns={this.state.columns}
              textEmpty="Silahkan pilih Lokasi, Setelah itu tambah barang"
            />
          </div>
          <div className="col-lg-12 mb-3">
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

HeadStockOpname = reduxForm({
  form: "HeadStockOpname",
  enableReinitialize: true,
})(HeadStockOpname);
export default connect((state) => {
  return {
    listgudang: state.datamaster.listgudang,
    liststockopname: state.supervisor.liststockopname,
    onSend: state.datamaster.onSend,
  };
})(HeadStockOpname);
