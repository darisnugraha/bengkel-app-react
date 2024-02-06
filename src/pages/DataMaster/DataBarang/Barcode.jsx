import React from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeader,
} from "../../../components/panel/panel.jsx";
import { connect } from "react-redux";
import {
  getBarang,
  getIDBarang,
} from "../../../actions/datamaster_action.jsx";
import { reduxForm } from "redux-form";
import ValidasiMasterKategori from "../../../validasi/ValidasiMasterKategori.jsx";
import CetakBarcode from "./CetakBarcode.jsx";

const maptostate = (state) => {
  return {
    hideModal: state.datamaster.modalDialog,
    onSend: state.datamaster.onSend,
    listbarang: state.datamaster.listbarang,
    idbarang: state.datamaster.idbarang,
  };
};
class Barcode extends React.Component {
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

  // setBarang(e) {
  //   let arr = this.props.listbarang.find((fill) => fill.kode_barcode === e);
  //   console.log(arr);
  //   localStorage.setItem("barcodeTerpilih", JSON.stringify(arr));
  //   this.props.change("nama_barang", arr.nama_barang);
  //   this.props.change("kode_barang", arr.kode_barang);
  //   this.props.change("kode_oem", arr.kode_oem);
  //   this.props.change("kode_sku", arr.kode_sku);
  //   this.props.change("kode_kategori", arr.kode_kategori);
  //   JsBarcode("#barcode", arr.kode_barcode, {
  //     text: arr.nama_barang,
  //   });
  // }

  handleSubmit(hasil) {
    console.log(hasil.barcode_barang2);
    let feedback = `AEX0ARA3H001V001CS2#E4APM0PO3+00YE0IG1PH0A102000671Z##                            APSWKesther grosir LB`;
    feedback += `%2H0637V0200L0102P02S${hasil.nama_barang.substr(0, 25)}`;
    feedback += `%2H0600V0158BG01067>H${hasil.barcode_barang}`;
    feedback += `%2H0580V0087L0101P02S${hasil.barcode_barang}`;
    feedback += `%2H0650V0058L0101P02S${"SKU"}%2H0590V0065L0102P02S${hasil.kode_sku}`;
    feedback += `%2H0650V0028L0101P02S${"Int"}%2H0590V0038L0102P02S${hasil.kode_intern}`;
    feedback += `%2H0435V0028L0101P02%2H0488V0035L0102P02S${1}` + hasil.satuan;
    if (hasil.kode_barang2 === "") {
      feedback += `&01NiceOvlZA/01~A0Q1Z##  ##`;
    } else {
      feedback += `%2H0250V0200L0102P02S${hasil.nama_barang2.substr(0, 25)}`;
      feedback += `%2H0230V0158BG01067>H${hasil.barcode_barang2}`;
      feedback += `%2H0214V0087L0101P02S${hasil.barcode_barang2}`;
      feedback += `%2H0275V0058L0101P02S${"SKU"}%2H0220V0065L0102P02S${hasil.kode_sku2}`;
      feedback += `%2H0275V0025L0101P02S${"Int"}%2H0220V0036L0102P02S${hasil.kode_intern2}`;
      feedback += `%2H0150V0025L0101P02%2H0100V0035L0102P02S${1}` + hasil.satuan2;
      feedback += `&01NiceOvlZA/01~A0Q1Z##  ##`;
    }
    document.getElementById("myInput").value = feedback;
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("myInput").value], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "autoprint_barcode.txt";
    document.body.appendChild(element);
    element.click();
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div>
          <ol className="breadcrumb float-xl-right">
            <li className="breadcrumb-item">
              <Link to="#">Data Master</Link>
            </li>
            <li className="breadcrumb-item active">Barcode Barang</li>
          </ol>
          <h1 className="page-header">Barcode Barang </h1>
          <Panel>
            <PanelHeader>Barcode Barang</PanelHeader>
            <PanelBody>
              <CetakBarcode onSubmit={(data) => this.handleSubmit(data)} />
            </PanelBody>
            <PanelFooter>
              <textarea className="d-none" id="myInput"></textarea>
            </PanelFooter>
            {/* End Tambah Master Kategori  */}
          </Panel>
        </div>
      </form>
    );
  }
}

Barcode = reduxForm({
  form: "Barcode",
  enableReinitialize: true,
  validate: ValidasiMasterKategori,
})(Barcode);
export default connect(maptostate, null)(Barcode);
