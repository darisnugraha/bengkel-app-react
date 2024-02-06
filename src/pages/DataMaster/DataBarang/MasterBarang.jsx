import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelBody,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { connect } from "react-redux";
import {
  NotifError,
  NotifSucces,
  ToastError,
} from "../../../components/notification/notification.jsx";
import {
  editBarang,
  getBarang,
  showModal,
  hideModal,
  getIDBarang,
} from "../../../actions/datamaster_action.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import Skeleton from "react-loading-skeleton";
import { AxiosMasterPost, AxiosMasterPut } from "../../../axios.js";
import { reset } from "redux-form";
import Tabel from "../../../components/Tabel/tabel.jsx";
const FormModalBarang = lazy(() => import("./FormModalBarang.jsx"));

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listbarang: state.datamaster.listbarang,
    idbarang: state.datamaster.idbarang,
  };
};
class MasterBarang extends React.Component {
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
          text: "Kode Barcode / Kode Part",
        },
        {
          dataField: "nama_barang",
          text: "Nama Barang",
        },
        {
          dataField: "type",
          text: "Type",
        },
        {
          dataField: "kode_oem",
          text: "Kode OE"
        },
        {
          dataField: "kode_sku",
          text: "Kode SKU"
        },
        // {
        //   dataField: "kode_ukuran",
        //   text: "Ukuran",
        // },
        // {
        //   dataField: "kode_merk_barang",
        //   text: "Merk",
        // },
        // {
        //   dataField: "kode_kwalitas",
        //   text: "Kualitas",
        // },
        // {
        //   dataField: "kode_lokasi_rak",
        //   text: "Rak",
        // },
        // {
        //   dataField: "kode_lokasi_selving",
        //   text: "Selving",
        // },
        {
          dataField: "harga_jual",
          text: "Harga",
          formatter: (list) => list.toLocaleString("id-ID"),
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_barcode: row.kode_barcode,
              kode_barang: row.kode_barang,
              nama_barang: row.nama_barang,
              kode_kategori: row.kode_kategori,
              kode_jenis: row.kode_jenis,
              kode_oem: row.kode_oem,
              kode_sku: row.kode_sku,
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
                    onClick={() => this.editModal(dataEdit)}
                    className="btn btn-warning mr-3"
                  >
                    Edit
                    <i className="fa fa-edit ml-2"></i>
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
    this.props.dispatch(getBarang());
    this.props.dispatch(getIDBarang());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editBarang(data));
    this.setState({
      isEdit: true,
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editBarang(""));
    this.setState({
      isEdit: false,
    });
  }
  handleSubmit(hasil) {
    let data = {
      kode_barcode: hasil.kode_barcode.toString() || "-",
      kode_barang: hasil.kode_barang || "-",
      nama_barang: hasil.nama_barang || "-",
      kode_kategori: hasil.kode_kategori || "-",
      kode_jenis: hasil.jenis_barang || "-",
      kode_oem: hasil.kode_oem || "-",
      kode_sku: hasil.kode_sku || "-",
      // kode_merk_barang: hasil.merk || "-",
      // kode_ukuran: hasil.ukuran || "-",
      kode_satuan: hasil.satuan || "-",
      // kode_kwalitas: hasil.kwalitas || "-",
      type: hasil.type || "-",
      // kode_lokasi_rak: hasil.rak || "-",
      // kode_lokasi_selving: hasil.selving || "-",
      harga_jual: hasil.harga || "-",
    };
    let dataEdit = {
      kode_barcode: hasil.kode_barcode || "-",
      nama_barang: hasil.nama_barang || "-",
      kode_kategori: hasil.kode_kategori || "-",
      kode_jenis: hasil.jenis_barang || "-",
      kode_oem: hasil.no_oem,
      kode_sku: hasil.no_sku,
      // kode_merk_barang: hasil.merk || "-",
      // kode_ukuran: hasil.ukuran || "-",
      kode_satuan: hasil.satuan || "-",
      // kode_kwalitas: hasil.kwalitas || "-",
      type: hasil.type || "-",
      // kode_lokasi_rak: hasil.rak || "-",
      // kode_lokasi_selving: hasil.selving || "-",
      harga_jual: hasil.harga || "-",
    };
    this.state.isEdit
      ? AxiosMasterPut(
        "barang/update/by-kode-barang/" + hasil.kode_barang,
        dataEdit
      )
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("dataBarang")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getBarang()))
        .catch((err) =>
          NotifError(`Gagal Merubah Data, Detial : ${err.response.data}`)
        )
      : AxiosMasterPost("barang/add", data)
        .then(() => NotifSucces("Berhasil Ditambahkan"))
        .then(() => this.props.dispatch(reset("dataBarang")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getBarang()))
        .catch((err) =>
          ToastError(`Error Simpan Barang, Detail :  ${err.response.data}`)
        );
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Barang</li>
        </ol>
        <h1 className="page-header">Master Barang </h1>
        <Panel>
          <PanelHeader>Master Barang</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_barang"
                data={this.props.listbarang || []}
                columns={this.state.columns}
                CSVExport
                tambahData={true}
                handleClick={() => this.tambahModal()}
              />
            </div>
            <br />
            {/* End Master Kategori */}
          </PanelBody>
          <ModalGlobal
            title={
              this.state.isEdit ? "Edit Data Barang" : "Tambah Data Barang"
            }
            content={
              <Suspense
                fallback={<Skeleton width={"100%"} height={50} count={2} />}
              >
                <FormModalBarang
                  onSubmit={(data) => this.handleSubmit(data)}
                  onSend={this.props.onSend}
                  isEdit={this.state.isEdit}
                  idbarang={this.props.idbarang.kode_barang}
                />
              </Suspense>
            }
          />

          {/* End Tambah Master Kategori  */}
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(MasterBarang);
