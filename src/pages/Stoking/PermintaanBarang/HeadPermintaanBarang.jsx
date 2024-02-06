import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { getSales, showModal } from "../../../actions/datamaster_action";
import {
  deleteLocalItemBarcode,
  ReanderField,
  ReanderSelect,
  ToastError,
} from "../../../components/notification/notification";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import {
  getNoPermintaanBarang,
  getPermintaanTemp,
} from "../../../actions/stocking_action";
import { AxiosMasterGet } from "../../../axios";
import Tabel from "../../../components/Tabel/tabel";
import { getToday } from "../../../components/notification/function";
import { required } from "../../../validasi/normalize";
import SelectSearch from "react-select-search";

const maptostate = (state) => {
  return {
    initialValues: {
      no_permintaan: localStorage.getItem("kode_permintaan_barang") || "",
    },
    onSend: state.datamaster.onSend,
    listsales: state.datamaster.listsales,
    listselfing: state.datamaster.listselfing,
  };
};
class HeadPermintaanBarang extends Component {
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
          dataField: "kode_barcode",
          text: "Kode barcode",
          sort: true,
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        // {
        //   dataField: "merk_barang",
        //   text: "Merk",
        // },
        // {
        //   dataField: "kwalitas",
        //   text: "Kualitas",
        // },
        {
          dataField: "qty",
          text: "Qty",
        },
        {
          dataField: "action",
          text: "Lokasi Shelving",
          formatter: (rowcontent, row) => {
            return (
              <>
                <SelectSearch
                  value={row.kode_lokasi_selving}
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
        deleteLocalItemBarcode("PermintaanBarang_temp", row.kode_barcode);
        // deleteLocalItemBarcode("PermintaanBarang_temp", row.kode_barcode);
        this.props.dispatch(getPermintaanTemp());
      }
    });
  }
  componentDidMount() {
    this.props.dispatch(getSales());
    this.props.change("tanggal", getToday());
    this.props.change(getNoPermintaanBarang());
    AxiosMasterGet("daftar-service/getDaftarServiceAllActive")
      .then((res) =>
        this.setState({
          listSPK: res && res.data,
        })
      )
      .catch((err) =>
        ToastError(`Erorr Get SPK , Detail : ${err.response.data}`)
      );
  }
  getSPK(data) {
    this.setState({ isEmpty: false });
    let PermintaanBarang_temp_kirim = [];
    console.log(this.state.listSPK);
    let filtered = this.state.listSPK.filter((list) => list.no_daftar === data);
    this.props.change("pegawai", filtered[0].kode_pegawai);
    this.props.change("tanggal", getToday());
    filtered[0].detail_barang
      .filter((fill) => fill.qty > 0)
      .forEach((list) => {
        PermintaanBarang_temp_kirim.push({
          kode_barcode: list.kode_barcode,
          qty: list.qty,
          kode_lokasi_shelving: "-",
        });
      });
    localStorage.setItem(
      "PermintaanBarang_temp",
      JSON.stringify(
        filtered[0].detail_barang.map((data) => {
          return { ...data, kode_lokasi_shelving: "-" };
        })
      )
    );
    localStorage.setItem(
      "PermintaanBarang_temp_kirim",
      JSON.stringify(PermintaanBarang_temp_kirim)
    );
    this.props.dispatch(getPermintaanTemp());
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
    let updateTemp = {
      kode_barcode: temp[tempIndex].kode_barcode,
      kode_lokasi_shelving: kode_lokasi_shelving,
      nama_barang: temp[tempIndex].nama_barang,
      qty: Number(temp[tempIndex].qty),
    };
    let updateTempKirim = {
      kode_barcode: tempKirim[tempIndex].kode_barcode,
      kode_lokasi_shelving: kode_lokasi_shelving,
      qty: Number(tempKirim[tempIndex].qty),
    };
    temp.splice(tempIndex, 1, updateTemp);
    tempKirim.splice(tempKirimIndex, 1, updateTempKirim);
    localStorage.setItem("PermintaanBarang_temp", JSON.stringify(temp));
    localStorage.setItem(
      "PermintaanBarang_temp_kirim",
      JSON.stringify(tempKirim)
    );
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="col-lg-12">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-3">
                <Field
                  name="no_permintaan"
                  component={ReanderField}
                  type="text"
                  label="Nomor Permintaan"
                  placeholder="Masukan Nomor Permintaan"
                  readOnly
                />
              </div>
              <div className="col-lg-3">
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
              <div className="col-lg-3">
                <Field
                  name="pegawai"
                  component={ReanderSelect}
                  options={this.props.listsales
                    .filter((data) => data.kode_divisi === "MKN")
                    .map((list) => {
                      let data = {
                        value: list.kode_pegawai,
                        name: list.nama_pegawai,
                      };
                      return data;
                    })}
                  type="text"
                  label="Mekanik"
                  placeholder="Masukan Kode Mekanik"
                  loading={this.props.onSend}
                  validate={required}
                  readOnly
                />
              </div>
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
            </div>
          </div>
        </div>
        <div className="col-lg-12 mb-5">
          <div className="text-right">
            {this.state.isEmpty ? (
              <button
                type="button"
                className="btn btn-warning disabled"
                // onClick={() => this.props.dispatch(showModal())}
              >
                Tambah Barang <i className="fa fa-plus ml-3"></i>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => this.props.dispatch(showModal())}
              >
                Tambah Barang <i className="fa fa-plus ml-3"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-lg-12">
          {this.props.permintaan_temp ? (
            <div className="col-lg-12">
              <Tabel
                keyField="kode_barcode"
                data={
                  this.props.permintaan_temp.filter((fill) => fill.qty > 0) ||
                  []
                }
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
            <button className="btn btn-primary">
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
      </form>
    );
  }
}
HeadPermintaanBarang = reduxForm({
  form: "permintaanBarang",
  enableReinitialize: true,
})(HeadPermintaanBarang);
export default connect(maptostate, null)(HeadPermintaanBarang);
