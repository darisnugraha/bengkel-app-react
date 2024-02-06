import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  getSales,
  getSelfing,
  showModal,
} from "../../../actions/datamaster_action";
import {
  ReanderField,
  ReanderSelect,
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import {
  getNoEditService,
  getPermintaanTemp,
} from "../../../actions/stocking_action";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios";
import Tabel from "../../../components/Tabel/tabel";
import { getToday } from "../../../components/notification/function";
import { required } from "../../../validasi/normalize";
import SelectSearch from "react-select-search";

const maptostate = (state) => {
  return {
    initialValues: {
      no_spk: localStorage.getItem("no_daftar_service") || "",
    },
    onSend: state.datamaster.onSend,
    listsales: state.datamaster.listsales,
    listselfing: state.datamaster.listselfing,
  };
};
class HeadReturBarangTidakJadiPakai extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDivisi: [],
      listSales: [],
      listSupplier: [],
      listSPK: [],
      isEmpty: true,
      columns: [
        {
          dataField: "kode",
          text: "Kode barcode",
          sort: true,
        },
        {
          dataField: "nama",
          text: "Nama Barang",
        },
        {
          dataField: "no_pengeluaran",
          text: "No Pengeluaran",
        },
        // {
        //   dataField: "merk_barang",
        //   text: "Merk",
        // },
        // {
        //   dataField: "kwalitas",
        //   text: "Kualitas",
        // },
        // {
        //   dataField: "ukuran",
        //   text: "Ukuran",
        // },

        {
          dataField: "qty",
          text: "Qty",
        },
        {
          dataField: "kode_lokasi_shelving",
          text: "Lokasi Shelving",
          formatter: (rowcontent, row) => {
            return (
              <>
                <SelectSearch
                  value={rowcontent}
                  search
                  placeholder="Silahkan Pilih Shelving"
                  options={this.props.listselfing.map((list) => {
                    let data = {
                      value: list.kode_lokasi_selving,
                      name: list.nama_lokasi_selving,
                    };
                    return data;
                  })}
                  onChange={(data) =>
                    this.updateShelving(row.kode_barcode, data)
                  }
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                />
              </>
            );
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
                  {row.qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => this.deleteBarang(row)}
                      className="btn btn-success"
                      disabled={true}
                    >
                      Retur
                      <i className="fa fa-undo ml-2"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => this.deleteBarang(row)}
                      className="btn btn-success"
                    >
                      Retur
                      <i className="fa fa-undo ml-2"></i>
                    </button>
                  )}
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
      title: `${row.nama}`,
      text: "Masukkan qty retur",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      icon: "warning",
      position: "top-center",
      cancelButtonText: "Tidak",
      showCancelButton: true,
      confirmButtonText: "OK",
      showConfirmButton: true,
      preConfirm: (qty) => {
        if (qty > row.qty) {
          ToastError("Masukan qty sesuai stock!");
        } else if (qty < 0) {
          ToastError("Masukan qty sesuai stock!");
        } else {
          let data = {
            no_retur: localStorage.getItem("kode_permintaan_barang"),
            no_daftar_service: localStorage.getItem("no_spk"),
            kode_pegawai: localStorage.getItem("no_pegawai"),
            // kode_divisi: localStorage.getItem("kode_divisi"),
            detail_barang: [
              {
                kode_barcode: row.kode,
                qty: qty,
                kode_pengeluaran: row.kode_pengeluaran,
              },
            ],
          };
          AxiosMasterPost(
            "retur-barang/post-transaksi/" + localStorage.getItem("no_spk"),
            data
          )
            .then(() => this.props.dispatch(getPermintaanTemp()))
            .then(() => ToastSucces("Retur Barang Berhasil"))
            .then(() => window.location.reload())
            // .then(() => this.getSPK(data.no_daftar_service))
            .catch((err) => ToastError(err.response.data));

          // deleteLocalItemBarcode("PermintaanBarang_temp", row.kode_barcode);
        }
      },
    });
  }
  componentDidMount() {
    this.props.dispatch(getSales());
    this.props.dispatch(getSelfing());
    this.props.dispatch(getNoEditService());
    this.props.change("tanggal", getToday());
    AxiosMasterGet("daftar-service/getDataPendaftaranSerivce")
      .then((res) => {
        console.log(res.data);
        this.setState({
          listSPK: res && res.data,
        });
      })
      .catch((err) =>
        ToastError(`Erorr Get SPK , Detail : ${err.response.data}`)
      );
  }

  updateShelving(kodeBarcode, kode_lokasi_shelving) {
    let temp = JSON.parse(localStorage.getItem("PermintaanBarang_temp"));
    let tempKirim = JSON.parse(
      localStorage.getItem("PermintaanBarang_temp_kirim")
    );
    let tempIndex = temp.findIndex((data) => data.kode_barcode === kodeBarcode);
    let tempKirimIndex = tempKirim.findIndex(
      (data) => data.kode_barcode === kodeBarcode
    );
    let tempSelected = temp[tempIndex];
    tempSelected["kode_lokasi_shelving"] = kode_lokasi_shelving;
    let tempKirimSelected = tempKirim[tempIndex];
    tempKirimSelected["kode_lokasi_shelving"] = kode_lokasi_shelving;
    temp.splice(tempIndex, 1, tempSelected);
    tempKirim.splice(tempKirimIndex, 1, tempKirimSelected);
    localStorage.setItem("PermintaanBarang_temp", JSON.stringify(temp));
    localStorage.setItem(
      "PermintaanBarang_temp_kirim",
      JSON.stringify(tempKirim)
    );
  }

  getSPK(data) {
    this.setState({
      isEmpty: false,
    });
    let PermintaanBarang_temp_kirim = [];
    let filtered = this.state.listSPK.filter((list) => list.no_daftar === data);
    this.props.change("pegawai", filtered[0].id_pegawai);
    let filterbarang = filtered[0].detail_barang.filter(
      (fill) => fill.jenis_barang === "SPAREPART"
    );
    filterbarang.forEach((list) => {
      PermintaanBarang_temp_kirim.push({
        kode_barcode: list.kode_barcode,
        kode_supplier: list.kode_supplier,
        qty: list.qty,
      });
    });
    localStorage.setItem("no_spk", filtered[0].no_daftar);
    localStorage.setItem("no_pegawai", filtered[0].id_pegawai);
    localStorage.setItem("kode_divisi", filtered[0].kode_divisi);
    localStorage.setItem("PermintaanBarang_temp", JSON.stringify(filterbarang));
    localStorage.setItem(
      "PermintaanBarang_temp_kirim",
      JSON.stringify(PermintaanBarang_temp_kirim)
    );
    this.props.dispatch(getPermintaanTemp());
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="col-lg-12">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4">
                <Field
                  name="no_edit_service"
                  component={ReanderField}
                  type="text"
                  label="Kode Edit Service"
                  placeholder="Masukan Kode Edit Service"
                  readOnly
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="no_spk"
                  component={ReanderSelect}
                  options={this.state.listSPK.map((list) => {
                    let data = {
                      value: list.no_daftar,
                      name: `${list.no_daftar} - ${list.nama_customer}`,
                    };
                    return data;
                  })}
                  type="text"
                  label="Nomor Daftar Service"
                  placeholder="Masukan Nomor Daftar Service"
                  onChange={(data) => this.getSPK(data)}
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="tanggal"
                  component={ReanderField}
                  type="date"
                  label="Tanggal"
                  placeholder="Masukan Tanggal"
                  validate={required}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="col-lg-12 mb-5">
            <div className="text-right">
              <button
                type="button"
                disabled={this.state.isEmpty}
                className="btn btn-warning"
                onClick={() => this.props.dispatch(showModal())}
              >
                Tambah Barang <i className="fa fa-plus ml-3"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          {this.props.permintaan_temp ? (
            <div className="col-lg-12">
              <Tabel
                keyField="kode"
                data={this.props.permintaan_temp || []}
                columns={this.state.columns}
                CSVExport
                textEmpty="Silahkan Pilih Nomor Daftar Service untuk melihat barang"
              />
            </div>
          ) : (
            <Skeleton width={"100%"} height={400} />
          )}
        </div>
        <div className="col-lg-12 mb-5 mt-3">
          <div className="text-right">
            <button className="btn btn-primary" disabled={this.state.isEmpty}>
              {this.props.onSend ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang
                  Menyimpan
                </>
              ) : (
                <>
                  Simpan <i className="fa fa-paper-plane ml-3"></i>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
HeadReturBarangTidakJadiPakai = reduxForm({
  form: "editServiceBarang",
  enableReinitialize: true,
})(HeadReturBarangTidakJadiPakai);
export default connect(maptostate, null)(HeadReturBarangTidakJadiPakai);
