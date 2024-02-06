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
} from "../../../components/notification/notification.jsx";
import {
  editCustomer,
  getCustomer,
  getFaktur,
  hideModal,
  showModal,
} from "../../../actions/datamaster_action.jsx";
import ModalGlobal from "../../ModalGlobal.jsx";
import Skeleton from "react-loading-skeleton";
import { reset } from "redux-form";
import { AxiosMasterPost, AxiosMasterPut } from "../../../axios.js";
import Tabel from "../../../components/Tabel/tabel.jsx";
import FormModalCustomerTambah from "./FormModalCustomerTambah.jsx";
const FormModalCustomer = lazy(() => import("./FormModalCustomer.jsx"));
const FormModalTambahKendaraan = lazy(() =>
  import("./FormModalTambahKendaraan.jsx")
);

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listcustomer: state.datamaster.listcustomer,
    noFaktur: state.datamaster.noFaktur,
    kode_customer: state.datamaster.datacustomer.kode_customer,
  };
};
class MasterCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRealEdit: false,
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      JenisModal: "",
      columns: [
        {
          dataField: "nama_customer",
          text: "Nama",
          sort: true,
        },
        {
          dataField: "alamat",
          text: "Alamat",
        },
        {
          dataField: "kota",
          text: "Kota",
        },
        {
          dataField: "handphone",
          text: "Handphone",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row) => {
            let dataEdit = {
              kode_customer: row.kode_customer,
              nama_customer: row.nama_customer,
              alamat: row.alamat,
              kota: row.kota,
              handphone: row.handphone,
              nopol_kendaraan: row.nopol_kendaraan,
              merk_kendaraan: row.merk_kendaraan,
              type_kendaraan: row.type_kendaraan,
              nomesin_kendaraan: row.nomesin_kendaraan,
              warna_kendaraan: row.warna_kendaraan,
            };
            let dataTambah = {
              kode_customer: row.kode_customer,
              nama_customer: row.nama_customer,
              alamat: row.alamat,
              kota: row.kota,
              handphone: row.handphone,
            };

            return (
              <div className="row text-center">
                <div className="col-6">
                  <button
                    onClick={() => this.editModal(dataEdit)}
                    className="btn btn-warning"
                  >
                    <span className="pr-2">Edit</span>
                    <i className="fa fa-edit"></i>
                  </button>
                </div>
                <div className="col-6">
                  <button
                    onClick={() => this.tambahkendaraanmodal(dataTambah)}
                    className="btn btn-success"
                  >
                    <span>Tambah</span>
                    <i className="fa fa-car"></i>
                  </button>
                </div>
              </div>
            );
          },
        },
      ],
      datakategori: [
        {
          nama_customer: "Octa",
          alamat_customer: "ARIA GRAHA",
          kota_customer: "BANDUNG",
          handphone_customer: "0988888",
          no_polisi: "D 4093 AAP",
          merk: "NMAX",
          type: "MATIC",
          no_mesin: "QWERT1234ASDFG",
          warna: "HITAM",
        },
      ],
    };
  }

  componentDidMount() {
    this.props.dispatch(getCustomer());
    localStorage.removeItem("noFaktur");
    this.props.dispatch(getFaktur());
  }
  editModal(data) {
    this.props.dispatch(showModal());
    this.props.dispatch(editCustomer(data));
    this.setState({
      JenisModal: "Edit Customer",
      isRealEdit: true,
      isEdit: false,
    });
    localStorage.setItem("kode_customer", data.kode_customer);
  }
  tambahkendaraanmodal(tambah) {
    this.props.dispatch(showModal());
    this.props.dispatch(editCustomer(tambah));
    this.setState({
      isRealEdit: false,
      isEdit: true,
      JenisModal: "Tambah Kendaraan",
    });
  }
  tambahModal() {
    this.props.dispatch(showModal());
    this.props.dispatch(editCustomer(""));
    this.setState({
      isRealEdit: false,
      isEdit: false,
    });
  }

  handleSubmit(hasil) {
    let data = {
      kode_customer: this.props.noFaktur || "-",
      nama_customer: hasil.nama_customer || "-",
      alamat: hasil.alamat_customer || "-",
      kota: hasil.kota_customer || "-",
      handphone: hasil.handphone_customer || "-",
      nopol_kendaraan: [hasil.no_polisi] || "-",
    };
    let dataEdit = {
      nama_customer: hasil.nama_customer || "-",
      alamat: hasil.alamat_customer || "-",
      kota: hasil.kota_customer || "-",
      handphone: hasil.handphone_customer || "-",
    };
    let dataEditKendaraan = {
      merk_kendaraan: hasil.merk || "-",
      type_kendaraan: hasil.type || "-",
      nomesin_kendaraan: hasil.no_mesin || "-",
      warna_kendaraan: hasil.warna || "-",
    };
    let dataKendaraan = {
      id_customer: hasil.kode_customer || "-",
      nopol_kendaraan: hasil.no_polisi || "-",
      merk_kendaraan: hasil.merk || "-",
      type_kendaraan: hasil.type || "-",
      nomesin_kendaraan: hasil.no_mesin || "-",
      warna_kendaraan: hasil.warna || "-",
    };
    let dataTambah = {
      id_customer: this.props.kode_customer || "-",
      nopol_kendaraan: hasil.no_polisi || "-",
      merk_kendaraan: hasil.merk || "-",
      type_kendaraan: hasil.type || "-",
      nomesin_kendaraan: hasil.no_mesin || "-",
      warna_kendaraan: hasil.warna || "-",
    };

    this.state.isRealEdit
      ? AxiosMasterPut(
        "customer/update/by-kode-customer/" +
        localStorage.getItem("kode_customer"),
        dataEdit
      )
        .then(() =>
          AxiosMasterPut(
            "kendaraan-customer/update/" + hasil.no_polisi,
            dataEditKendaraan
          )
        )
        .then(() => NotifSucces("Berhasil Dirubah"))
        .then(() => this.props.dispatch(reset("dataBarang")))
        .then(() => this.props.dispatch(hideModal()))
        .then(() => this.props.dispatch(getCustomer()))
        .catch((err) =>
          NotifError(
            "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
          )
        )
      : this.state.isEdit
        ? AxiosMasterPost("kendaraan-customer/add", dataTambah)
          .then(() => localStorage.removeItem("noFaktur"))
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataBarang")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getCustomer()))
          .then(() => this.props.dispatch(getFaktur()))
          .catch(() =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
            )
          )
        : AxiosMasterPost("customer/add", data)
          .then(() =>
            AxiosMasterPost("kendaraan-customer/add", dataKendaraan)
              .then(() => localStorage.removeItem("noFaktur"))
              .then(() => this.props.dispatch(getFaktur()))
          )
          .then(() => NotifSucces("Berhasil Ditambahkan"))
          .then(() => this.props.dispatch(reset("dataBarang")))
          .then(() => this.props.dispatch(hideModal()))
          .then(() => this.props.dispatch(getCustomer()))
          .then(() => this.props.dispatch(getFaktur()))
          .catch(() =>
            NotifError(
              "Sepertinya ada gangguan, Mohon ulang beberapa saat lagi"
            )
          );
  }

  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="#">Data Master</Link>
          </li>
          <li className="breadcrumb-item active">Master Customer</li>
        </ol>
        <h1 className="page-header">Master Customer </h1>
        <Panel>
          <PanelHeader>Master Customer</PanelHeader>
          <PanelBody>
            <br />
            {/* Master Kategori */}
            <div className="col-lg-12">
              <Tabel
                keyField="kode_customer"
                data={this.props.listcustomer || []}
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
              this.state.isRealEdit
                ? "Edit Data Customer"
                : this.state.isEdit
                  ? "Tambah Data Kendaraan"
                  : "Tambah Data Customer"
            }
            content={
              this.state.isRealEdit ? (
                <Suspense
                  fallback={<Skeleton width={"100%"} height={50} count={2} />}
                >
                  <FormModalCustomer
                    onSubmit={(data) => this.handleSubmit(data)}
                    onSend={this.props.onSend}
                    isEdit={this.state.isEdit}
                    noFaktur={this.props.noFaktur}
                  />
                </Suspense>
              ) : this.state.isEdit ? (
                <Suspense
                  fallback={<Skeleton width={"100%"} height={50} count={2} />}
                >
                  <FormModalTambahKendaraan
                    onSubmit={(data) => this.handleSubmit(data)}
                    onSend={this.props.onSend}
                    isEdit={this.state.isEdit}
                    noFaktur={this.props.noFaktur}
                  />
                </Suspense>
              ) : (
                <Suspense
                  fallback={<Skeleton width={"100%"} height={50} count={2} />}
                >
                  <FormModalCustomerTambah
                    onSubmit={(data) => this.handleSubmit(data)}
                    onSend={this.props.onSend}
                    isEdit={this.state.isEdit}
                    noFaktur={this.props.noFaktur}
                  />
                </Suspense>
              )
            }
          />

          {/* End Tambah Master Kategori  */}
        </Panel>
      </div>
    );
  }
}

export default connect(maptostate, null)(MasterCustomer);
