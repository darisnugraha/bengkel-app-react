import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import DualListBox from "react-dual-listbox";
import {
  NotifError,
  NotifSucces,
  ReanderSelect,
} from "../../../components/notification/notification";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios";

const options = [
  { value: "/dashboard", label: "dashboard" },
  { value: "/master-kategori", label: "master-kategori" },
  { value: "/master-jenis", label: "master-jenis" },
  { value: "/master-kendaraan", label: "master-kendaraan" },
  { value: "/master-merk-barang", label: "master-merk-barang" },
  { value: "/master-gudang", label: "master-gudang" },
  { value: "/master-rak", label: "master-rak" },
  { value: "/master-shelving", label: "master-shelving" },
  { value: "/master-satuan", label: "master-satuan" },
  { value: "/master-kualitas", label: "master-kualitas" },
  { value: "/master-jenis-kunci", label: "master-jenis-kunci" },
  { value: "/master-data-kunci", label: "master-data-kunci" },
  { value: "/master-bank", label: "master-bank" },
  { value: "/master-parameter-transaksi", label: "master-parameter-transaksi" },
  { value: "/master-kategori-service", label: "master-kategori-service" },
  { value: "/master-discount", label: "master-discount" },
  { value: "/master-harga-service", label: "master-harga-service" },
  { value: "/master-divisi", label: "master-divisi" },
  { value: "/master-sales", label: "master-sales" },
  { value: "/master-barang", label: "master-barang" },
  { value: "/master-customer", label: "master-customer" },
  { value: "/master-supplier", label: "master-supplier" },
  { value: "/service-permintaan", label: "service-permintaan" },
  { value: "/service-pengeluaran", label: "service-pengeluaran" },
  { value: "/stocking-konversi", label: "stocking-konversi" },
  { value: "/stocking-hancur", label: "stocking-hancur" },
  { value: "/stocking-tambah", label: "stocking-tambah" },
  { value: "/stocking-kunci", label: "stocking-kunci" },
  { value: "/service-booking", label: "service-booking" },
  { value: "/service-daftar", label: "service-daftar" },
  { value: "/service-bayar", label: "service-bayar" },
  { value: "/pembayaran-supplier", label: "pembayaran-supplier" },
  { value: "/service-lihat", label: "service-lihat" },
  { value: "/service-progress", label: "service-progress" },
  { value: "/service-luar", label: "service-luar" },
  { value: "/service-terima-luar", label: "service-terima-luar" },
  { value: "/service-komplain", label: "service-komplain" },
  { value: "/supplier-terima", label: "supplier-terima" },
  { value: "/supplier-return", label: "supplier-return" },
  { value: "/penjualan-sparepart", label: "penjualan-sparepart" },
  { value: "/penjualan-rongsok", label: "penjualan-rongsok" },
  { value: "/penjualan-return", label: "penjualan-return" },
  { value: "/penjualan-pembayaran", label: "penjualan-pembayaran" },
  { value: "/ambil-kas", label: "ambil-kas" },
  { value: "/tambah-kas", label: "tambah-kas" },
  { value: "/ambil-bank", label: "ambil-bank" },
  { value: "/tambah-bank", label: "tambah-bank" },
  { value: "/add-user", label: "add-user" },
  { value: "/hak-akses", label: "hak-akses" },
  { value: "/stockopname-tambah", label: "stockopname-tambah" },
  { value: "/laporan-stockopname", label: "laporan-stockopname" },
  { value: "/input-data-member", label: "input-data-member" },
  { value: "/parameter-point", label: "parameter-point" },
  { value: "/parameter-hadiah", label: "parameter-hadiah" },
  { value: "/parameter-tukar", label: "parameter-tukar" },
  { value: "/parameter-tambah-manual", label: "parameter-tambah-manual" },
  { value: "/laporan-permintaan-barang", label: "laporan-permintaan-barang" },
  { value: "/laporan-pengeluaran-barang", label: "laporan-pengeluaran-barang" },
  { value: "/laporan-stock-perkategori", label: "laporan-stock-perkategori" },
  { value: "/laporan-kartu-stock", label: "laporan-kartu-stock" },
  {
    value: "/laporan-penerimaan-supplier",
    label: "laporan-penerimaan-supplier",
  },
  { value: "/laporan-return-supplier", label: "laporan-return-supplier" },
  { value: "/laporan-hutang-supplier", label: "laporan-hutang-supplier" },
  {
    value: "/laporan-kartu-hutang-supplier",
    label: "laporan-kartu-hutang-supplier",
  },
  {
    value: "/laporan-pembayaran-supplier",
    label: "laporan-pembayaran-supplier",
  },
  {
    value: "/laporan-penjualan-sparepart",
    label: "laporan-penjualan-sparepart",
  },
  { value: "/laporan-penjualan-sales", label: "laporan-penjualan-sales" },
  { value: "/laporan-mekanik", label: "laporan-mekanik" },
  { value: "/laporan-penjualan-rongsok", label: "laporan-penjualan-rongsok" },
  { value: "/laporan-penjualan-service", label: "laporan-penjualan-service" },
  { value: "/laporan-piutang", label: "laporan-piutang" },
  { value: "/laporan-return-customer", label: "laporan-return-customer" },
  {
    value: "/laporan-pembayaran-customer",
    label: "laporan-pembayaran-customer",
  },
  { value: "/laporan-keuangan-kas", label: "laporan-keuangan-kas" },
  { value: "/laporan-keuangan-bank", label: "laporan-keuangan-bank" },
  { value: "/laporan-medical", label: "laporan-medical" },
  { value: "/master-warna", label: "master-warna" },
  { value: "/master-ukuran", label: "master-ukuran" },
  { value: "/service-edit", label: "service-edit"},
  { value: "/master-barcode", label: "master-barcode"},
];
class HeadHakAkses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
    };
  }
  onChange = (selected) => {
    this.setState({ selected });
  };
  SimpanAkses() {
    let hasil = [];
    this.state.selected.forEach((data) => {
      hasil.push({
        menu_name: data,
      });
    });
    let kirim = {
      user_id: this.props.user,
      detail: hasil,
    };
    AxiosMasterPost("akses-user/add", kirim)
      .then(() => NotifSucces("Berhasil Menambahkan hak akses"))
      .then(() => window.location.reload())
      .catch((err) =>
        NotifError(`Gagal Menyimpan, Detail :  ${err.response.data}`)
      );
  }
  componentDidMount() {
    AxiosMasterGet("users/get/all").then((res) =>
      this.setState({
        listUser:
          res &&
          res.data.map((hasil) => {
            let data = {
              value: hasil.user_id,
              name: `${hasil.user_id} - ${hasil.user_name}`,
            };
            return data;
          }),
      })
    );
  }
  render() {
    const { selected } = this.state;
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="row">
          <div className="col-lg-12">
            <Field
              name="user"
              component={ReanderSelect}
              options={this.state.listUser}
              type="text"
              label="ID Pengguna"
              placeholder="Masukan ID Pengguna"
            />
          </div>
          <div className="col-lg-6">
            <div className="text-center">
              <h4>Daftar Menu Yang Ada</h4>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-center">
              <h4>Daftar Menu Yang Diberi Akses</h4>
            </div>
          </div>
          <div className="col-lg-12">
            <DualListBox
              options={options}
              selected={selected}
              onChange={this.onChange}
            />
          </div>
          <div className="col-lg-12 mt-3">
            <div className="text-right">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => this.SimpanAkses()}
              >
                Simpan <i className="fa fa-paper-plane ml-3"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

HeadHakAkses = reduxForm({
  form: "HeadHakAkses",
  enableReinitialize: true,
})(HeadHakAkses);
let selector = formValueSelector("HeadHakAkses");
export default connect((state) => {
  return {
    user: selector(state, "user"),
  };
})(HeadHakAkses);
