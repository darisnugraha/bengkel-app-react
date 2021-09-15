import React from "react";
import Skeleton from "react-loading-skeleton";

export const getToday = () => {
  return (
    new Date().getFullYear() +
    "-" +
    ("0" + (new Date().getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + new Date().getDate()).slice(-2)
  );
};

export const encryptascii = (str) => {
  let key = process.env.REACT_APP_ENCKEY;
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
  return strEnc.toUpperCase();
};

export const decryptascii = (str) => {
  if (str !== null) {
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
    return strDec;
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

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const parseIsoDatetime = (dtstr) => {
  let hasil = dtstr.substr(0, 10);
  return hasil;
};

export const multipleDeleteLocal = (data = []) => {
  data.forEach((k) => {
    if (localStorage.getItem(k) !== null) {
      localStorage.removeItem(k);
      return true;
    } else {
      return false;
    }
  });
};

export const formatDateISO = (value) => {
  let pattern = "####-##-##";
  var i = 0,
    date = value.toString();
  return pattern.replace(/#/g, (_) => date[i++]);
};

export const SkeletonLoading = ({ label }) => (
  <div className="form-group">
    <label> {label} </label>
    <Skeleton className="form-control" />
  </div>
);
