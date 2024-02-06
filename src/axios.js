import Axios from "axios";

const server = process.env.REACT_APP_BACKEND_URL;

export function AxiosMasterGet(endpoint, queryParams) {
  let config = {
    headers: { "x-auth-token": localStorage.getItem("token") },
    params: queryParams,
  };
  return new Promise((resolve, reject) => {
    Axios.get(server + endpoint, config)
      .then((res) => resolve(res))

      .catch((err) => {
        if (err.response) {
          if (err.response.status === 402) {
            localStorage.setItem("islogin", false);
            window.location.reload();
          } else {
            reject(err);
          }
        }
      });
  });
}

export function AxiosMasterPost(endpoint, data) {
  let config = {
    headers: { "x-auth-token": localStorage.getItem("token") },
  };
  return new Promise((resolve, reject) => {
    Axios.post(server + endpoint, data, config)
      .then((res) => resolve(res))

      .catch((err) => {
        if (err.response) {
          if (err.response.status === 402) {
            localStorage.setItem("islogin", false);

            window.location.reload();
          } else {
            reject(err);
          }
        }
      });
  });
}
export function AxiosMasterDelete(endpoint, data) {
  let config = {
    headers: { "x-auth-token": localStorage.getItem("token") },
  };
  return new Promise((resolve, reject) => {
    Axios.delete(server + endpoint, config)
      .then((res) => resolve(res))

      .catch((err) => {
        if (err.response) {
          if (err.response.status === 402) {
            localStorage.setItem("islogin", false);

            window.location.reload();
          } else {
            reject(err);
          }
        }
      });
  });
}
export function AxiosMasterPut(endpoint, data) {
  let config = {
    headers: { "x-auth-token": localStorage.getItem("token") },
  };
  return new Promise((resolve, reject) => {
    Axios.put(server + endpoint, data, config)
      .then((res) => resolve(res))

      .catch((err) => {
        if (err.response) {
          if (err.response.status === 402) {
            localStorage.setItem("islogin", false);

            window.location.reload();
          } else {
            reject(err);
          }
        }
      });
  });
}
