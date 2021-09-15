import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Field, reduxForm } from "redux-form";
import {
  ReanderField,
  RenderFieldGroup,
} from "../../../components/notification/notification";

class HeadReturnPenjualan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        {
          dataField: "qty",
          text: "Qty",
        },
        {
          dataField: "satuan",
          text: "Satuan",
        },
        {
          dataField: "harga",
          text: "Harga",
        },
        {
          dataField: "disc",
          text: "Discoun",
        },
        {
          dataField: "ppn",
          text: "PPN",
        },
        {
          dataField: "sub_total",
          text: "Sub Total",
        },
      ],
    };
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
              type="text"
              label="Tanggal"
              placeholder="Masukan Tanggal"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="no_faktur"
              component={ReanderField}
              type="text"
              label="No Faktur"
              placeholder="Masukan No Faktur"
            />
          </div>
          <div className="col-lg-3">
            <label className="mb-4">Jenis Penjualan</label>
            <div>
              <label>
                <Field
                  name="jenis_penjualan"
                  component="input"
                  type="radio"
                  value="member"
                  className="mr-3"
                />
                Member
              </label>
              <label className="ml-3">
                <Field
                  name="jenis_penjualan"
                  component="input"
                  type="radio"
                  value="reguler"
                  className="mr-3"
                />
                Reguler
              </label>
            </div>
          </div>
          <div className="col-lg-4">
            <Field
              name="pelanggan"
              component={RenderFieldGroup}
              type="text"
              label="Pelanggan"
              placeholder="Masukan Pelanggan"
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="alamat"
              component={ReanderField}
              type="text"
              label="Alamat"
              placeholder="Masukan Alamat"
            />
          </div>
          <div className="col-lg-4">
            <Field
              name="telepon"
              component={ReanderField}
              type="text"
              label="Telepon"
              placeholder="Masukan Telepon"
            />
          </div>

          <div className="col-lg-12">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <Field
                  name="kode_barcode"
                  component={ReanderField}
                  type="text"
                  label="Kode Barcode"
                  placeholder="Masukan Kode Barcode"
                />
              </div>
              <div className="col-lg-2">
                <label htmlFor="">.</label>
                <button
                  className="btn btn-block btn-primary"
                  type="button"
                  onClick={this.props.setCariBarang}
                >
                  Cari Barang <i className="fa fa-search ml-3"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-3">
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={[]}
              columns={this.state.columns}
              noDataIndication="Belum Ada Data"
            />
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary" onClick={this.props.setBayar}>
                Bayar <i className="fa fa-money-bill-alt ml-3"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

HeadReturnPenjualan = reduxForm({
  form: "HeadReturnPenjualan",
  enableReinitialize: true,
})(HeadReturnPenjualan);
export default HeadReturnPenjualan;
