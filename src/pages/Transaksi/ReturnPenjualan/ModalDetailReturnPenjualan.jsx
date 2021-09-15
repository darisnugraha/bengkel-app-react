import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { ReanderFieldInline } from "../../../components/notification/notification";

class ModalDetailReturnPenjualan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <form>
        <div className="row">
          <div className="col-lg-6">
            <div className="col-lg-12">
              <Field
                name="nama_barang"
                component={ReanderFieldInline}
                type="text"
                label="Nama Barang"
                placeholder="Masukan Nama Barang"
              />
            </div>
            {/* <div className="col-lg-12">
              <Field
                name="merk"
                component={ReanderFieldInline}
                type="text"
                label="Merk"
                placeholder="Masukan Merk"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="kwalitas"
                component={ReanderFieldInline}
                type="text"
                label="Kualitas"
                placeholder="Masukan Kualitas"
              />
            </div> */}
            {/* <div className="col-lg-12">
              <Field
                name="ukuran"
                component={ReanderFieldInline}
                type="text"
                label="Ukuran"
                placeholder="Masukan Ukuran"
              />
            </div> */}
            <div className="col-lg-12">
              <Field
                name="satuan"
                component={ReanderFieldInline}
                type="text"
                label="Satuan"
                placeholder="Masukan Satuan"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="col-lg-12">
              <Field
                name="harga_satuan"
                component={ReanderFieldInline}
                type="text"
                label="Harga Satuan"
                placeholder="Masukan Harga Satuan"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="jumlah"
                component={ReanderFieldInline}
                type="text"
                label="Jumlah"
                placeholder="Masukan Jumlah"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="sub_total"
                component={ReanderFieldInline}
                type="text"
                label="Sub Total"
                placeholder="Masukan Sub Total"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="discount"
                component={ReanderFieldInline}
                type="text"
                label="Discount"
                placeholder="Masukan Discount"
              />
            </div>
            <div className="col-lg-12">
              <Field
                name="grand_total"
                component={ReanderFieldInline}
                type="text"
                label="Grand Total"
                placeholder="Masukan Grand Total"
              />
            </div>
          </div>
          <div className="col-lg-12 ">
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
          </div>
        </div>
      </form>
    );
  }
}

ModalDetailReturnPenjualan = reduxForm({
  form: "ModalDetailReturnPenjualan",
  enableReinitialize: true,
})(ModalDetailReturnPenjualan);
export default ModalDetailReturnPenjualan;
