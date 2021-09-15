import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Field, reduxForm } from "redux-form";
import { RenderFieldGroup } from "../../../components/notification/notification";

class ModalReturnPenjualan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          dataField: "kode_barang",
          text: "Kode Barang",
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        // {
        //   dataField: "merk",
        //   text: "Merk",
        // },
        {
          dataField: "satuan",
          text: "Satuan",
        },
        {
          dataField: "harga",
          text: "Harga",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            this.setState({});
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button className="btn btn-teal mr-3">
                    Pilih
                    <i className="fa fa-cart-arrow-down ml-2"></i>
                  </button>
                  <button
                    className="btn btn-warning mr-3"
                    onClick={this.props.showDetail}
                  >
                    Detail
                    <i className="fa fa-eye ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="text-left">
            <button className="btn btn-black" onClick={this.props.setBack}>
              <i className="fa fa-chevron-left mr-3"></i> Back
            </button>
          </div>
        </div>
        <div className="col-lg-2"> </div>
        <div className="col-lg-4">
          <label className="mb-3">Jenis Pecarian</label>
          <div>
            <label>
              <Field
                name="jenis_pencarian"
                component="input"
                type="radio"
                value="kode_barang"
                className="mr-3"
              />
              Kode Barang
            </label>
            <label className="ml-3">
              <Field
                name="jenis_pencarian"
                component="input"
                type="radio"
                value="nama_barang"
                className="mr-3"
              />
              Nama Barang
            </label>
          </div>
        </div>

        <div className="col-lg-4">
          <Field
            name="search_value"
            component={RenderFieldGroup}
            type="text"
            label="Pencarian"
            placeholder="Masukan Pencarian"
          />
        </div>
        <div className="col-lg-12">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={[
              {
                kode_barang: "BR001",
                nama_barang: "OIL YAMALUBE",
                merk: "YAMAHA",
                satuan: "PCS",
                harga: 125000,
              },
            ]}
            columns={this.state.columns}
            noDataIndication="Belum ada Data"
          />
        </div>
      </div>
    );
  }
}

ModalReturnPenjualan = reduxForm({
  form: "ModalReturnPenjualan",
  enableReinitialize: true,
})(ModalReturnPenjualan);
export default ModalReturnPenjualan;
