import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { createNumberMask } from "redux-form-input-masks";
import { ReanderFieldInline } from "../../../components/notification/notification";

const currencyMask = createNumberMask({
  prefix: "Rp. ",
  locale: "id-ID",
});
class ModalDetailBarangSparepart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setSubTotal() {
    this.props.change("sub_total", this.props.sub_total);
  }
  setGrandTotal() {
    this.props.change("grand_total", this.props.grand_total);
  }
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
            <div className="col-lg-12">
              <Field
                name="nama_barang"
                component={ReanderFieldInline}
                type="text"
                label="Nama Barang"
                placeholder="Masukan Nama Barang"
                readOnly
              />
            </div>
            {/* <div className="col-lg-12">
              <Field
                name="merk"
                component={ReanderFieldInline}
                type="text"
                label="Merk"
                placeholder="Masukan Merk"
                readOnly
              />
            </div> */}
            <div className="col-lg-3 d-none">
              <Field
                name="kode_barcode"
                component={ReanderFieldInline}
                type="text"
                label=""
                placeholder="Masukan "
              />
            </div>
            {/* <div className="col-lg-12">
              <Field
                name="kwalitas"
                component={ReanderFieldInline}
                type="text"
                label="Kualitas"
                placeholder="Masukan Kualitas"
                readOnly
              />
            </div> */}
            {/* <div className="col-lg-12">
              <Field
                name="ukuran"
                component={ReanderFieldInline}
                type="text"
                label="Ukuran"
                placeholder="Masukan Ukuran"
                readOnly
              />
            </div> */}
            <div className="col-lg-12">
              <Field
                name="satuan"
                component={ReanderFieldInline}
                type="text"
                label="Satuan"
                placeholder="Masukan Satuan"
                readOnly
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="col-lg-12">
              <Field
                name="harga_satuan"
                component={ReanderFieldInline}
                type="telp"
                label="Harga Satuan"
                placeholder="Masukan Harga Satuan"
                readOnly
                {...currencyMask}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="jumlah"
                component={ReanderFieldInline}
                type="telp"
                label="Jumlah"
                placeholder="Masukan Jumlah"
                onChange={this.setSubTotal()}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="sub_total"
                component={ReanderFieldInline}
                type="telp"
                label="Sub Total"
                placeholder="Masukan Sub Total"
                {...currencyMask}
                readOnly
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="discount"
                component={ReanderFieldInline}
                type="text"
                label={
                  this.props.jenis_barang === "TAMBAH"
                    ? "Discount / PCS"
                    : "Potongan / PCS"
                }
                placeholder="Masukan Discount"
                {...currencyMask}
                onChange={this.setGrandTotal()}
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="grand_total"
                component={ReanderFieldInline}
                type="text"
                label="Grand Total"
                placeholder="Masukan Grand Total"
                {...currencyMask}
                readOnly
              />
            </div>
          </div>
          {/* <div className="col-lg-12 ">
            <div className="col-lg-4">
              <Field
                name="tukar"
                component={ReanderFieldInline}
                type="text"
                label="Tukar"
                placeholder="Masukan Tukar"
              />
            </div>

            <div className="col-lg-4">
              <Field
                name="total"
                component={ReanderFieldInline}
                type="text"
                label="Total"
                placeholder="Masukan Total"
              />
            </div>
          </div> */}
          <div className="col-lg-12">
            <div className="col-lg-12">
              <div className="text-right">
                <button className="btn btn-primary">
                  Simpan <i className="fa fa-paper-plane ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

ModalDetailBarangSparepart = reduxForm({
  form: "ModalDetailBarangSparepart",
  enableReinitialize: true,
})(ModalDetailBarangSparepart);
const selector = formValueSelector("ModalDetailBarangSparepart");
export default connect((state) => {
  const { jumlah, discount, harga_satuan } = selector(
    state,
    "jumlah",
    "discount",
    "harga_satuan"
  );
  return {
    initialValues: {
      kode_kategori: state.datamaster.databarang.kode_kategori,
      kode_barcode: state.datamaster.databarang.kode_barcode,
      jenis_barang: state.datamaster.databarang.kode_jenis,
      kode_barang: state.datamaster.databarang.kode_barang,
      nama_barang: state.datamaster.databarang.nama_barang,
      // merk: state.datamaster.databarang.kode_merk_barang,
      // ukuran: state.datamaster.databarang.kode_ukuran,
      // kwalitas: state.datamaster.databarang.kode_kwalitas,
      type: state.datamaster.databarang.type,
      rak: state.datamaster.databarang.kode_lokasi_rak,
      selving: state.datamaster.databarang.kode_lokasi_selving,
      harga_satuan: state.datamaster.databarang.harga_jual,
      satuan: state.datamaster.databarang.kode_satuan,
    },
    sub_total: parseFloat(harga_satuan || 0) * parseFloat(jumlah || 0),
    total_discount: parseFloat(jumlah || 0) * parseFloat(discount || 0),
    grand_total:
      parseFloat(harga_satuan || 0) * parseFloat(jumlah || 0) -
      parseFloat(jumlah || 0) * parseFloat(discount || 0),
  };
})(ModalDetailBarangSparepart);
