import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  ReanderField,
  ReanderFieldInline,
  ReanderSelect,
  RenderFieldGroup,
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification";
import Stepper from "react-stepper-horizontal";
import NavigationStepper from "../../../components/content/NavigationStepper";
import {
  getCustomer,
  getKendaraan,
  getSales,
  getWarna,
  onFinish,
  onProgress,
} from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import { getToday } from "../../../components/notification/function";
import Tabel from "../../../components/Tabel/tabel";
import { getListService } from "../../../actions/transaksi_action";
import Swal from "sweetalert2";

class ModalDaftarService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: false,
      dataBooking: [],
      member: false,
      reguler: false,
      listCustomer: [],
      listkendaraan: [],
      listNopol: [],
      customer: "col-lg-12 row",
      step: 0,
      step1: "row",
      step2: "row d-none",
      step3: "row d-none",
      step4: "row d-none",
      step5: "row d-none",
      step6: "row d-none",
      columns: [
        {
          dataField: "jenis_barang",
          text: "Jenis barang",
        },
        {
          dataField: "nama",
          text: "Nama",
        },
        {
          dataField: "harga_total",
          text: "Harga",
          formatter: (data) => parseFloat(data).toLocaleString("id-ID"),
        },
        {
          dataField: "keterangan",
          text: "Keterangan",
        },
        {
          dataField: "action",
          text: "Action",
          csvExport: false,
          headerClasses: "text-center",
          formatter: (rowcontent, row, rowIndex) => {

            return (
              <div className="row text-center">
                <div className="col-12">
                  <button
                    type="button"
                    onClick={() => this.deleteBarang(rowIndex)}
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

  deleteBarang(index) {
    let data =
      JSON.parse(localStorage.getItem("list_service_daftar_temp")) || [];
    data.splice(index, 1);
    localStorage.setItem("list_service_daftar_temp", JSON.stringify(data));
    ToastSucces("Berhasil Dihapus");
    this.props.dispatch(getListService());
  }
  handleChange(nama, data) {
    let split = data || "DEFAULT|DEFAULT";
    let hasil = split.split("|");
    this.props.change(nama, hasil[1]);
  }
  nextStep() {
    switch (this.state.step) {
      case 0:
        this.setState({
          step: this.state.step + 1,
          step1: "row d-none",
          step2: "row ",
          step3: "row d-none",
          step4: "row d-none",
          step5: "row d-none",
          step6: "row d-none",
        });
        break;
      case 1:
        this.setState({
          step: this.state.step + 1,
          step1: "row d-none",
          step2: "row d-none",
          step3: "row ",
          step4: "row d-none",
          step5: "row d-none",
          step6: "row d-none",
        });
        break;
      case 2:
        this.setState({
          step: this.state.step + 1,
          step1: "row d-none",
          step2: "row d-none",
          step3: "row d-none",
          step4: "row ",
          step5: "row d-none",
          step6: "row d-none",
        });
        break;
      case 3:
        this.setState({
          step: this.state.step + 1,
          step1: "row d-none",
          step2: "row d-none",
          step3: "row d-none",
          step4: "row d-none",
          step5: "row ",
          step6: "row d-none",
        });
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
          step3: "row d-none",
          step4: "row d-none",
          step5: "row d-none",
          step6: "row d-none",
        });
        break;
      case 2:
        this.setState({
          step: this.state.step - 1,
          step1: "row d-none",
          step2: "row ",
          step3: "row d-none",
          step4: "row d-none",
          step5: "row d-none",
          step6: "row d-none",
        });
        break;
      case 3:
        this.setState({
          step: this.state.step - 1,
          step1: "row d-none",
          step2: "row d-none",
          step3: "row ",
          step4: "row d-none",
          step5: "row d-none",
          step6: "row d-none",
        });
        break;
      case 4:
        this.setState({
          step: this.state.step - 1,
          step1: "row d-none",
          step2: "row d-none",
          step3: "row d-none",
          step4: "row ",
          step5: "row d-none",
          step6: "row d-none",
        });
        break;
      default:
        break;
    }
  }
  componentDidMount() {
    this.props.dispatch(getCustomer());
    this.props.dispatch(getWarna());
    this.props.dispatch(getKendaraan());
    this.props.dispatch(getSales());
    this.props.change("tanggal_masuk", getToday());
    this.props.change("booking", localStorage.getItem("no_booking") || "");
    let nobook = localStorage.getItem("no_booking") || "";
    if (nobook !== "") {
      this.cariBooking(nobook);
    }
    AxiosMasterGet("daftar-service/generate/no-trx").then((res) =>
      this.props.change("no_faktur", res.data[0].no_daftar_service)
    );
  }
  cariBooking(e) {
    this.setState({ book: true });
    this.props.dispatch(onProgress());
    AxiosMasterGet("service/booking/" + e)
      .then((res) => {
        if (res.data.length === 0) {
          ToastError("Nomor Booking Tidak Ada");
          return false;
        } else {
          this.setState({
            dataBooking: res.data,
          });
          this.props.change("booking_customer", String(res.data.kode_customer));
          this.props.change("booking_nopol", res.data.nopol_kendaraan);
          this.props.change("kode_mekanik", res.data.kode_pegawai);
          // this.props.change("kode_kepala_montir",res.data.mechanics[0]);
          // this.props.change("kode_helper", res.data.mechanics[2]);
          this.setState({
            customer: "col-lg-12 row d-none",
          });
        }
      })
      .then(() => this.props.dispatch(onFinish()))
      .catch((err) => {
        ToastError("Booking Tidak Ditemukan.. Mohon Periksa Kembali");
        this.setState({
          customer: "col-lg-12 row",
        });
        this.props.dispatch(onFinish());
      });
  }
  setCustomer(data) {
    let hasil = data.split("||");
    this.props.change("alamat", hasil[1]);
    this.props.change("kota", hasil[2]);
    this.props.change("handphone", hasil[3]);
    this.getNopol(hasil[0]);
  }
  getNopol(data) {
    let listNopol = this.props.listCustomer.filter(
      (list) => list.kode_customer === data
    );
    let final = listNopol[0].nopol_kendaraan.map((hasil) => {
      let data = {
        value: hasil,
        name: hasil,
      };
      return data;
    });
    this.setState({
      listNopol: final,
    });
  }
  setKendaraan(data) {
    let hasil = data.split("||");
    this.props.change("merk_kendaraan", hasil[2]);
    this.props.change("type_kendaraan", hasil[3]);
    this.props.change("warna_kendaraan", hasil[4]);
    this.props.change("nomesin_kendaraan", hasil[5]);
  }

  getMember() {
    this.setState({
      member: true,
      reguler: false,
    });
    this.props.change("pelaggan", "");
    AxiosMasterGet("member/get-member-all")
      .then((res) =>
        this.setState({
          listCustomer:
            res &&
            res.data.map((list) => {
              let data = {
                value: `${list.kode_customer}||${list.alamat}||${list.kota}||${list.handphone}||${list.nopol_kendaraan}||${list.merk_kendaraan}||${list.type_kendaraan}||${list.warna_kendaraan}||${list.nomesin_kendaraan}`,
                name: list.nama_customer,
              };
              return data;
            }),
        })
      )
      .catch(() => ToastError("Error Get Member"));
  }
  getCustomer() {
    this.setState({
      member: false,
      reguler: true,
    });
    this.props.change("pelaggan", "");
    AxiosMasterGet("customer/get/all").then((res) =>
      this.setState({
        listCustomer:
          res &&
          res.data.map((list) => {
            let data = {
              value: `${list.kode_customer}||${list.alamat}||${list.kota}||${list.handphone}||${list.nopol_kendaraan}||${list.merk_kendaraan}||${list.type_kendaraan}||${list.warna_kendaraan}||${list.nomesin_kendaraan}`,
              name: list.nama_customer,
            };
            return data;
          }),
      })
    );
  }

  getKendaraanCustomer(e) {
    this.setState({
      member: false,
      reguler: true,
    });
    AxiosMasterGet("kendaraan-customer/get/by-nopol/" + e).then((res) => {
      let data = res && res.data;
      this.props.change("type_kendaraan", data.type_kendaraan);
      this.props.change("nomesin_kendaraan", data.nomesin_kendaraan);
    }
    );
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
        localStorage.removeItem("no_booking");
        window.location.reload();
      }
    });
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit}
          onKeyPress={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <div className="col-lg-12">
            <div className="col-lg-12 mb-5">
              <Stepper
                steps={[
                  {
                    title: "Data Customer",
                    onClick: () => {
                      this.prevStep(1);
                    },
                  },
                  {
                    title: "Data Dokumen",
                  },
                  {
                    title: "Data Service List",
                  },
                  {
                    title: "Data Mekanik & Catatan",
                  },
                ]}
                activeStep={this.state.step}
              />
            </div>
            <div className={this.state.step1}>
              <div className="col-lg-12">
                <h5>Sudah Booking ? Masukan kodenya di kolom bawah</h5>
              </div>
              <div className="col-lg-4">
                <Field
                  name="booking"
                  component={RenderFieldGroup}
                  type="text"
                  label="Nomor Booking"
                  placeholder="Masukan Nomor Booking "
                  handleClick={this.props.showBooking}
                  readOnly
                // onChange={(e) => this.cariBooking(e)}
                // onBlur={(e) => this.cariBooking(e)}
                />
              </div>
              <div className="col-lg-4">
                <Field
                  name="booking_customer"
                  component={ReanderSelect}
                  options={this.props.listCustomer.map((list) => {
                    let data = {
                      value: list.kode_customer,
                      name: list.nama_customer,
                    };
                    return data;
                  })}
                  type="text"
                  label="Nama Customer"
                  placeholder="Masukan Nama Customer"
                  readOnly
                  loading={this.props.onSend}
                />
                <span>Otomatis Terisi Saat nomor Booking diisi</span>
              </div>
              <div className="col-lg-4">
                <Field
                  name="booking_nopol"
                  component={ReanderField}
                  type="text"
                  label="Nomor Polisi"
                  placeholder="Masukan Nomor Polisi"
                  readOnly
                  loading={this.props.onSend}
                />
                <span>Otomatis Terisi Saat nomor Booking diisi</span>
              </div>
              {this.state.book ? (
                <div className="col-lg-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => this.batal()}
                    type="button"
                  >
                    Batal <i className="fa fa-times ml-3"></i>
                  </button>
                </div>
              ) : (
                <div className="col-lg-3 d-none">
                  <button
                    className="btn btn-danger"
                    onClick={() => this.batal()}
                    type="button"
                  >
                    Batal <i className="fa fa-times ml-3"></i>
                  </button>
                </div>
              )}

              <div className={this.state.customer}>
                <div className="col-lg-12">
                  <h4>Data Customer</h4>
                </div>
                <div className="col-lg-3">
                  <label className="mb-4">Jenis Penjualan</label>
                  <div>
                    <label>
                      <Field
                        name="jenis_penjualan"
                        component="input"
                        type="radio"
                        value="member"
                        className="mr-3"
                        onClick={() => this.getMember()}
                        checked={this.state.member}
                      />
                      Member
                    </label>
                    <label className="ml-3">
                      <Field
                        name="jenis_penjualan"
                        component="input"
                        type="radio"
                        value="reguler"
                        className="mr-3"
                        onClick={() => this.getCustomer()}
                        checked={this.state.reguler}
                      />
                      Reguler
                    </label>
                  </div>
                </div>
                <div className="col-lg-3">
                  <Field
                    name="nama"
                    component={ReanderSelect}
                    options={this.state.listCustomer}
                    type="text"
                    label="Nama"
                    placeholder="Masukan Nama"
                    onChange={(e) => this.setCustomer(e)}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="nopol_kendaraan"
                    component={ReanderSelect}
                    type="text"
                    label="Nomor Polisi"
                    placeholder="Masukan Nomor Polisi"
                    options={this.state.listNopol}
                    // options={this.state.listCustomer.map((list)=>{
                    //   let data={
                    //     value:JSON.stringify(list.nopol_kendaraan),
                    //     name:list.nopol_kendaraan
                    //   };
                    //   console.log("iki ganteng", list)
                    //   return data
                    // })}
                    onChange={(e) => this.getKendaraanCustomer(e)}
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="alamat"
                    component={ReanderField}
                    type="text"
                    label="Alamat"
                    placeholder="Masukan Alamat"
                    readOnly
                  />
                </div>
                <div className="col-lg-3 d-none">
                  <Field
                    name="no_faktur"
                    component={ReanderField}
                    type="text"
                    label="Alamat"
                    placeholder="Masukan Alamat"
                    readOnly
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="kota"
                    component={ReanderField}
                    type="text"
                    label="Kota"
                    placeholder="Masukan Kota"
                    readOnly
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="handphone"
                    component={ReanderField}
                    type="text"
                    label="Handphone"
                    placeholder="Masukan Handphone"
                    readOnly
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="type_kendaraan"
                    component={ReanderField}
                    type="text"
                    label="Type"
                    placeholder="Masukan Type"
                    readOnly
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="nomesin_kendaraan"
                    component={ReanderField}
                    type="text"
                    label="Nomor Mesin"
                    placeholder="Masukan Nomor Mesin"
                    readOnly
                  />
                </div>
              </div>
              <NavigationStepper first nextStep={() => this.nextStep(0)} />
            </div>
            <div className={this.state.step2}>
              <div className="col-lg-3">
                <Field
                  name="tanggal_masuk"
                  component={ReanderField}
                  type="date"
                  label="Tanggal Masuk"
                  placeholder="Masukan Tanggal Masuk"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="km_masuk"
                  component={ReanderField}
                  type="number"
                  label="KM Masuk"
                  placeholder="Masukan KM Masuk"
                />
              </div>
              <NavigationStepper
                nextStep={() => this.nextStep(1)}
                prevStep={() => this.prevStep(1)}
              />
            </div>
            <div className={this.state.step3}>
              <Tabel
                columns={this.state.columns}
                keyField="kategori_service"
                data={this.props.listdaftarservice || []}
                tambahData={true}
                handleClick={this.props.showBarang}
              />
              <NavigationStepper
                nextStep={() => this.nextStep(2)}
                prevStep={() => this.prevStep(2)}
              />
            </div>
            <div className={this.state.step4}>
              <div className="col-lg-12">
                <Field
                  name="keluhan_konsumen"
                  component={ReanderFieldInline}
                  type="text"
                  label="Keluhan Konsumen"
                  placeholder="Masukan Keluhan Konsumen"
                />
              </div>
              {/* <div className="col-lg-3">
                <Field
                  name="kode_kepala_montir"
                  component={ReanderSelect}
                  options={this.props.listsales
                    .filter((fill) => fill.kode_divisi === "KPM")
                    .map((list) => {
                      let data = {
                        value: `${list.kode_pegawai}`,
                        name: `${list.kode_pegawai} - ${list.nama_pegawai}`,
                      };
                      return data;
                    })}
                  type="text"
                  label="ID Kepala Montir"
                  placeholder="Masukan ID Mekanik"
                />
              </div> */}
              <div className="col-lg-3">
                <Field
                  name="kode_mekanik"
                  component={ReanderSelect}
                  options={this.props.listsales
                    .filter((fill) => fill.kode_divisi === "MKN")
                    .map((list) => {
                      let data = {
                        value: `${list.kode_pegawai}`,
                        name: `${list.kode_pegawai} - ${list.nama_pegawai}`,
                      };
                      return data;
                    })}
                  type="text"
                  label="ID Mekanik"
                  placeholder="Masukan ID Mekanik"
                />
              </div>
              {/* <div className="col-lg-3">
                <Field
                  name="kode_helper"
                  component={ReanderSelect}
                  options={this.props.listsales
                    .filter((fill) => fill.kode_divisi === "HLP")
                    .map((list) => {
                      let data = {
                        value: `${list.kode_pegawai}`,
                        name: `${list.kode_pegawai} - ${list.nama_pegawai}`,
                      };
                      return data;
                    })}
                  type="text"
                  label="Helper Mekanik"
                  placeholder="Masukan Helper Mekanik"
                />
              </div> */}
              <NavigationStepper
                nextStep={() =>
                  this.setState({
                    step1: "row",
                    step2: "row d-none",
                    step3: "row d-none",
                    step4: "row d-none",
                    step5: "row d-none",
                    step6: "row d-none",
                  })
                }
                prevStep={() => this.prevStep(3)}
                simpan
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ModalDaftarService = reduxForm({
  form: "ModalDaftarService",
  enableReinitialize: true,
})(ModalDaftarService);
const selector = formValueSelector("ModalDaftarService");
export default connect((state) => {
  return {
    listCustomer: state.datamaster.listcustomer,
    listkendaraan: state.datamaster.listkendaraan,
    listwarna: state.datamaster.listwarna,
    listdaftarservice: state.transaksi.listdaftarservice,
    listsales: state.datamaster.listsales,
    no_faktur: localStorage.getItem("no_daftar_service") || "",
    onSend: state.datamaster.onSend,
    booking: selector(state, "booking"),
  };
})(ModalDaftarService);

// DRAFT
// {
/* <div className="col-lg-3">
                <Field
                  name="kaki"
                  component={RenderCheckBox}
                  type="checkbox"
                  label="Kaki"
                  placeholder="Masukan Kaki"
                />
              </div>
              <div className="col-lg-9">
                <Field
                  name="estimasi_kaki"
                  component={ReanderField}
                  type="text"
                  label="Estimasi Harga"
                  placeholder="Masukan Estimasi Harga"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="ganti_oli"
                  component={RenderCheckBox}
                  type="text"
                  label="Ganti Oli"
                  placeholder="Masukan Ganti Oli"
                />
              </div>
              <div className="col-lg-9">
                <Field
                  name="estimasi_ganti_oli"
                  component={ReanderField}
                  type="text"
                  label="Ganti Oil"
                  placeholder="Masukan Ganti Oil"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="tune_up"
                  component={RenderCheckBox}
                  type="text"
                  label="Tune Up"
                  placeholder="Masukan Tune Up"
                />
              </div>
              <div className="col-lg-9">
                <Field
                  name="estimasi_tune_up"
                  component={ReanderField}
                  type="text"
                  label="Tune Up"
                  placeholder="Masukan Tune Up"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="electric"
                  component={RenderCheckBox}
                  type="text"
                  label="Electric"
                  placeholder="Masukan Electric"
                />
              </div>
              <div className="col-lg-9">
                <Field
                  name="estimasi_electric"
                  component={ReanderField}
                  type="text"
                  label="Electric"
                  placeholder="Masukan Electric"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="accecories"
                  component={RenderCheckBox}
                  type="text"
                  label="Accecories"
                  placeholder="Masukan Accecories"
                />
              </div>
              <div className="col-lg-9">
                <Field
                  name="estimasi_accecories"
                  component={ReanderField}
                  type="text"
                  label="Accecories"
                  placeholder="Masukan Accecories"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="turun_mesin"
                  component={RenderCheckBox}
                  type="text"
                  label="Turun Mesin"
                  placeholder="Masukan Turun Mesin"
                />
              </div>
              <div className="col-lg-9">
                <Field
                  name="estimasi_turun_mesin"
                  component={ReanderField}
                  type="text"
                  label="Turun Mesin"
                  placeholder="Masukan Turun Mesin"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="lain_lain"
                  component={RenderCheckBox}
                  type="text"
                  label="Lain-Lain"
                  placeholder="Masukan Lain-Lain"
                />
              </div>
              <div className="col-lg-9">
                <Field
                  name="estimasi_lain_lain"
                  component={ReanderField}
                  type="text"
                  label="Lain - Lain"
                  placeholder="Masukan Lain - Lain"
                />
              </div> */
// }
