import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  editBarang,
  getIDBarang,
  getInfoBarang,
} from "../../../actions/datamaster_action";
import Tabel from "../../../components/Tabel/tabel";

class ModalPenjualanSparepart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: false,
      kode_oem: "",
      columns: [
        {
          dataField: "kode_barang",
          text: "Kode Barang",
          sort: true,
        },
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        {
          dataField: "kode_oem",
          text: "Kode OE",
        },
        {
          dataField: "kode_sku",
          text: "Kode SKU",
        },
        {
          dataField: "type",
          text: "Type",
        },
        {
          dataField: "stock",
          text: "Stock",
        },
        {
          dataField: "harga_jual",
          text: "Harga",
          formatter: (list) => list.toLocaleString("id-ID"),
        },
        {
          dataField: "kode_supplier",
          text: "Kode Supplier",
          // formatter: (list) => list.toLocaleString("id-ID"),
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    className="btn btn-teal mr-3"
                    onClick={() => this.detail(row)}
                  >
                    Tambah
                    <i className="fa fa-cart-arrow-down ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }

  detail(data) {
    localStorage.setItem("supplier_barang_sparepart", data.kode_supplier);
    this.props.showDetail();
    this.props.dispatch(editBarang(data));
  }
  componentDidMount() {
    this.props.dispatch(getInfoBarang());
    this.props.dispatch(getIDBarang());
    // AxiosMasterGet("/daftar-service/getDataBarangDaftarService/")
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
        {/* <div className="col-lg-4 mt-4">
          <Field
            name="kode_oem"
            component={ReanderSelect}
            options={this.props.listbarang.map((list) => {
              let data = {
                value: list.kode_oem,
                name: list.kode_oem,
              };
              return data;
            })}
            onChange={(e) => {
              this.setState({
                kode_oem: e,
              });
              this.props.change("search_value", "");
              localStorage.setItem("kode_oem", e);
            }}
            type="text"
            label="Kode OEM"
            validate={required}
            placeholder="Masukan Kode OEM"
          />
        </div>
        <div className="col-lg-4 mt-4">
          <Field
            name="kode_supplier"
            component={ReanderSelect}
            options={this.props.listsupplier.map((list) => {
              let data = {
                value: list.kode_supplier,
                name: list.nama_supplier,
              };
              return data;
            })}
            onChange={(e) => {
              this.setState({
                supplier: e,
              });
              this.props.change("search_value", "");
              localStorage.setItem("supplier_barang_sparepart", e);
            }}
            type="text"
            label="Kode Supplier"
            validate={required}
            placeholder="Masukan Kode Supplier"
          />
        </div>

        <div className="col-lg-4 mt-4">
          <Field
            name="search_value"
            component={ReanderSelect}
            options={this.props.listbarang
              .filter((item) => {
                return item.kode_oem === this.state.kode_oem
              })
              .map((list) => {
              let data = {
                value: list.kode_barang,
                name: list.nama_barang,
              };
              return data;
            })}
            onChange={(e) => {
              this.state.supplier
                ? this.setState({
                    kode_barang: e,
                  })
                : ToastWarning("Silahkan Pilih Supplier Terlebih Dahulu");
            }}
            type="text"
            label="Pencarian"
            placeholder="Masukan Pencarian"
          />
        </div> */}
        <div className="col-lg-12 mt-4">
          <Tabel
            keyField="kode_barang"
            data={this.props.listinfobarang || []}
            columns={this.state.columns}
            CSVExport
            tambahData={false}
            // handleClick={() => this.tambahModal()}
          />
        </div>

        {/* <div className="col-lg-12">
          <TabelListBarang/>
        </div> */}
      </div>
    );
  }
}

ModalPenjualanSparepart = reduxForm({
  form: "ModalPenjualanSparepart",
  enableReinitialize: true,
})(ModalPenjualanSparepart);
export default connect((state) => {
  return {
    listbarang: state.datamaster.listbarang,
    listsupplier: state.datamaster.listsupplier,
    listinfobarang: state.datamaster.listInfoBarang,
  };
})(ModalPenjualanSparepart);
