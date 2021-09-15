import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { connect } from "react-redux";
import {
  ReanderField,
  ReanderSelect,
} from "../../../components/notification/notification.jsx";
import { getBarang, getIDBarang } from "../../../actions/datamaster_action.jsx";
import { Field, reduxForm } from "redux-form";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori.jsx";
import JsBarcode from "jsbarcode";
import { required } from "../../../validasi/normalize.jsx";

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listbarang: state.datamaster.listbarang,
    idbarang: state.datamaster.idbarang,
  };
};
class CetakBarcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      modalDialog: false,
      isLoading: false,
      listbarang: [],
      listLaporan: [],
      hasil: [],
      isPrint: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getBarang());
    this.props.dispatch(getIDBarang());
  }

  setBarang(e) {
    let arr = this.props.listbarang.find((fill) => fill.kode_barcode === e);
    console.log(arr);
    localStorage.setItem("barcodeTerpilih", JSON.stringify(arr));
    this.props.change("nama_barang", arr.nama_barang);
    this.props.change("kode_barang", arr.kode_barang);
    this.props.change("kode_oem", arr.kode_oem);
    this.props.change("kode_sku", arr.kode_sku);
    this.props.change("satuan", arr.kode_satuan);
    JsBarcode("#barcode", arr.kode_barcode, {
      text: arr.nama_barang,
    });
  }

  setBarang2(e) {
    let arr = this.props.listbarang.find((fill) => fill.kode_barcode === e);
    localStorage.setItem("barcodeTerpilih2", JSON.stringify(arr));
    this.props.change("nama_barang2", arr.nama_barang);
    this.props.change("kode_barang2", arr.kode_barang);
    this.props.change("kode_oem2", arr.kode_oem);
    this.props.change("kode_sku2", arr.kode_sku);
    this.props.change("satuan2", arr.kode_satuan);
    JsBarcode("#barcode", arr.kode_barcode, {
      text: arr.nama_barang,
    });
  }

  // handleSubmit(data) {
  //   console.log(data);
  //   let feedback = `AEX0ARA3H001V001CS2#E4APM0PO3+00YE0IG1PH0A102000671Z##                            APSWKesther grosir LB`;
  //   feedback += `%2H0637V0187L0102P02S${data.kode_barang}`;
  //   feedback += `%2H0622V0158BG01067>H${data.kode_barang}X>C${parseFloat(
  //     data.gw
  //   )}${parseFloat(data.nw)}`;
  //   feedback += `%2H0622V0087L0101P02S${data.kode_barang}X>C${parseFloat(
  //     data.gw
  //   )}${parseFloat(data.nw)}`;
  //   feedback += `%2H0650V0058L0101P02S${"GW"}%2H0622V0065L0102P02S${parseFloat(
  //     data.gw
  //   ).toFixed(3)}`;
  //   feedback += `%2H0650V0028L0101P02S${"NW"}%2H0622V0038L0102P02S${parseFloat(
  //     data.nw
  //   ).toFixed(3)}`;
  //   feedback += `%2H0535V0058L0101P02S${"ONG"}%2H0497V0065L0102P02SRp. ${data.ongkos}`;
  //   feedback += `%2H0515V0028L0101P02S${"T"}%2H0497V0038L0102P02S${parseFloat(
  //     data.tukaran
  //   ).toFixed(2)}%`;
  //   if (data.kode_barang2 === "") {
  //     feedback += `&01NiceOvlZA/01~A0Q1Z##  ##`;
  //   } else {
  //     feedback += `%2H0304V0187L0102P02S${data.kode_barang2}`;
  //     feedback += `%2H0277V0158BG01067>H${data.kode_barang2}X>C${parseFloat(
  //       data.gw2
  //     )}${parseFloat(data.nw2)}`;
  //     feedback += `%2H0277V0087L0101P02S${data.kode_barang2}X>C${parseFloat(
  //       data.gw2
  //     )}${parseFloat(data.nw2)}`;
  //     feedback += `%2H0306V0058L0101P02S${"GW"}%2H0277V0065L0102P02S${parseFloat(
  //       data.gw2
  //     ).toFixed(3)}`;
  //     feedback += `%2H0306V0025L0101P02S${"NW"}%2H0277V0036L0102P02S${parseFloat(
  //       data.nw2
  //     ).toFixed(3)}`;
  //     feedback += `%2H0194V0067L0101P02S${"ONG"}%2H0156V0074L0102P02SRp. ${
  //       data.ongkos2
  //     }`;
  //     feedback += `%2H0174V0037L0101P02S${"T"}%2H0156V0047L0102P02S${parseFloat(
  //       data.tukaran2
  //     ).toFixed(2)} %`;
  //     feedback += `&01NiceOvlZA/01~A0Q1Z##  ##`;
  //   }
  //   document.getElementById("myInput").value = feedback;
  //   const element = document.createElement("a");
  //   const file = new Blob([document.getElementById("myInput").value], {
  //     type: "text/plain;charset=utf-8",
  //   });
  //   element.href = URL.createObjectURL(file);
  //   element.download = "autoprint_barcode.txt";
  //   document.body.appendChild(element);
  //   element.click();
  // }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <div className="col-lg-12">
                  <h2>Barcode 1</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <Field
                      name="barcode_barang"
                      label="Pilih Barang"
                      component={ReanderSelect}
                      options={this.props.listbarang.map((list) => {
                        let data = {
                          value: list.kode_barcode,
                          name: `${list.kode_barcode} - ${list.nama_barang}`,
                        };
                        return data;
                      })}
                      onChange={(e) => this.setBarang(e)}
                      placeholder="Masukan Barang"
                      className=" form-control-lg"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="nama_barang"
                      label="Nama Barang"
                      component={ReanderField}
                      placeholder="Masukan Nama Barang"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="satuan"
                      label="Satuan Barang"
                      component={ReanderField}
                      placeholder="Masukan Satuan Barang"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="kode_barang"
                      label="Kode Barang"
                      component={ReanderField}
                      placeholder="Masukan Kode Barang"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="kode_oem"
                      label="Kode OE"
                      component={ReanderField}
                      placeholder="Masukan Kode OE"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="kode_sku"
                      label="Kode SKU"
                      component={ReanderField}
                      placeholder="Masukan Kode SKU"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="kode_intern"
                      label="Kode Intern"
                      component={ReanderField}
                      placeholder="Masukan Kode Intern"
                      className=" form-control-lg"
                      validate={required}
                    />
                  </div>
                  <div className="col-lg-4"></div>
                  <div className="col-lg-4 d-none">
                    <img id="barcode" />
                  </div>
                </div>
              </div>
              <br />
            </div>
            {/* End Master Kategori */}
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <div className="col-lg-12">
                  <h2>Barcode 2</h2>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <Field
                      name="barcode_barang2"
                      label="Pilih Barang"
                      component={ReanderSelect}
                      options={this.props.listbarang.map((list) => {
                        let data = {
                          value: list.kode_barcode,
                          name: `${list.kode_barcode} - ${list.nama_barang}`,
                        };
                        return data;
                      })}
                      onChange={(e) => this.setBarang2(e)}
                      placeholder="Masukan Barang"
                      className=" form-control-lg"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="nama_barang2"
                      label="Nama Barang"
                      component={ReanderField}
                      placeholder="Masukan Nama Barang"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="satuan2"
                      label="Satuan Barang"
                      component={ReanderField}
                      placeholder="Masukan Satuan Barang"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="kode_barang2"
                      label="Kode Barang"
                      component={ReanderField}
                      placeholder="Masukan Kode Barang"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="kode_oem2"
                      label="Kode OE"
                      component={ReanderField}
                      placeholder="Masukan Kode OE"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="kode_sku2"
                      label="Kode SKU"
                      component={ReanderField}
                      placeholder="Masukan Kode SKU"
                      className=" form-control-lg"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="kode_intern2"
                      label="Kode Intern"
                      component={ReanderField}
                      placeholder="Masukan Kode Intern"
                      className=" form-control-lg"
                      validate={required}
                    />
                  </div>
                  <div className="col-lg-4"></div>
                  <div className="col-lg-4 d-none">
                    <img id="barcode" />
                  </div>
                </div>
              </div>
            </div>
            <br />
            {/* End Master Kategori */}
          </div>
        </div>
        <div className="col-lg-12 text-right">
          <button className="btn btn-info">
            Print<span className="fa fa-print ml-2"></span>
          </button>
        </div>
      </form>
    );
  }
}

CetakBarcode = reduxForm({
  form: "CetakBarcode",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(CetakBarcode);
export default connect(maptostate, null)(CetakBarcode);
