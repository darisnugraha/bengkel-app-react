import React, { Component } from "react";
import {
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { connect } from "react-redux";
import {
  editBarang,
  getIDBarang,
  getInfoBarang,
  getListBarangCari,
  getSupplier,
} from "../../../actions/datamaster_action.jsx";
import Tabel from "../../../components/Tabel/tabel.jsx";
import { AxiosMasterGet } from "../../../axios.js";

const maptostate = (state) => {
  return {
    listbarang: state.datamaster.listbarang,
    idbarang: state.datamaster.idbarang,
    listsupplier: state.datamaster.listsupplier,
    listinfobarang: state.datamaster.listInfoBarang
  };
};
class TabelListBarang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
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
         text:  "Kode OEM"
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
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getInfoBarang());
    this.props.dispatch(getIDBarang());
    // AxiosMasterGet("/daftar-service/getDataBarangDaftarService/")
  }
  detail() {
    // this.props.showDetail();
    let final = JSON.parse(localStorage.getItem("FakturTerpilih_detail")) || []
    console.log(final);
    final.map((list)=>{
      let data = {
        value: list.kode_barcode,
        name: list.kode_barcode
      }
      localStorage.setItem("kode_barcode",JSON.stringify(list.kode_barcode))
      return data
    })
  }

  render() {
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: (row, isSelect, rowIndex, e) => {
        let array = JSON.parse(localStorage.getItem("FakturTerpilih")) || [];
        let array_detail =
          JSON.parse(localStorage.getItem("FakturTerpilih_detail")) || [];
        const data = {
          kode_supplier: row.supplier,
          kode_barcode: row.kode_barcode,
          qty: row.stock,
        };
        const data_detail = {
          kode_supplier: row.supplier,
          kode_barcode: row.kode_barcode,
          qty: row.stock,
          nama: row.nama_barang
          // merk_barang: row.merk_barang,
          // kwalitas: row.kwalitas,
          // ukuran: row.ukuran,
        };
        if (isSelect) {
          var index1 = array.findIndex((item, i) => {
            return item.kode_barcode === row.kode_barcode;
          });
          var index2 = array_detail.findIndex((item, i) => {
            return item.kode_barcode === row.kode_barcode;
          });
          if (index1 < 0) {
            array.push(data);
            array_detail.push(data_detail);
          } else {
            array.splice(index1, 1);
            array_detail.splice(index2, 1);
          }
          localStorage.setItem("FakturTerpilih", JSON.stringify(array));
          localStorage.setItem(
            "FakturTerpilih_detail",
            JSON.stringify(array_detail)
          );
        } else {
          var index = array.findIndex((item, i) => {
            return item.kode_barcode === row.kode_barcode;
          });
          var index3 = array_detail.findIndex((item, i) => {
            return item.kode_barcode === row.kode_barcode;
          });
          array.splice(index, 1);
          array_detail.splice(index3, 1);
          localStorage.setItem("FakturTerpilih", JSON.stringify(array));
          localStorage.setItem(
            "FakturTerpilih_detail",
            JSON.stringify(array_detail)
          );
        }
      },
      onSelectAll: (isSelect, rows, e) => {
        var array = [];
        var array_detail = [];
        rows.forEach(function (list) {
          const data = {
            kode_supplier: list.kode_supplier,
            kode_barcode: list.kode_barcode,
            qty: list.qty,
          };
          const data_detail = {
            kode_barcode: list.kode_barcode,
            kode_supplier: list.kode_supplier,
            nama_barang: list.nama_barang,
            // merk_barang: list.merk_barang,
            // kwalitas: list.kwalitas,
            // ukuran: list.ukuran,
            qty: list.qty,
          };
          array.push(data);
          array_detail.push(data_detail);
        });
        if (isSelect) {
          localStorage.setItem("FakturTerpilih", JSON.stringify(array));
          localStorage.setItem(
            "FakturTerpilih_detail",
            JSON.stringify(array_detail)
          );
        } else {
          localStorage.removeItem("FakturTerpilih");
          localStorage.removeItem("FakturTerpilih_detail");
        }
      },
    };
    return (
      <div>
        <Panel>
          {/* <PanelHeader>List Barang</PanelHeader> */}
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_barang"
                data={this.props.listinfobarang || []}
                columns={this.state.columns}
                selectRow={selectRow}
                CSVExport
                tambahData={false}
                // handleClick={() => this.tambahModal()}
              />
            </div>
            <br />
            {/* End Master Kategori */}
          </PanelBody>
          <PanelFooter>
            <button 
            className="btn btn-info float-right"
            onClick={()=>{this.detail()}}
            
            >Masukkan Keranjang</button>
          </PanelFooter>
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(TabelListBarang);
