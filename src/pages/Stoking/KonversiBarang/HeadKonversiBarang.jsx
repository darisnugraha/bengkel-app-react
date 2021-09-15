import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  onFinish,
  onProgress,
  showModal,
} from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification";

const maptostate = (state) => {
  return {
    initialValues: {
      no_pindah: localStorage.getItem("no_pindah") || "",
    },
    onSend: state.datamaster.onSend,
  };
};
class HeadKonversiBarang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLokasi: [],
      listSupplier: [],
    };
  }
  componentDidMount() {
    this.props.dispatch(onProgress());
    AxiosMasterGet("lokasi-gudang/get/all")
      .then((res) =>
        this.setState({
          listLokasi: res.data.map((list) => {
            let data = {
              value: list.kode_lokasi_gudang,
              name: `${list.nama_lokasi_gudang} - (${list.kode_lokasi_gudang})`,
            };
            return data;
          }),
        })
      )
      .then(() => this.props.dispatch(onFinish()));
    this.props.dispatch(onProgress());
    AxiosMasterGet("supplier/get/all")
      .then((res) =>
        this.setState({
          listSupplier: res.data.map((list) => {
            let data = {
              value: list.kode_supplier,
              name: `${list.nama_supplier} - (${list.kode_supplier})`,
            };
            return data;
          }),
        })
      )
      .then(() => this.props.dispatch(onFinish()));
    AxiosMasterGet("konversi-barang/generate/no-trx").then((res) =>
      this.props.change("no_pindah", res.data[0].no_pindah)
    );
  }
  setLokasi(e) {
    this.setState({
      lokasi_pilihan: e,
    });
    localStorage.setItem("lokasi_pilihan", e);
  }
  setSupplier(e) {
    this.setState({
      supplier_pilihan: e,
    });
    localStorage.setItem("supplier_pilihan", e);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit} autoComplete={true}>
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
                options={this.state.listLokasi}
                label="LOKASI"
                placeholder="PILIH LOKASI"
                onChange={(e) => this.setLokasi(e)}
              />
            </div>
            <div className="col-lg-3">
              <Field
                name="supplier"
                component={ReanderSelect}
                options={this.state.listSupplier}
                label="SUPPLIER"
                placeholder="PILIH SUPPLIER"
                onChange={(e) => this.setSupplier(e)}
              />
            </div>
          </div>
          <div className="col-lg-12 mb-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="text-left">
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
              <div className="col-lg-6">
                <div className="text-right">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => this.props.dispatch(showModal())}
                    disabled={
                      this.state.lokasi_pilihan
                        ? this.state.supplier_pilihan
                          ? false
                          : true
                        : true
                    }
                  >
                    Tambah Barang <i className="fa fa-plus ml-3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
HeadKonversiBarang = reduxForm({
  form: "permintaanBarang",
  enableReinitialize: true,
})(HeadKonversiBarang);
export default connect(maptostate, null)(HeadKonversiBarang);
