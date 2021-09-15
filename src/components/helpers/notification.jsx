import Swal from "sweetalert2";
import {putData } from "../../config/axios";
// import Select from "react-select";


export function NotifSucces(text) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      // title: 'Good Job',
      text: text,
      icon: "success",
      position: "top-center",
      timer: 2000,
      width: "300px",
      height: "100px",
      showConfirmButton: false,
    })
      .then(resolve("berhasil"))
      .catch(reject("error"));
  });
}
export function NotifError(text) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Oopss!!",
      text: text,
      icon: "error",
      position: "top-center",
      timer: 3000,
      showConfirmButton: false,
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
export function NotifReactif(err,endpoint,kode,data) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Warning !!!",
      text: err.response.data,
      icon: "info",
      position: "top-center",
      cancelButtonText: "Batal",
      showCancelButton: true,
      confirmButtonText: "Aktifkan",
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        putData(endpoint+kode,data).then(()=>resolve('Berhasil')).then(()=>NotifSucces('Berhasil')).catch()
      }
    } )
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

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
export function ToastNotification(status,text) {
  return new Promise((resolve, reject) => {
    Toast.fire({
      icon: status,
      title: text
    })
    .then(() => resolve('berhasil'))
    .catch(reject("error"));
  })
}
