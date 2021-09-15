import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { AxiosMasterGet } from "../../../axios";
import {
  ToastError,
  ToastSucces,
} from "../../../components/notification/notification";

class ComponentReturn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomor_return: "",
      deleted: true,
    };
  }
  tambahData() {
    if (this.state.nomor_return === "") {
      ToastError("Silahkan isi nomor return");
      return false;
    }
    AxiosMasterGet(
      "retur-barang-supplier/getDataReturSupplier/" + this.state.nomor_return
    )
      .then((res) => {
        // console.log(res.data.length);
        if (res.data.length === 0) {
          console.log("NOL");
          ToastError("Nomor Return Tidak Ditemukan");
          this.props.change("");
          return false;
        } else {
          console.log("TIDAK NOL");
          this.saveLocal(res);
        }
      })
      .catch((err) => `Error : ${err && err.response.data}`);
  }

  saveLocal(res) {
    let data = JSON.parse(localStorage.getItem("list_return")) || [];
    let hasil = {
      no_faktur: res && res.data.no_retur_supplier,
      total_retur: res && res.data.jml_netto_rp,
    };
    let index = data.findIndex((list) => {
      return list.no_return === res.data.no_retur_supplier;
    });
    if (~index) {
      data[index] = hasil;
    } else {
      data.push(hasil);
    }

    localStorage.setItem("list_return", JSON.stringify(data));
    this.setState({
      no_faktur: res && res.data.no_retur_supplier,
      total_retur: res && res.data.jml_netto_rp,
    });
    this.props.reRender();
  }
  delete(position) {
    let data = JSON.parse(localStorage.getItem("list_return")) || [];
    data.splice(position, 1);
    localStorage.setItem("list_return", JSON.stringify(data));
    ToastSucces("Berhasil Menghapus Data");
    this.setState({
      deleted: !this.state.deleted,
    });
    this.props.reRender();
  }
  render() {
    let hasil = JSON.parse(localStorage.getItem("list_return")) || [];
    let total =
      "Rp. " +
      hasil
        .map((list) => list.total_retur)
        .reduce((a, b) => a + b, 0)
        .toLocaleString("id-ID");

    return (
      <>
        <div className="row">
          <div className="col-lg-9">
            <div className="form-group">
              <label htmlFor="">Nomor Return</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  this.setState({
                    nomor_return: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-lg-3">
            <label htmlFor="">.</label>
            <button
              type="button"
              className="btn btn-block btn-primary"
              onClick={() => this.tambahData()}
            >
              <strong>+</strong>
            </button>
          </div>
        </div>

        <div className="widget-list widget-list-rounded m-b-30">
          {hasil.map((list, index) => (
            <div className="widget-list-item">
              <div className="widget-list-content">
                <h4 className="widget-list-title">{list.no_faktur}</h4>
                <p className="widget-list-desc">
                  {parseFloat(list.total_retur).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="widget-list-action">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => this.delete(index)}
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-6">
              <h5>Total Return</h5>
            </div>
            <div className="col-6">
              <h5>{total}</h5>
            </div>
          </div>
        </div>
      </>
    );
  }
}

ComponentReturn = reduxForm({
  form: "ComponentReturn",
  enableReinitialize: true,
})(ComponentReturn);
export default ComponentReturn;
