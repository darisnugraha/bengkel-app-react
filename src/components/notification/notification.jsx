import Swal from "sweetalert2";
import React from "react";
import SelectSearch from "react-select-search";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { AxiosMasterPut } from "../../axios";
import { SkeletonLoading } from "./function";
// import Select from "react-select";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export function NotifSucces(text) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      // title: 'Good Job',
      text: text,
      icon: "success",
      position: "top-right",
      timer: 2000,
      width: "300px",
      height: "100px",
      showConfirmButton: false,
    })
      .then(resolve("berhasil"))
      .catch(reject("error"));
  });
}
export function ToastSucces(text) {
  return new Promise((resolve, reject) => {
    Toast.fire({
      icon: "success",
      title: text,
    })
      .then(resolve("berhasil"))
      .catch(reject("error"));
  });
}

export function NotifError(text) {
  if (text.includes("Invalid token")) {
    Swal.fire({
      title: "Ooopss",
      text: "Sepertinya ada masalah keamanan, Silahkan Login Kembali..",
      icon: "info",
      position: "center",
      showConfirmButton: true,
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("isLogin", false);
        window.location.reload();
      }
    });
  } else {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Oopss!!",
        text: text,
        icon: "error",
        position: "top-right",
        timer: 2000,
        showConfirmButton: false,
      })
        .then(resolve("berhasil"))
        .catch(reject("error"));
    });
  }
}

export function ToastError(text) {
  return new Promise((resolve, reject) => {
    Toast.fire({
      icon: "error",
      title: text,
    })
      .then(resolve("berhasil"))
      .catch(reject("error"));
  });
}
export function NotifWarning(text) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Warning !!!",
      text: text,
      icon: "warning",
      position: "top-right",
      timer: 2000,
      showConfirmButton: false,
    })
      .then(resolve("berhasil"))
      .catch(reject("error"));
  });
}
export function ToastWarning(text) {
  return new Promise((resolve, reject) => {
    Toast.fire({
      icon: "warning",
      title: text,
    })
      .then(resolve("berhasil"))
      .catch(reject("error"));
  });
}

export function NotifInfo(text) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Informasi !!!",
      text: text,
      icon: "info",
      position: "top-right",
      timer: 2000,
      showConfirmButton: false,
    })
      .then(resolve("berhasil"))
      .catch(reject("error"));
  });
}
export function ToastInfo(text) {
  return new Promise((resolve, reject) => {
    Toast.fire({
      icon: "info",
      title: text,
    })
      .then(resolve("berhasil"))
      .catch(reject("error"));
  });
}

export const reactive = (err, kode, endpoint, data, endpointUpdate) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Oopps..",
      text: err.response.data,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Re-Activate",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosMasterPut(endpoint + kode, data)
          .then(() =>
            AxiosMasterPut(endpointUpdate + kode, data)
              .then(() => resolve("Berhasil"))
              .then(() =>
                NotifSucces("Data Berhasil Dikembalikan").catch((err) =>
                  reject(err)
                )
              )
          )
          .then(() => NotifSucces("Data Berhasil Dikembalikan"))
          .then(() => resolve("Berhasil"))
          .catch((err) => reject(err));
      }
    });
  });
};

export const ReanderField = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  autoFocus,
  ref,
  loading,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    {loading ? (
      <SkeletonLoading />
    ) : (
      <input
        {...input}
        type={type}
        ref={ref}
        autoFocus={autoFocus}
        className="form-control"
        readOnly={readOnly}
        placeholder={placeholder}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault(); //<===== This stops the form from being submitted
          } else {
          }
        }}
      />
    )}
    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);
export const ReanderFieldInline = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div className="form-group row">
    <label htmlFor="" className="text-black col-form-label col-md-3">
      {label}
    </label>
    <div className="col-lg-9">
      <input
        {...input}
        type={type}
        className="form-control"
        readOnly={readOnly}
        placeholder={placeholder}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
      />
      {touched &&
        ((error && (
          <ul className="parsley-errors-list filled">
            <li className="parsley-required"> {error}.</li>
          </ul>
        )) ||
          (warning && <p>{warning}</p>))}
    </div>
  </div>
);
export const ReanderSelectInline = ({
  input,
  label,
  readOnly,
  placeholder,
  options,
  getOptions,
  value,
  disabled,
  meta: { touched, error, warning },
}) => (
  <div className="form-group row">
    <label htmlFor="" className="text-black col-form-label col-md-3">
      {label}
    </label>
    <div className="col-lg-9">
      <SelectSearch
        {...input}
        search
        disabled={readOnly}
        placeholder={placeholder}
        options={options}
        getOptions={getOptions}
      />
      {touched &&
        ((error && (
          <ul className="parsley-errors-list filled">
            <li className="parsley-required"> {error}.</li>
          </ul>
        )) ||
          (warning && <p>{warning}</p>))}
    </div>
  </div>
);
export const RenderCheckBox = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor=""></label>
    <div className="checkbox checkbox-css mt-3">
      <input
        type="checkbox"
        id={label}
        {...input}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      <label style={{ fontSize: 20 }} htmlFor={label}>
        {label}
      </label>
    </div>
  </div>
);

export const RenderFieldGroup = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  handleClick,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    <div class="input-group">
      <input
        {...input}
        type={type}
        className="form-control"
        readOnly={readOnly}
        placeholder={placeholder}
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault(); //<===== This stops the form from being submitted
          } else {
          }
        }}
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" onClick={handleClick}>
          <i className="fa fa-search mr-1"></i>
          Cari
        </button>
      </div>
    </div>
    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);

export const ReanderSelect = ({
  input,
  label,
  readOnly,
  placeholder,
  options,
  getOptions,
  emptyMessage,
  loading,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    {loading ? (
      <SkeletonLoading />
    ) : (
      <SelectSearch
        {...input}
        search
        disabled={readOnly}
        placeholder={placeholder}
        options={options}
        getOptions={getOptions}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        emptyMessage={emptyMessage}
      />
    )}

    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);
export const ReanderSelectMultiple = ({
  input,
  label,
  placeholder,
  options,
  disabled,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    <SelectSearch
      {...input}
      search
      multiple
      closeOnSelect={false}
      printOptions="on-focus"
      disabled={disabled}
      placeholder={placeholder}
      options={options}
    />

    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);
export const RenderTime = ({
  input,
  label,
  placeholder,
  options,
  disabled,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    <DateTime dateFormat={false} inputProps={{ placeholder: placeholder }} />

    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);

export const deleteLocalItemBarcode = (nama, kode_barcode) => {
  let data = JSON.parse(localStorage.getItem(nama)) || [];
  let hasil = data.findIndex((item) => item.kode_barcode === kode_barcode);
  data.splice(hasil, 1);
  localStorage.setItem(nama, JSON.stringify(data) || []);
};

export const getUserData = () => {
  let data = JSON.parse(localStorage.getItem("userdata")) || [];
  return data;
};
