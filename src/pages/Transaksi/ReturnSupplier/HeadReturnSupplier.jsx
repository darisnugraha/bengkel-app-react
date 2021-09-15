import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  deleteLocalItemBarcode,
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";

import { showModal } from "../../../actions/datamaster_action";
import { createNumberMask } from "redux-form-input-masks";
import { AxiosMasterGet } from "../../../axios";
import { formatDateISO } from "../../../components/notification/function";
import { getListBarangReturSupplier, getListReturnSupplier } from "../../../actions/transaksi_action";
import Swal from "sweetalert2";
import Tabel from "../../../components/Tabel/tabel";
import { required } from "../../../validasi/normalize";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  suffix: " ,-",
  decimalPlaces: 0,
  locale: "id-ID",
});

class HeadReturnSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupplier: [],
      hasilTerimaBarang: [],
      columns: [
        {
          dataField: "kode_barcode",
          text: "Barcode",
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
          dataField: "harga_satuan",
          text: "Harga Satuan",
          formatter: (data) => {
            return data.toLocaleString("id-ID");
          },
        },
        {
          dataField: "harga_total",
          text: "Total",
          formatter: (data) => {
            return data.toLocaleString("id-ID");
          },
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
                  <button
                    type="button"
                    onClick={() => this.deleteBarang(row)}
                    className="btn btn-danger"
                  >
                    Hapus
                    <i className="fa fa-trash ml-2"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
    };
  }

  deleteBarang(row) {
    Swal.fire({
      title: "Anda Yakin !!",
      text: "Ingin Menghapus Data Ini ?",
      icon: "warning",
      position: "top-center",
      cancelButtonText: "Tidak",
      showCancelButton: true,
      confirmButtonText: "OK",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLocalItemBarcode("ReturnSupplier_temp_kirim", row.kode_barcode);
        deleteLocalItemBarcode("ReturnSupplier_temp", row.kode_barcode);
        this.props.dispatch(getListReturnSupplier());
      }
    });
  }
  componentDidMount() {
    AxiosMasterGet("retur-barang-supplier/generate/no-trx").then((res) =>
      localStorage.setItem("kode_return", res.data[0].no_retur_supplier)
    );
    AxiosMasterGet("supplier/get/all").then((res) =>
      this.setState({
        listSupplier: res.data,
      })
    );
  }
  setTotal() {
    this.props.change("total", this.props.total);
  }

  batal() {
    Swal.fire({
      title: "Anda Yakin !!",
      text: "Ingin Membatalkan Proses Ini ?",
      icon: "warning",
      position: "top-center",
      cancelButtonText: "Tidak",
      showCancelButton: true,
      confirmButtonText: "OK",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("return_kode")
        localStorage.removeItem("kode_barcode")
        localStorage.removeItem("ListBarangSPL")
        localStorage.removeItem("ReturnSupplier_temp_kirim")
        localStorage.removeItem("return_supplier")
        localStorage.removeItem("return_keterangan")
        localStorage.removeItem("ReturnSupplier_temp")
        window.location.reload()

      }
    });
  }

  getTerimaBarang(hasil) {
    AxiosMasterGet(
      "terima-barang-supplier/lihat-bukti-terima/" + hasil.target.value
    )
      .then((res) => this.setLocal(res))
      .then(() => localStorage.setItem("return_kode", hasil.target.value))
      .then(() => this.setPenjualan())
      .catch((err) => console.log(err));
      this.props.dispatch(getListBarangReturSupplier());
  }
  setLocal(res) {
    console.log("INI LOCAL", res);
    this.setState({
      hasilTerimaBarang: res.data,
    });
    localStorage.setItem("return_supplier", res.data.kode_supplier);
    localStorage.setItem("ListBarangSPL", JSON.stringify(res.data.detail_barang));
    localStorage.setItem(
      "return_tanggal_bon",
      formatDateISO(res.data.tanggal_bon)
    );
    localStorage.setItem("return_keterangan", res.data.keterangan);
  }
  setPenjualan() {
    console.log(this.state.hasilTerimaBarang);
    this.props.change(
      "kode_supplier",
      this.state.hasilTerimaBarang.kode_supplier
    );
    this.props.change("keterangan", this.state.hasilTerimaBarang.keterangan);
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
              name="kode_return"
              component={ReanderField}
              type="text"
              label="Kode Return"
              placeholder="Masukan Kode Return"
              readOnly
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="no_bon"
              component={ReanderField}
              type="text"
              label="Nomor Faktur Penerimaan"
              placeholder="Masukan Nomor Faktur Penerimaan"
              // onChange={(hasil) => this.getTerimaBarang(hasil)}
              onBlur={(hasil) => this.getTerimaBarang(hasil)}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="kode_supplier"
              component={ReanderSelect}
              options={this.state.listSupplier.map((list) => {
                let data = {
                  value: list.kode_supplier,
                  name: list.nama_supplier,
                };
                return data;
              })}
              type="text"
              label="Supplier"
              placeholder="Masukan Supplier"
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="tanggal"
              component={ReanderField}
              type="date"
              label="Tanggal"
              placeholder="Masukan Tanggal"
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="keterangan"
              component={ReanderField}
              type="text"
              label="Keterangan"
              placeholder="Masukan Keterangan"
              validate={required}
            />
          </div>

          <div className="col-lg-12">
            <div className="text-right">
              <button
                className="btn btn-warning"
                type="button"
                onClick={() => this.props.dispatch(showModal())}
              >
                Tambah Data <i className="fa fa-plus ml-3"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <Tabel
              keyField="kode_barcode"
              data={this.props.listreturnsupplier || []}
              columns={this.state.columns}
              CSVExport
              textEmpty="Silahkan klik Tombol Kuning Untuk Tambah Barang"
            />
          </div>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4">
                <Field
                  name="sub_total"
                  component={ReanderField}
                  type="text"
                  label="Sub Total"
                  placeholder="Masukan Sub Total"
                  readOnly
                  {...currencyMask}
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="discount"
                  component={ReanderField}
                  type="text"
                  label="Discount"
                  placeholder="Masukan Discount"
                  onChange={this.setTotal()}
                  {...currencyMask}
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="total"
                  component={ReanderField}
                  type="text"
                  label="Total"
                  placeholder="Masukan Total"
                  {...currencyMask}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-left">
              <button className="btn btn-danger" onClick={() => this.batal()} type="button">
                Batal <i className="fa fa-times ml-3"></i>
              </button>
            </div>
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

HeadReturnSupplier = reduxForm({
  form: "HeadReturnSupplier",
  enableReinitialize: true,
})(HeadReturnSupplier);
const selector = formValueSelector("HeadReturnSupplier"); // <-- same as form name
export default connect((state) => {
  const { sub_total, discount } = selector(state, "sub_total", "discount");
  return {
    onSend: state.datamaster.onSend,
    total: parseFloat(sub_total || 0) - parseFloat(discount || 0),
    initialValues: {
      sub_total: state.transaksi.sub_total,
      no_bon: localStorage.getItem("return_kode") || "",
      kode_return: localStorage.getItem("kode_return") || "",
      kode_supplier: localStorage.getItem("return_supplier") || "",
      keterangan: localStorage.getItem("return_keterangan") || "",
      tanggal: localStorage.getItem("return_tanggal_bon") || "",
    },
  };
})(HeadReturnSupplier);
