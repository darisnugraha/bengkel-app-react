import axios from "axios";

// const server = process.env.REACT_APP_BACKEND_URL_DEMO;
const server = process.env.REACT_APP_BACKEND_URL;

export function getData(enpoint, data, token) {
  return new Promise((resolve, reject) => {
    axios
      .get(server + enpoint)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
export function postData(enpoint, data, token) {
  return new Promise((resolve, reject) => {
    axios
      .post(server + enpoint, data, { headers: token })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function putData(enpoint, data, token) {
  return new Promise((resolve, reject) => {
    axios
      .put(server + enpoint, data, { headers: token })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
export function deleteData(enpoint, params, token) {
  return new Promise((resolve, reject) => {
    axios
      .delete(server + enpoint, params)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
