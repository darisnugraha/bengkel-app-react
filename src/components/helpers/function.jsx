import { reset } from "redux-form";
import { NotifError, NotifReactif } from "./notification";

export const getToday = () => {
  return (
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2)
  );
};

export const getNextDay = () => {
  return (
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 5)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2)
  );
};


export const localStorageencryp = (nama,data) => {
 localStorage.setItem(encryptascii(nama),encryptascii(data))
}
export const localStoragedecryp = (nama) => {
  return decryptascii(localStorage.getItem(encryptascii(nama)))
 }
export const ErrorHandling = (
  err = "",
  endpoint,
  kode,
  data,
  dispatch,
  table,
  hideModal,
  modalReset
) => {
  return new Promise((resolve, reject) => {
    let response =
      err.response === undefined
        ? "Koneksi Bermasalah"
        : err.response.data || "";
    let check = response.includes("DELETED");
    check
      ? NotifReactif(err, endpoint, kode, data)
          .then(() => {
            dispatch(table);
          })
          .then(() => {
            dispatch(hideModal);
          })
          .then(() => {
            dispatch(reset(modalReset));
          })
          .then(resolve("berhasil"))
          .catch(reject("error"))
      : NotifError(
          err.response === undefined ? "Koneksi Bermasalah" : err.response.data
        )
          .then(resolve("berhasil"))
          .catch(reject("error"));
  });
};

export const encryptascii = (str) => {
  let key = process.env.REACT_APP_ENCKEY;
  let isencryt = process.env.REACT_APP_IS_ENCRYPT;

  let dataKey = {};
  for (let i = 0; i < key.length; i++) {
    dataKey[i] = key.substr(`${i}`, 1);
  }

  let strEnc = "";
  let nkey = 0;
  let jml = str.length;

  for (let i = 0; i < parseInt(jml); i++) {
    strEnc =
      strEnc + hexEncode(str[i].charCodeAt(0) + dataKey[nkey].charCodeAt(0));

    if (nkey === Object.keys(dataKey).length - 1) {
      nkey = 0;
    }
    nkey = nkey + 1;
  }
    return isencryt==="true" ?  strEnc.toUpperCase() : str;
};

export const decryptascii = (str) => {
  let isencryt = process.env.REACT_APP_IS_ENCRYPT;
  if(str!==null){
  let key = process.env.REACT_APP_ENCKEY;
  let dataKey = {};
  for (let i = 0; i < key.length; i++) {
    dataKey[i] = key.substr(`${i}`, 1);
  }

  let strDec = "";
  let nkey = 0;
  let jml = str.length;
  let i = 0;
  while (i < parseInt(jml)) {
    strDec =
      strDec + chr(hexdec(str.substr(i, 2)) - dataKey[nkey].charCodeAt(0));
    if (nkey === Object.keys(dataKey).length - 1) {
      nkey = 0;
    }
    nkey = nkey + 1;
    i = i + 2;
  }
    return isencryt==="true" ? strDec : str;
  }
};
export const hexEncode = (str) => {
  var result = "";
  result = str.toString(16);
  return result;
};

export const hexdec = (hex) => {
  var str = "";
  str = parseInt(hex, 16);
  return str;
};
export const chr = (asci) => {
  var str = "";
  str = String.fromCharCode(asci);
  return str;
};

export const formatDate = (date)=> {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
