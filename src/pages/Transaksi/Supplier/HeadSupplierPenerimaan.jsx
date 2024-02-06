import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  deleteLocalItemBarcode,
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import { createNumberMask } from "redux-form-input-masks";
import { AxiosMasterGet } from "../../../axios";
import { getListTerimaSupplier } from "../../../actions/transaksi_action";
import Swal from "sweetalert2";
import Tabel from "../../../components/Tabel/tabel";
import { required } from "../../../validasi/normalize";
import { getToday } from "../../../components/notification/function";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  decimalPlaces: 0,
  locale: "id-ID",
});

class HeadSupplierPenerimaan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupplier: [],
      columns: [
        {
          dataField: "kode_barcode",
          text: "Barcode",
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        // {
        //   dataField: "merk",
        //   text: "Merk",
        // },
        // {
        //   dataField: "kwalitas",
        //   text: "Kualitas",
        // },
        {
          dataField: "satuan",
          text: "Satuan",
        },
        {
          dataField: "qty",
          text: "Qty",
        },
        {
          dataField: "kode_lokasi_shelving",
          text: "Lokasi",
        },
        {
          dataField: "harga_satuan",
          text: "Harga Satuan",
          formatter: (data) => {
            return parseFloat(data).toLocaleString("id-ID");
          },
        },
        {
          dataField: "total",
          text: "Total",
          formatter: (data) => {
            return parseFloat(data).toLocaleString("id-ID");
          },
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
        deleteLocalItemBarcode(
          "PenerimaanSupplier_temp_kirim",
          row.kode_barcode
        );
        deleteLocalItemBarcode("PenerimaanSupplier_temp", row.kode_barcode);
        this.props.dispatch(getListTerimaSupplier());
      }
    });
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
        localStorage.removeItem("penerimaan_tanggal_invoice");
        localStorage.removeItem("penerimaan_tanggal_barang");
        localStorage.removeItem("penerimaan_kode_supplier");
        localStorage.removeItem("penerimaan_keterangan");
        localStorage.removeItem("penerimaan_no_bon");
        localStorage.removeItem("penerimaan_kode_terima");
        localStorage.removeItem("type_pembayaran");
        window.location.reload();
      }
    });
  }
  componentDidMount() {
    AxiosMasterGet("terima-barang-supplier/generate/no-trx").then((res) =>
      localStorage.setItem("penerimaan_kode_terima", res.data[0].no_terima)
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
  setLocal(nama, data) {
    localStorage.setItem(nama, data);
  }
  setCheckbox(nama) {
    let data = localStorage.getItem(nama);
    if (data) {
      let hasil = data === "true" ? true : false;
      localStorage.setItem(nama, !hasil);
    } else {
      localStorage.setItem(nama, true);
    }
  }
  setSupplier(e) {
    let hasil = e && e.split("||");
    this.setLocal("penerimaan_kode_supplier", hasil[0]);
    this.setLocal("type_pembayaran", hasil[1]);
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
              name="kode_terima"
              component={ReanderField}
              type="text"
              label="Kode Terima"
              placeholder="Masukan Kode Terima"
              readOnly
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="kode_supplier"
              component={ReanderSelect}
              options={this.state.listSupplier.map((list) => {
                let data = {
                  value: `${list.kode_supplier}||${list.pembayaran_cash}`,
                  name: list.nama_supplier,
                };
                return data;
              })}
              type="text"
              label="Supplier"
              placeholder="Masukan Supplier"
              onChange={(e) => this.setSupplier(e)}
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="tanggal_invoice"
              component={ReanderField}
              type="date"
              label="Tanggal Invoice"
              placeholder="Masukan Tanggal Invoice"
              onChange={(e) =>
                this.setLocal("penerimaan_tanggal_invoice", e.target.value)
              }
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="tanggal_barang"
              component={ReanderField}
              type="date"
              label="Tanggal Barang"
              placeholder="Masukan Tanggal Barang"
              onChange={(e) =>
                this.setLocal("penerimaan_tanggal_barang", e.target.value)
              }
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="keterangan"
              component={ReanderField}
              type="text"
              label="Keterangan"
              placeholder="Masukan Keterangan"
              onChange={(e) =>
                this.setLocal("penerimaan_keterangan", e.target.value)
              }
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="no_bon"
              component={ReanderField}
              type="text"
              label="Nomor Bon"
              placeholder="Masukan Nomor Bon"
              onChange={(e) =>
                this.setLocal("penerimaan_no_bon", e.target.value)
              }
              validate={required}
            />
          </div>
          <div className="col-lg-3">
            <Field
              name="type_pembayaran"
              component={ReanderField}
              type="text"
              label="Type Pembayaran"
              placeholder="Masukan Type Pembayaran"
              readOnly
            />
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button
                className="btn btn-warning"
                type="button"
                onClick={this.props.showTambah}
              >
                Tambah Data <i className="fa fa-plus ml-3"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <Tabel
              keyField="kode_barcode"
              data={this.props.listterimasupplier || []}
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
                  {...currencyMask}
                  onChange={this.setTotal()}
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
              <button
                className="btn btn-danger"
                onClick={() => this.batal()}
                type="button"
              >
                Batal <i className="fa fa-times ml-3"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="text-right">
              <button className="btn btn-primary">
                Simpan <i className="fa fa-paper-plane ml-3"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

HeadSupplierPenerimaan = reduxForm({
  form: "HeadSupplierPenerimaan",
  enableReinitialize: true,
})(HeadSupplierPenerimaan);
const selector = formValueSelector("HeadSupplierPenerimaan"); // <-- same as form name
export default connect((state) => {
  const { sub_total, discount } = selector(state, "sub_total", "discount");
  localStorage.setItem("penerimaan_discount", discount || 0);
  return {
    total: parseFloat(sub_total || 0) - parseFloat(discount || 0),
    initialValues: {
      sub_total: state.transaksi.sub_total,
      kode_terima: localStorage.getItem("penerimaan_kode_terima") || null,
      kode_supplier:
        `${localStorage.getItem(
          "penerimaan_kode_supplier"
        )}||${localStorage.getItem("type_pembayaran")}` || null,
      tanggal_invoice:
        localStorage.getItem("penerimaan_tanggal_invoice") || getToday(),
      tanggal_barang:
        localStorage.getItem("penerimaan_tanggal_barang") || getToday(),
      keterangan: localStorage.getItem("penerimaan_keterangan") || null,
      no_bon: localStorage.getItem("penerimaan_no_bon") || null,
      discount: localStorage.getItem("penerimaan_discount") || 0,
      type_pembayaran:
        localStorage.getItem("type_pembayaran") === "true"
          ? "CASH"
          : "KREDIT" || null,
      // kredit: localStorage.getItem("penerimaan_kredit") || false,
    },
  };
})(HeadSupplierPenerimaan);
