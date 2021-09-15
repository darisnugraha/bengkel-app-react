import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  editBarang,
  getBarang,
  getIDBarang,
  getInfoBarang,
  getSupplier,
} from "../../../actions/datamaster_action";
import {
  ReanderSelect,
  ToastWarning,
} from "../../../components/notification/notification";
import { Panel, PanelBody, PanelHeader } from "../../../components/panel/panel";
import Tabel from "../../../components/Tabel/tabel";
import { required } from "../../../validasi/normalize";
import TabelListBarang from "./TabelListBarang";

class ModalPenjualanSparepart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: false,
      kode_oem: '',
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
         text:  "Kode OE"
        },
        {
          dataField: "kode_sku",
          text: "Kode SKU"
        },
        {
          dataField: "type",
          text: "Type",
        },
        {
          dataField: "stock",
          text: "Stock"
        },
        {
          dataField: "harga_jual",
          text: "Harga",
          formatter: (list) => list.toLocaleString("id-ID"),
        },
        {
          dataField: "supplier",
          text: "Kode Supplier",
          // formatter: (list) => list.toLocaleString("id-ID"),
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let data = {
              kode_supplier: row.supplier,
              kode_barcode: row.kode_barcode,
              kode_barang: row.kode_barang,
              nama_barang: row.nama_barang,
              kode_kategori: row.kode_kategori,
              kode_jenis: row.kode_jenis,
              // kode_merk_barang: row.kode_merk_barang,
              // kode_kwalitas: row.kode_kwalitas,
              kode_lokasi_rak: row.kode_lokasi_rak,
              kode_lokasi_selving: row.kode_lokasi_selving,
              // kode_ukuran: row.kode_ukuran,
              kode_satuan: row.kode_satuan,
              type: row.type,
              harga_jual: row.harga_jual,
            };
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    className="btn btn-teal mr-3"
                    onClick={() => this.detail(data)}
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
    localStorage.setItem("supplier_barang_sparepart", data.kode_supplier)
    console.log("cobs",data);
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
    listinfobarang: state.datamaster.listInfoBarang
  };
})(ModalPenjualanSparepart);
