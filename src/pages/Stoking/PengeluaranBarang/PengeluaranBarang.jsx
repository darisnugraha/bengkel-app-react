import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  NotifError,
  NotifSucces,
} from "../../../components/notification/notification.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import {
  getListPengeluaranBarang,
  getPengeluaranBarang,
  getPengeluaranBarangSelected,
} from "../../../actions/stocking_action.jsx";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import NavigationStepper from "../../../components/content/NavigationStepper.jsx";
import CetakNota from "../CetakNota.jsx";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios.js";
import {
  getToday,
  multipleDeleteLocal,
} from "../../../components/notification/function.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import EmptyTable from "../../../assets/emptyTable.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import ModalPermintaanBarang from "../PermintaanBarang/ModalPermintaanBarang.jsx";
import { showModal } from "../../../actions/datamaster_action.jsx";
import { reset } from "redux-form";
import { simpanLocal } from "../../../config/Helper.jsx";

const maptostate = (state) => {
  return {
    permintaan_temp: state.stocking.permintaan_temp,
    pengeluaran_selected: state.stocking.pengeluaran_selected,
    pengeluaran: state.stocking.pengeluaran,
    onSend: state.datamaster.onSend,
  };
};

class PengeluaranBarang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      listPengeluaran: "",
      listPenerimaan: [],
      step: 0,
      step1: "row",
      step2: "row d-none",
      columns: [
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
        },

        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        // {
        //   dataField: "merk_barang",
        //   text: "Merk barang",
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
        // {
        //   dataField: "action",
        //   text: "Action",
        //   csvExport: false,
        //   headerClasses: "text-center",
        //   formatter: (rowcontent, row) => {
        //
        //     return (
        //       <div className="row text-center">
        //         <div className="col-12">
        //           <button
        //             type="button"
        //             onClick={() => this.deleteBarang(row)}
        //             className="btn btn-danger"
        //           >
        //             Hapus
        //             <i className="fa fa-trash ml-2"></i>
        //           </button>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
      ],
      columns2: [
        {
          dataField: "kode_barcode",
          text: "Kode Barcode",
        },

        {
          dataField: "qty",
          text: "Qty",
        },
      ],
    };
  }
  // deleteBarang(row) {
  //   Swal.fire({
  //     title: "Anda Yakin !!",
  //     text: "Ingin Menghapus Data Ini ?",
  //     icon: "warning",
  //     position: "top-center",
  //     cancelButtonText: "Tidak",
  //     showCancelButton: true,
  //     confirmButtonText: "OK",
  //     showConfirmButton: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteLocalItemBarcode("pengeluaran_barang", row.kode_barcode);
  //       // deleteLocalItemBarcode("pengeluaran_barang", row.kode_barcode);
  //       this.props.dispatch(getPermintaanTemp());
  //     }
  //   });
  // }
  componentDidMount() {
    localStorage.setItem("FakturTerpilih", "[]");
    localStorage.setItem("FakturTerpilih_detail", "[]");
    this.props.dispatch(getPengeluaranBarangSelected());
    this.fetchNoPengeluaran();
  }

  fetchNoPengeluaran() {
    AxiosMasterGet("pengeluaran-barang/generate/no-trx").then((res) =>
      this.setState({
        listPengeluaran: res.data[0].no_pengeluaran,
        tanggal: getToday(),
      })
    );
  }
  nextStep() {
    switch (this.state.step) {
      case 0:
        this.setState({
          step: this.state.step + 1,
          step1: "row d-none",
          step2: "row",
        });
        this.props.dispatch(getPengeluaranBarangSelected());
        break;
      default:
        break;
    }
  }
  prevStep() {
    switch (this.state.step) {
      case 1:
        this.setState({
          step: this.state.step - 1,
          step1: "row ",
          step2: "row d-none",
        });
        break;
      default:
        break;
    }
  }
  handleValidasi(hasil) {
    if (localStorage.getItem("FakturTerpilih") === null) {
      NotifError("Faktur Terpilih Kosong");
      return false;
    }
    let data = JSON.parse(localStorage.getItem("FakturTerpilih_detail")) || [];
    let array = {
      no_pengeluaran: this.state.listPengeluaran,
      tanggal: this.state.tanggal,
      no_bon: this.state.nomor_pb,
      detail_barang: JSON.parse(localStorage.getItem("FakturTerpilih")),
    };
    let tableRows = [];
    data.forEach((list, index) => {
      let rows = [
        ++index,
        list.kode_barcode,
        list.nama_barang,
        // list.merk_barang,
        // list.kwalitas,
        // list.ukuran,
        list.qty,
      ];
      tableRows.push(rows);
    });
    let columnTabel = [
      "NO",
      "BARCODE",
      "NAMA BARANG",
      // "MERK",
      // "KW",
      // "UKURAN",
      "QTY",
    ];
    AxiosMasterPost("pengeluaran-barang/post-transaksi", array)
      .then(() => NotifSucces("Berhasil Menyimpan data"))
      .then(() =>
        CetakNota(
          "Tanggal",
          this.state.tanggal,
          "DIVISI",
          "MKN",
          "NO PENGELUARAN",
          this.state.listPengeluaran,
          "",
          "",
          "ADMIN",
          "01-28-2021",
          "ADMIN",
          columnTabel,
          "BUKTI PENGELUARAN BARANG",
          tableRows,
          [],
          true
        )
      )
      .then(() =>
        multipleDeleteLocal(["FakturTerpilih", "FakturTerpilih_detail"])
      )
      .then(() => this.props.dispatch(getPengeluaranBarang()))
      .then(() => this.prevStep())
      .then(() => this.fetchNoPengeluaran())
      .then(() =>
        this.setState({
          step: 0,
        })
      );
  }
  getPermintaan(e) {
    this.props.dispatch(getPengeluaranBarang(this.state.nomor_pb));
  }
  handleModal(hasil) {
    let local = JSON.parse(localStorage.getItem("pengeluaran_barang")) || [];
    let filtered = local.findIndex(
      (list) => list.kode_barcode === hasil.kode_barcode
    );
    if (filtered !== -1) {
      let data = {
        kode_barcode: hasil.kode_barcode,
        nama_barang: hasil.nama_barang,
        // merk_barang: hasil.merk,
        // kwalitas: hasil.kwalitas,
        // ukuran: hasil.ukuran,
        stock: hasil.stock,
        qty: parseInt(hasil.qty) + parseInt(local[filtered].qty),
      };
      local.splice(filtered, 1);
      local.push(data);
      localStorage.setItem("pengeluaran_barang", JSON.stringify(local));
      NotifSucces("Berhasil");
      this.props.dispatch(reset("ModalReturnSupplier"));
      this.props.dispatch(getListPengeluaranBarang());
    } else {
      let data = {
        kode_barcode: hasil.kode_barcode,
        nama_barang: hasil.nama_barang,
        // merk_barang: hasil.merk,
        // kwalitas: hasil.kwalitas,
        // ukuran: hasil.ukuran,
        stock: hasil.stock,
        qty: hasil.qty,
      };
      simpanLocal("pengeluaran_barang", data)
        .then(() => this.props.dispatch(reset("ModalPermintaanBarang")))
        .then(() => this.props.dispatch(getListPengeluaranBarang()));
    }
  }
  render() {
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      onSelect: (row, isSelect, rowIndex, e) => {
        console.log(row.noFaktur);
        let array = JSON.parse(localStorage.getItem("FakturTerpilih")) || [];
        let array_detail =
          JSON.parse(localStorage.getItem("FakturTerpilih_detail")) || [];
        const data = {
          kode_barcode: row.kode_barcode,
          qty: row.qty,
          kode_lokasi_shelving: row.kode_lokasi_shelving,
        };
        const data_detail = {
          kode_barcode: row.kode_barcode,
          nama_barang: row.nama_barang,
          kode_lokasi_shelving: row.kode_lokasi_shelving,
          // merk_barang: row.merk_barang,
          // kwalitas: row.kwalitas,
          // ukuran: row.ukuran,
          qty: row.qty,
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
            kode_barcode: list.kode_barcode,
            qty: list.qty,
            kode_lokasi_shelving: list.kode_lokasi_shelving,
          };
          const data_detail = {
            kode_barcode: list.kode_barcode,
            nama_barang: list.nama_barang,
            // merk_barang: list.merk_barang,
            // kwalitas: list.kwalitas,
            // ukuran: list.ukuran,
            qty: list.qty,
            kode_lokasi_shelving: list.kode_lokasi_shelving,
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
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Service</Link>
          </li>
          <li className="breadcrumb-item active">Pengeluaran Barang</li>
        </ol>
        <h1 className="page-header">Pengeluaran Barang </h1>
        <Panel>
          <PanelHeader>Pengeluaran Barang</PanelHeader>
          <br />
          <PanelBody>
            <div className="mb-3">
              <Stepper
                steps={[{ title: "Pilih Faktur" }, { title: "Data Terpilih" }]}
                activeStep={this.state.step}
              />
            </div>
            <div className={this.state.step1}>
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">No Pengeluaran</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.listPengeluaran}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">Tanggal</label>
                      <input
                        type="date"
                        className="form-control"
                        value={this.state.tanggal}
                        onChange={(e) =>
                          this.setState({
                            tanggal: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label htmlFor="">Nomor PB</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          this.setState({
                            nomor_pb: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 text-right">
                    <button
                      className="btn btn-primary"
                      onClick={() => this.getPermintaan()}
                    >
                      {this.props.onSend ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i> &nbsp;
                          Sedang Menyiapkan
                        </>
                      ) : (
                        <>
                          Cari Data <i className="fa fa-search ml-3 "></i>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Master Kategori */}
              <div className="col-lg-12 mt-2">
                <div className="col-lg-12">
                  <div className="text-left d-none">
                    <button
                      className="btn btn-primary mb-3"
                      onClick={() => this.props.dispatch(showModal())}
                    >
                      + Tambah Data
                    </button>
                  </div>
                </div>
                <BootstrapTable
                  keyField="kode_barcode"
                  data={this.props.pengeluaran || []}
                  columns={this.state.columns}
                  selectRow={selectRow}
                  noDataIndication={
                    <EmptyTable text="Silahkan Isi Nomor PB dan Klik Tombol Biru Dibawahnya" />
                  }
                />
              </div>
              <br />
              {/* End Master Kategori */}
              <NavigationStepper
                nextName="Next"
                first
                nextStep={() => this.nextStep(0)}
              />
              {/* End Tambah Master Kategori  */}
            </div>
            <div className={this.state.step2}>
              {/* Master Kategori */}

              <div className="col-lg-12">
                <BootstrapTable
                  keyField="kode_barcode"
                  data={this.props.pengeluaran_selected || []}
                  columns={this.state.columns2}
                  noDataIndication={
                    <EmptyTable text="Silahkan Isi Nomor PB dan Klik Tombol Biru Dibawahnya" />
                  }
                />
              </div>
              <br />
              <NavigationStepper
                nextName="Simpan"
                prevStep={() => this.prevStep(1)}
                nextStep={() => this.handleValidasi()}
                simpan
              />
              {/* End Master Kategori */}
            </div>
          </PanelBody>
        </Panel>
        <ModalGlobal
          title="Tambah Barang Pengeluaran"
          content={
            <ModalPermintaanBarang
              onSubmit={(data) => this.handleModal(data)}
            />
          }
        />
      </div>
    );
  }
}

export default connect(maptostate, null)(PengeluaranBarang);
