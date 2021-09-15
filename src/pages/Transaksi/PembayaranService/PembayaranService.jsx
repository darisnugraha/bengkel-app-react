import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  NotifSucces,
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification.jsx";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { reset } from "redux-form";
import {
  getListBarangPembayaran,
  getListBayarService,
  getListPembayaran,
  tambahJasa,
} from "../../../actions/transaksi_action.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import {
  getFaktur,
  hideModal,
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import ModalBayarService from "./ModalBayarService.jsx";
import ModalCC from "./ModalCC.jsx";
import TambahService from "../DaftarService/TambahService.jsx";
import { getToday, getNextDay } from "../../../components/helpers/function.jsx";
import { AxiosMasterGet, AxiosMasterPost } from "../../../axios.js";
import { multipleDeleteLocal } from "../../../components/notification/function.jsx";
import ModalTambahJasa from "./ModalTambahJasa.jsx";
import CetakFaktur from "./CetakFaktur.jsx";

const HeadPembayaranService = lazy(() => import("./HeadPembayaranService.jsx"));

const maptostate = (state) => {
  return {
    listbayar_service: state.stocking.listbayar_service,
    grand_total_all: state.transaksi.total_bayar,
    noFaktur: state.datamaster.noFaktur,
  };
};

class PembayaranService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barangList:[],
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      bayar: true,
      jenisModal: "",
      columns: [
        {
          dataField: "kode_supplier",
          text: "Kode Supplier",
        },
        {
          dataField: "kode",
          text: "Kode Barang",
        },
        {
          dataField: "nama",
          text: "Nama Barang",
        },
        {
          dataField: "jenis_barang",
          text: "Jenis barang",
        },
        {
          dataField: "keterangan",
          text: "Keterangan",
        },
        {
          dataField: "harga_satuan",
          text: "Harga Satuan",
          formatter: (data) => `${parseFloat(data).toLocaleString("id-ID")}`,
        },
        {
          dataField: "qty",
          text: "QTY",
        },
        {
          dataField: "harga_total",
          text: "Harga Total",
          formatter: (data) => `${parseFloat(data).toLocaleString("id-ID")}`,
        },
        // {
        //   dataField: "action",
        //   text: "Action",
        //   csvExport: false,
        //   headerClasses: "text-center",
        //   formatter: (rowcontent, row) => {
        //     let data = {
        //       kode_supplier: row.kode_supplier || "-",
        //       kode: row.kode || "-",
        //       nama: row.nama || "-",
        //       qty: 1,
        //       harga_satuan: row.harga_satuan || "-",
        //       harga_total: row.harga_total || "-",
        //       keterangan: row.keterangan || "-",
        //       jenis_barang: "SPAREPART",
        //     };
        //     return (
        //       <div className="text-center">
        //         <div className="col-12">
        //           {row.keterangan === "-" ? (
        //             <button
        //               className="btn btn-warning"
        //               type="button"
        //               onClick={() => this.tambahJasa(data)}
        //             >
        //               {this.props.onSend ? (
        //                 <>
        //                   <i className="fas fa-spinner fa-spin"></i>
        //                 </>
        //               ) : (
        //                 <>
        //                   <i className="fa fa-money-bill-alt"></i> + Jasa
        //                 </>
        //               )}
        //             </button>
        //           ) : (
        //             <button
        //               className="btn btn-warning"
        //               type="button"
        //               disabled={true}
        //             >
        //               {this.props.onSend ? (
        //                 <>
        //                   <i className="fas fa-spinner fa-spin"></i>
        //                 </>
        //               ) : (
        //                 <>
        //                   <i className="fa fa-money-bill-alt"></i> + Jasa
        //                 </>
        //               )}
        //             </button>
        //           )}
        //         </div>
        //       </div>
        //     );
        //   },
        // },
      ],
      columnsSparepart: [
        {
          dataField: "kode_barcode",
          text: "Barcode",
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        {
          dataField: "merk",
          text: "Merk",
        },
        {
          dataField: "type",
          text: "Type",
        },
        {
          dataField: "qty",
          text: "Qty",
        },
        {
          dataField: "satuan",
          text: "Satuan",
        },
        {
          dataField: "harga",
          text: "harga",
        },
        {
          dataField: "total",
          text: "Total",
        },
      ],
      columnsListBayar: [
        {
          dataField: "no_ac",
          text: "No Bank",
        },
        {
          dataField: "jenis_trx",
          text: "Jenis",
        },
        {
          dataField: "fee_rp",
          text: "Fee Card",
        },
        {
          dataField: "bayar_rp",
          text: "Total",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row, rowIndex) => {
            // let dataEdit = {
            //   kode_divisi: row.kode_divisi,
            //   nama_divisi: row.nama_divisi,
            // };
            this.setState({});
            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    onClick={() => {
                      let data = JSON.parse(
                        localStorage.getItem("listPembayaran_temp")
                      );
                      data.splice(rowIndex, 1);
                      localStorage.setItem(
                        "listPembayaran_temp",
                        JSON.stringify(data)
                      );
                      this.props.dispatch(getListPembayaran());
                    }}
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
      dataSparepart: [
        {
          kode_barcode: "barcode",
          nama_barang: "nama_barang",
          merk: "merk",
          type: "type",
          qty: 3,
          satuan: "PCS",
          harga: 100000,
          total: 300000,
        },
      ],
      data: [
        {
          jenis_Kendaraan: "ADA",
          no_polisi: "ADA",
          nama_pemilik: "ADA",
          alamat: "ADA",
          jenis_service: "ADA",
          sparepart: "ADA",
          harga_sparepart: "ADA",
          ongkos: "ADA",
          harga_ongkos: "ADA",
        },
      ],
      dataListBayar: [
        {
          jenis_bayar: "CREDIT CARD",
          bank: "BCA",
          jumlah: 100000000,
        },
      ],
    };
  }

  componentDidMount() {
    localStorage.setItem("list_barang_bayar", JSON.stringify([]));
    this.props.dispatch(getFaktur());
    this.props.dispatch(getListBayarService());
    this.props.dispatch(getListBarangPembayaran());
    AxiosMasterGet("bayar-service/generate/no-trx").then((res) =>{
      localStorage.setItem("no_pembayaran_service", res.data[0].no_service)}
    );
  }
  showBayar() {
    this.setState({
      bayar: false,
    });
  }
  setBack() {
    this.setState({
      bayar: true,
    });
  }
  showSparepart() {
    this.props.dispatch(showModal());
    this.setState({
      jenisModal: "SPAREPART",
    });
  }
  showJasa() {
    this.props.dispatch(showModal());
    this.setState({
      jenisModal: "JASA",
    });
  }
  showCC() {
    this.props.dispatch(showModal());
    this.setState({
      jenisModal: "CC",
    });
  }
  tambahJasa(data) {
    this.props.dispatch(tambahJasa(data));
    this.props.dispatch(showModal());
  }
  handleSimpanCC(hasil) {
    let data = {
      no_ref: this.props.noFaktur,
      no_ac: `${hasil.bank}`,
      bayar_rp: hasil.grand_total,
      fee_rp: hasil.fee_card || 0,
      no_card: hasil.no_card,
      valid_until: hasil.expiry || "-",
      nama_pemilik: hasil.name || "-",
      no_ktp: hasil.no_ktp || "-",
      alamat_ktp: hasil.alamat_ktp || "-",
      kota_ktp: hasil.kota || "-",
      telepon_ktp: hasil.handphone || "-",
      jenis_trx: hasil.jenis_trx || "DEBIT",
    };

    let array = JSON.parse(localStorage.getItem("listPembayaran_temp")) || [];
    array.push(data);
    localStorage.setItem("listPembayaran_temp", JSON.stringify(array));
    NotifSucces("Simpan Berhasil");
    this.props.dispatch(getListPembayaran());
    localStorage.removeItem("noFaktur");
    this.props.dispatch(getFaktur());
  }
  tambahSparepart(hasil) {
    if (
      hasil.kode_sparepart !== undefined &&
      hasil.kategori_service !== undefined
    ) {
      let service = {
        kode_supplier: "-",
        kode: hasil.kategori_service,
        nama: hasil.nama_service,
        qty: 1,
        harga_satuan: hasil.harga_service,
        harga_total: hasil.harga_service,
        keterangan: hasil.keterangan_service,
        jenis_barang: "JASA SERVICE",
      };
      let barang = {
        kode_supplier: hasil.kode_supplier || "-",
        kode: hasil.kode_sparepart || "-",
        nama: hasil.nama_sparepart || "-",
        qty: 1 || 0,
        harga_satuan: hasil.harga_sparepart || "-",
        harga_total: hasil.harga_sparepart || "-",
        keterangan: hasil.kategori_service || "-",
        jenis_barang: "SPAREPART",
      };
      let array =
        JSON.parse(localStorage.getItem("list_tambahan_bayar_temp")) || [];
      let array2 = JSON.parse(localStorage.getItem("list_barang_bayar")) || [];
      let index = array2.findIndex(
        (list) =>
          list.kode_supplier === hasil.kode_supplier &&
          list.kode === hasil.kode_sparepart
      );
      if (index !== -1) {
        array2.splice(index, 1);
        array.splice(index, 1);
      }
      array.push(service, barang);
      array2.push(service, barang);
      // console.log(index);

      // console.log(array);
      // console.log(array2);
      // return false;
      localStorage.setItem("list_tambahan_bayar_temp", JSON.stringify(array));
      localStorage.setItem("list_barang_bayar", JSON.stringify(array2));
      ToastSucces("Tambah Data Berhasil");
      this.props.dispatch(hideModal());
      this.props.dispatch(reset("TambahService"));
      this.props.dispatch(getListBarangPembayaran());
      localStorage.removeItem("noFaktur");
      this.props.dispatch(getFaktur());
    } else if (hasil.kode_sparepart === undefined) {
      let service = {
        kode_supplier: "-",
        kode: hasil.kategori_service,
        nama: hasil.nama_service,
        qty: 1,
        harga_satuan: hasil.harga_service,
        harga_total: hasil.harga_service,
        keterangan: hasil.keterangan_service,
        jenis_barang: "JASA SERVICE",
      };
      let array =
        JSON.parse(localStorage.getItem("list_tambahan_bayar_temp")) || [];
      let array2 = JSON.parse(localStorage.getItem("list_barang_bayar")) || [];
      array.push(service);
      array2.push(service);
      localStorage.setItem("list_tambahan_bayar_temp", JSON.stringify(array));
      localStorage.setItem("list_barang_bayar", JSON.stringify(array2));
      ToastSucces("Tambah Data Berhasil");
      this.props.dispatch(hideModal());
      this.props.dispatch(reset("TambahService"));
      this.props.dispatch(getListBarangPembayaran());
      localStorage.removeItem("noFaktur");
      this.props.dispatch(getFaktur());
    } else {
      let barang = {
        kode_supplier: hasil.kode_supplier || "-",
        kode: hasil.kode_sparepart || "-",
        nama: hasil.nama_sparepart || "-",
        qty: 1 || 0,
        harga_satuan: hasil.harga_sparepart || "-",
        harga_total: hasil.harga_sparepart || "-",
        keterangan: hasil.kategori_service || "-",
        jenis_barang: "SPAREPART",
      };
      let array =
        JSON.parse(localStorage.getItem("list_tambahan_bayar_temp")) || [];
      let array2 = JSON.parse(localStorage.getItem("list_barang_bayar")) || [];
      array.push(barang);
      array2.push(barang);
      localStorage.setItem("list_tambahan_bayar_temp", JSON.stringify(array));
      localStorage.setItem("list_barang_bayar", JSON.stringify(array2));
      ToastSucces("Tambah Data Berhasil");
      this.props.dispatch(hideModal());
      this.props.dispatch(reset("TambahService"));
      this.props.dispatch(getListBarangPembayaran());
      localStorage.removeItem("noFaktur");
      this.props.dispatch(getFaktur());
    }
  }
  bayarservice(hasil) {
    console.log("ini",hasil);
    this.props.dispatch(onProgress());
    let data = {
      no_daftar: localStorage.getItem("no_daftar") || "",
      tgl_bayar: getToday(),
      tgl_keluar: getToday(),
      jdw_service: getNextDay(),
      km_keluar: localStorage.getItem("km_keluar"),
      km_service: localStorage.getItem("km_berikutnya"),
      disk_part_rp: hasil.barang || 0,
      disk_jasa_rp: hasil.jasa || 0,
      total_bayar:
        parseFloat(this.props.grand_total_all) -
        parseFloat(hasil.barang || 0) -
        parseFloat(hasil.jasa || 0),
      cash_rp: localStorage.getItem("total_all") || 0,
      no_ref_cash: this.props.noFaktur,
      status_masuk_piutang: hasil.piutang || false,
      detail_barang:
        JSON.parse(localStorage.getItem("list_barang_bayar")) || [],
      detail_non_tunai:
        localStorage.getItem("listPembayaran_temp") === "[]"
          ? [
              {
                no_ref: "-",
                no_ac: "-",
                bayar_rp: 0,
                fee_rp: 0,
                no_card: "-",
                valid_until: "-",
                nama_pemilik: "-",
                no_ktp: "-",
                alamat_ktp: "-",
                kota_ktp: "-",
                telepon_ktp: "-",
                jenis_trx: "-",
              },
            ]
          : localStorage.getItem("listPembayaran_temp") !== null
          ? JSON.parse(localStorage.getItem("listPembayaran_temp"))
          : [
              {
                no_ref: "-",
                no_ac: "-",
                bayar_rp: 0,
                fee_rp: 0,
                no_card: "-",
                valid_until: "-",
                nama_pemilik: "-",
                no_ktp: "-",
                alamat_ktp: "-",
                kota_ktp: "-",
                telepon_ktp: "-",
                jenis_trx: "-",
              },
            ],
    };
    AxiosMasterPost("bayar-service/post-transaksi", data)
      .then(() => ToastSucces("Berhasil Melakukan Pembayaran, Terima Kasih"))
      .then(() =>
        multipleDeleteLocal([
          "list_tambahan_bayar_temp",
          "list_barang_bayar",
          "no_daftar",
          "listPembayaran_temp",
          "noFaktur",
        ])
      )
      .then(() => this.props.dispatch(getListBarangPembayaran()))
      .then(() => this.props.dispatch(getListPembayaran()))
      .then(() => this.props.dispatch(getFaktur()))
      .then(() => this.props.dispatch(onFinish()))
      .then(() => this.props.dispatch(getListBayarService()))
      .then(() => {
        AxiosMasterGet(
          `bayar-service/getDataServiceByNoService/${localStorage.getItem(
            "no_pembayaran_service"
          )}`
        )
          .then((res) => CetakFaktur(res.data))
          .then(() => localStorage.removeItem("no_pembayaran_service"))
          .then(() => this.setBack())
          .catch((err) =>
            ToastError(
              `Error Print Faktur, Detail : ${err.response.data}`
            ).then(() => this.props.dispatch(onFinish()))
          );
      })
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) =>
        ToastError(
          `Gagal Menyimpan pembayaran , Error : ${err.response.data}`
        ).then(() => this.props.dispatch(onFinish()))
      );
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Transaksi</Link>
          </li>
          <li className="breadcrumb-item active">Bayar Service</li>
        </ol>
        <h1 className="page-header">Bayar Service </h1>
        <Panel>
          <PanelHeader>Bayar Service</PanelHeader>
          <PanelBody>
            <br />
            {this.state.bayar ? (
              <HeadPembayaranService
                onSubmit={(data) => this.handleSubmit(data)}
                listbayar_service={this.props.listbayar_service}
                columns={this.state.columns}
                data={this.state.data}
                showBayar={() => this.showBayar()}
                showSparepart={() => this.showSparepart()}
                showJasa={() => this.showJasa()}
              />
            ) : (
              <ModalBayarService
                showCC={() => this.showCC()}
                columns={this.state.columnsListBayar}
                data={this.state.dataListBayar}
                backMenu={() =>
                  this.setState({
                    bayar: true,
                  })
                }
                onSubmit={(data) => this.bayarservice(data)}
              />
            )}
            {/* End Tambah Master Kategori  */}
          </PanelBody>
          <ModalGlobal
            content={
               this.state.jenisModal === "CC" ? (
                <ModalCC onSubmit={(data) => this.handleSimpanCC(data)} />
              ) : (
                <ModalTambahJasa
                  onSubmit={(data) => this.tambahSparepart(data)}
                />
              )
            }
            title={
               this.state.jenisModal === "JASA"
                ? "Tambah Data Jasa"
                : this.state.jenisModal === "BAYAR"
                ? "Tambah Pembayaran"
                : "Tambah Pembayaran"
            }
          />
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(PembayaranService);
