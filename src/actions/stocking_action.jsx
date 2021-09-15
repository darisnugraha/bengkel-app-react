import { AxiosMasterGet } from "../axios";

export const GET_PERMINTAAN_TEMP = "GET_PERMINTAAN_TEMP";
export const GET_HANCUR_BARANG_TEMP = "GET_HANCUR_BARANG_TEMP";
export const GET_KUNCI_BARANG_TEMP = "GET_KUNCI_BARANG_TEMP";
export const GET_KONVERSI_BARANG_TEMP = "GET_KONVERSI_BARANG_TEMP";
export const GET_PENGELUARAN_BARANG_TEMP = "GET_PENGELUARAN_BARANG_TEMP";
export const GET_TAMBAH_STOCK_TEMP = "GET_TAMBAH_STOCK_TEMP";
export const GET_LIST_PENGELUARAN_BARANG = "GET_LIST_PENGELUARAN_BARANG";
export const GET_PENGELUARAN_BARANG_SELECTED = "GET_PENGELUARAN_BARANG_SELECTED";
export const GET_RETUR_BARANG_TIDAK_JADI_JUAL_TEMP ="GET_RETUR_BARANG_TIDAK_JADI_JUAL_TEMPGET";

// Modal
export const getPermintaanTemp = () => {
  let data = JSON.parse(localStorage.getItem("PermintaanBarang_temp")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_PERMINTAAN_TEMP,
      payload: {
        data: data,
      },
    });
  };
};
export const getKonversiTemp = () => {
  let data = JSON.parse(localStorage.getItem("KonversiBarang_temp")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_KONVERSI_BARANG_TEMP,
      payload: {
        data: data,
      },
    });
  };
};
export const getHancurTemp = () => {
  let data = JSON.parse(localStorage.getItem("HancurBarang_temp")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_HANCUR_BARANG_TEMP,
      payload: {
        data: data,
      },
    });
  };
};
export const getTambahStockTemp = () => {
  let data = JSON.parse(localStorage.getItem("TambahBarang_temp")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_TAMBAH_STOCK_TEMP,
      payload: {
        data: data,
      },
    });
  };
};
export const getKunciBarang = () => {
  let data = JSON.parse(localStorage.getItem("KunciBarang_temp")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_KUNCI_BARANG_TEMP,
      payload: {
        data: data,
      },
    });
  };
};
export const getListPengeluaranBarang = () => {
  let data = JSON.parse(localStorage.getItem("pengeluaran_barang")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_LIST_PENGELUARAN_BARANG,
      payload: {
        data: data,
      },
    });
  };
};

export const getPengeluaranBarang = (kode) => {
  return (dispatch) => {
    AxiosMasterGet("pengeluaran-barang/get/FakturByNoPermintaan/" + kode)
      .then((res) => {
        let data = res.data;
        let arrayBaru = [];
        for (let i = 0; i < data.length; i++) {
          arrayBaru.push(data[i].detail);
        }
        localStorage.setItem("pengeluaran_barang", JSON.stringify(arrayBaru));
        dispatch({
          type: GET_PENGELUARAN_BARANG_TEMP,
          payload: {
            data: JSON.parse(localStorage.getItem("pengeluaran_barang")) || [],
          },
        });
      })
      .catch((err) => console.log(err));
  };
};

// export const getReturBarang = (kode) => {
//   return (dispatch) => {
//     AxiosMasterGet("daftar-service/get/getDataServiceAllActive/" + kode)
//       .then((res) => {
//         let data = res.data;
//         let arrayBaru = [];
//         for (let i = 0; i < data.length; i++) {
//           arrayBaru.push(data[i].detail);
//         }
//         localStorage.setItem("retur_barang", JSON.stringify(arrayBaru));
//         dispatch({
//           type: GET_RETUR_BARANG_TIDAK_JADI_JUAL_TEMP,
//           payload: {
//             data: JSON.parse(localStorage.getItem("pengeluaran_barang")) || [],
//           },
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };
export const getPengeluaranBarangSelected = () => {
  let data = JSON.parse(localStorage.getItem("FakturTerpilih_detail")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_PENGELUARAN_BARANG_SELECTED,
      payload: {
        data: data,
      },
    });
  };
};
export const getReturBarangTidakJadi = () => {
  let data = JSON.parse(localStorage.getItem("FakturTerpilih_detail")) || [];
  return(dispatch) => {
    dispatch({
      type: GET_RETUR_BARANG_TIDAK_JADI_JUAL_TEMP,
      payload: {
        data: data,
      },
    });
  };
};

// export const getPengeluaranBarang = (kode) => {
//   return (dispatch) => {
//     AxiosMasterGet("pengeluaran-barang/get/FakturByNoPermintaan/" + kode)
//       .then((res) =>
//         dispatch({
//           type: GET_PENGELUARAN_BARANG_TEMP,
//           payload: {
//             data: res.data,
//           },
//         })
//       )
//       .catch((err) => console.log(err));
//   };
// };
