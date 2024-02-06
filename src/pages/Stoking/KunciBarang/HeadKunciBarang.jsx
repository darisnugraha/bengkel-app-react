import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Swal from "sweetalert2";
import {
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action";
import { getHancurTemp } from "../../../actions/stocking_action";
import { AxiosMasterGet } from "../../../axios";
import {
  NotifSucces,
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";
import Tabel from "../../../components/Tabel/tabel";

const hapusDataKategori = (row, dispatch) => {
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
      let data = JSON.parse(localStorage.getItem("KunciBarang_temp"));
      let data2 = JSON.parse(localStorage.getItem("KunciBarang_temp_kirim"));
      data.splice(row, 1);
      data2.splice(row, 1);
      localStorage.setItem("KunciBarang_temp", JSON.stringify(data));
      localStorage.setItem("KunciBarang_temp_kirim", JSON.stringify(data2));
      NotifSucces("Berhasil Menghapus Data");
      dispatch(getHancurTemp());
    }
  });
};
class HeadKunciBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listGudang: [],
      columns: [
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
          sort: true,
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        {
          dataField: "merk_barang",
          text: "Merk",
        },
        {
          dataField: "kwalitas",
          text: "Kualitas",
        },
        {
          dataField: "qty",
          text: "Qty",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_barcode: row.kode_barcode,
              nama_barang: row.nama_barang,
              merk: row.merk,
              kwalitas: row.kwalitas,
              satuan: row.satuan,
              qty: row.qty,
              harga_satuan: row.harga_satuan,
              total: row.total,
            };

            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    onClick={() => this.editModal(dataEdit)}
                    className="btn btn-warning mr-3"
                  >
                    Edit
                    <i className="fa fa-edit ml-2"></i>
                  </button>
                  <button
                    onClick={() =>
                      hapusDataKategori(row.kodeProvinsi, this.props.dispatch)
                    }
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
  componentDidMount() {
    AxiosMasterGet("hancur-barang/generate/no-trx").then((res) =>
      this.props.change("no_pindah", res.data[0].no_hancur)
    );
    this.props.dispatch(onProgress());
    AxiosMasterGet("lokasi-gudang/get/all")
      .then((res) =>
        this.setState({
          listGudang:
            res &&
            res.data.map((list) => {
              let data = {
                value: list.kode_lokasi_gudang,
                name: list.nama_lokasi_gudang,
              };
              return data;
            }),
        })
      )
      .then(() => this.props.dispatch(onFinish()));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className="row">
            <div className="col-lg-3">
              <Field
                name="no_pindah"
                component={ReanderField}
                type="text"
                label="Nomor Pindah"
                placeholder="Masukan Nomor Pindah"
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
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="lokasi"
                component={ReanderSelect}
                options={this.state.listGudang}
                label="Lokasi Gudang"
                placeholder="Pilih Lokasi Gudang"
                onChange={(e) => localStorage.setItem("lokasi_hancur", e)}
                loading={this.props.onSend}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-lg-6">
              <div className="text-left"></div>
            </div>
            <div className="col-lg-6">
              <div className="text-right">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => this.props.dispatch(showModal())}
                >
                  Tambah Barang <i className="fa fa-plus ml-3"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Tabel
              columns={this.state.columns}
              data={this.props.kunci_temp || []}
              keyField="kode_barcode"
            />
          </div>
          <div className="col-lg-12">
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
      </div>
    );
  }
}
HeadKunciBarang = reduxForm({
  form: "permintaanBarang",
  enableReinitialize: true,
})(HeadKunciBarang);
export default connect((state) => {
  return {
    onSend: state.datamaster.onSend,
    kunci_temp: state.stocking.kunci_temp,
  };
})(HeadKunciBarang);
