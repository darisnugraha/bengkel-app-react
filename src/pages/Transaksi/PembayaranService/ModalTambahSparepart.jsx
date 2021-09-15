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

class TambahService extends Component {
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
            <div className="col-lg-6">
              <div className="col-lg-12">
                <Field
                  name="kategori_service1"
                  component={ReanderSelect}
                  options={this.props.listkategoriservice.map((list) => {
                    let data = {
                      value: `${list.kategori_service}||${list.harga_jasa_service}||${list.jenis_service}`,
                      name: list.kategori_service,
                    };
                    return data;
                  })}
                  onChange={(e) => this.setService(e)}
                  type="text"
                  label="Jenis Service"
                  placeholder="Masukan Jenis Service"
                />
              </div>
              <div className="col-lg-12 d-none">
                <Field
                  name="kategori_service"
                  component={ReanderFieldInline}
                  type="text"
                  label="Harga Service"
                  placeholder="Masukan Harga Service"
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
            </div>
            <div className="col-lg-6">
              <div className="col-lg-12">
                <Field
                  name="sparepart"
                  component={ReanderSelect}
                  options={this.props.listBarang.map((list) => {
                    let data = {
                      value: `${list.kode_barang}||${list.harga_jual}||${list.nama_barang}||${list.kode_barcode}`,
                      name: list.nama_barang,
                    };
                    return data;
                  })}
                  onChange={(e) => this.setSparepart(e)}
                  type="text"
                  label="Jenis Service"
                  placeholder="Masukan Jenis Service"
                />
              </div>
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-6">
                    <Field
                      name="kode_supplier1"
                      component={ReanderSelect}
                      options={this.state.listSupplier.map((barang) => {
                        let data = {
                          value: `${barang.kode_supplier}||${barang.stock}`,
                          name: barang.nama_supplier,
                        };
                        return data;
                      })}
                      onChange={(e) => this.setBarang(e)}
                      type="text"
                      label="Kode Supplier"
                      placeholder="Masukan Kode Supplier"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="stock"
                      component={ReanderField}
                      type="text"
                      label="Stock"
                      placeholder="Masukan Kode Supplier"
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 d-none">
                <Field
                  name="kode_sparepart"
                  component={ReanderFieldInline}
                  type="text"
                  label="Harga Service"
                  placeholder="Masukan Harga Service"
                  readOnly
                />
              </div>
              <div className="col-lg-12 d-none">
                <Field
                  name="kode_supplier"
                  component={ReanderFieldInline}
                  type="text"
                  label="Harga Service"
                  placeholder="Masukan Harga Service"
                />
              </div>
              <div className="col-lg-12 d-none">
                <Field
                  name="nama_sparepart"
                  component={ReanderFieldInline}
                  type="text"
                  label="Harga Service"
                  placeholder="Masukan Harga Service"
                />
              </div>
              <div className="col-lg-12">
                <Field
                  name="harga_sparepart"
                  component={ReanderFieldInline}
                  type="telp"
                  label="Harga Service"
                  placeholder="Masukan Harga Service"
                  {...currencyMask}
                  readOnly
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

TambahService = reduxForm({
  form: "TambahService",
  enableReinitialize: true,
})(TambahService);
export default connect((state) => {
  return {
    listBarang: state.datamaster.listbarang,
    listkategoriservice: state.datamaster.listkategoriservice,
  };
})(TambahService);
