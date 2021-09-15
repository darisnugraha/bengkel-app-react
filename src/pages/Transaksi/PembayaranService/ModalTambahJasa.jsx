import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import {
  getBarang,
  getKategoriService,
} from "../../../actions/datamaster_action";
import { AxiosMasterGet } from "../../../axios";
import { ReanderField } from "../../../components/helpers/field";
import {
  ReanderFieldInline,
  ReanderSelect,
  ToastError,
} from "../../../components/notification/notification";
import { required } from "../../../validasi/normalize";
const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});

class TambahJasa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSupplier: [],
    };
  }
  componentDidMount() {
    this.props.dispatch(getKategoriService());
    this.props.dispatch(getBarang());
  }
  setSparepart(e) {
    let hasil = e.split("||");
    this.props.change("kode_supplier1", null);
    AxiosMasterGet("daftar-service/getDataBarangDaftarService/" + hasil[3])
      .then((res) =>
        this.setState({
          listSupplier: res && res.data[0].data_supplier,
        })
      )
      .catch((err) => ToastError(`Error Get Supplier, ${err}`));
    this.props.change("harga_sparepart", hasil[1]);
    this.props.change("kode_sparepart", hasil[3]);
    this.props.change("nama_sparepart", hasil[2]);
  }
  setService(e) {
    let hasil = e.split("||");
    this.props.change("kategori_service", hasil[0]);
    this.props.change("harga_service", hasil[1]);
    this.props.change("nama_service", hasil[2]);
  }
  setBarang(e) {
    this.props.change("stock", e.split("||")[1]);
    this.props.change("kode_supplier", e.split("||")[0]);
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
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="col-lg-12">
                <Field
                  name="kategori_service1"
                  component={ReanderSelect}
                  options={this.props.listkategoriservice.map((list) => {
                    let data = {
                      value: `${list.kategori_service}||${list.harga_jasa_service}||${list.jenis_service}`,
                      name: `${list.kategori_service} - ${list.jenis_service}`,
                    };
                    return data;
                  })}
                  onChange={(e) => this.setService(e)}
                  type="text"
                  label="Jenis Service"
                  placeholder="Masukan Jenis Service"
                  validate={required}
                />
              </div>
              <div className="col-lg-12 d-none">
                <Field
                  name="kategori_service"
                  component={ReanderFieldInline}
                  type="text"
                  label="Harga Service"
                  placeholder="Masukan Harga Service"
                  validate={required}
                />
              </div>
              <div className="col-lg-12 ">
                <Field
                  name="harga_service"
                  component={ReanderFieldInline}
                  type="telp"
                  label="Harga Service"
                  placeholder="Masukan Harga Service"
                  {...currencyMask}
                  readOnly
                />
              </div>
              <div className="col-lg-12 ">
                <Field
                  name="keterangan_service"
                  component={ReanderFieldInline}
                  type="text"
                  label="Keterangan Service"
                  placeholder="Masukan Keterangan Service"
                  validate={required}
                />
              </div>
              <div className="col-lg-12 d-none ">
                <Field
                  name="nama_service"
                  component={ReanderFieldInline}
                  type="telp"
                  label="Harga Service"
                  placeholder="Masukan Harga Service"
                  {...currencyMask}
                />
              </div>
              <div className="col-lg-3 d-none">
                <Field
                  name="kode_supplier"
                  component={ReanderField}
                  type="text"
                  label="kode_supplier"
                  placeholder="Masukan kode_supplier"
                />
              </div>
              <div className="col-lg-3 d-none">
                <Field
                  name="kode_sparepart"
                  component={ReanderField}
                  type="text"
                  label="kode"
                  placeholder="Masukan kode"
                />
              </div>
              <div className="col-lg-3 d-none">
                <Field
                  name="nama_sparepart"
                  component={ReanderField}
                  type="text"
                  label="nama"
                  placeholder="Masukan nama"
                />
              </div>
              <div className="col-lg-3 d-none">
                <Field
                  name="qty"
                  component={ReanderField}
                  type="text"
                  label="qty"
                  placeholder="Masukan qty"
                />
              </div>
              <div className="col-lg-3 d-none">
                <Field
                  name="harga_sparepart"
                  component={ReanderField}
                  type="text"
                  label="harga satuan"
                  placeholder="Masukan harga satuan"
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="text-right">
                <button className="btn btn-primary">
                  Submit <i className="fa fa-paper-plane ml-3"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

TambahJasa = reduxForm({
  form: "TambahJasa",
  enableReinitialize: true,
})(TambahJasa);
export default connect((state) => {
  return {
    listBarang: state.datamaster.listbarang,
    listkategoriservice: state.datamaster.listkategoriservice,
    initialValues: {
      kode_supplier: state.transaksi.barang_jasa.kode_supplier,
      kode_sparepart: state.transaksi.barang_jasa.kode,
      nama_sparepart: state.transaksi.barang_jasa.nama,
      qty: state.transaksi.barang_jasa.qty,
      harga_sparepart: state.transaksi.barang_jasa.harga_satuan,
    },
  };
})(TambahJasa);
