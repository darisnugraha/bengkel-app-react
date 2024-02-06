import { change } from "redux-form";
import { AxiosMasterGet } from "../axios";

export const GET_PERMINTAAN_TEMP = "GET_PERMINTAAN_TEMP";
export const GET_HANCUR_BARANG_TEMP = "GET_HANCUR_BARANG_TEMP";
export const GET_KUNCI_BARANG_TEMP = "GET_KUNCI_BARANG_TEMP";
export const GET_KONVERSI_BARANG_TEMP = "GET_KONVERSI_BARANG_TEMP";
export const GET_PENGELUARAN_BARANG_TEMP = "GET_PENGELUARAN_BARANG_TEMP";
export const GET_TAMBAH_STOCK_TEMP = "GET_TAMBAH_STOCK_TEMP";
export const GET_LIST_PENGELUARAN_BARANG = "GET_LIST_PENGELUARAN_BARANG";
export const GET_PENGELUARAN_BARANG_SELECTED =
  "GET_PENGELUARAN_BARANG_SELECTED";
export const GET_RETUR_BARANG_TIDAK_JADI_JUAL_TEMP =
  "GET_RETUR_BARANG_TIDAK_JADI_JUAL_TEMPGET";
export const GET_NO_TAMBAH_STOCK = "GET_NO_TAMBAH_STOCK";
export const GET_NO_KONVERSI = "GET_NO_KONVERSI";
export const GET_NO_EDIT_SERVICE = "GET_NO_EDIT_SERVICE";
export const GET_NO_HANCUR = "GET_NO_HANCUR";
export const GET_NO_PERMINTAAN_BARANG = "GET_NO_PERMINTAAN_BARANG";
export const GET_NO_PENGELUARAN_BARANG = "GET_NO_PENGELUARAN_BARANG";
export const GET_NO_KIRIM_SERVICE_LUAR = "GET_NO_KIRIM_SERVICE_LUAR";

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

export const getNoTambahStock = () => {
  return (dispatch) => {
    AxiosMasterGet("import-barang/generate/no-trx").then((res) => {
      dispatch(
        change("permintaanBarang", "no_tambah", res.data[0].no_import_barang)
      );
      return dispatch({
        type: GET_NO_TAMBAH_STOCK,
        payload: {
          data: res.data[0].no_import_barang,
        },
      });
    });
  };
};

export const getNoHancur = () => {
  return (dispatch) => {
    AxiosMasterGet("hancur-barang/generate/no-trx").then((res) => {
      dispatch(change("hancurBarang", "no_hancur", res.data[0].no_hancur));
      return dispatch({
        type: GET_NO_HANCUR,
        payload: {
          data: res.data[0].no_hancur,
        },
      });
    });
  };
};
export const getNoKonversi = () => {
  return (dispatch) => {
    AxiosMasterGet("konversi-barang/generate/no-trx").then((res) => {
      dispatch(change("konversiBarang", "no_konversi", res.data[0].no_pindah));
      return dispatch({
        type: GET_NO_KONVERSI,
        payload: {
          data: res.data[0].no_pindah,
        },
      });
    });
  };
};
export const getNoEditService = () => {
  return (dispatch) => {
    AxiosMasterGet("edit-service/generate/no-trx").then((res) => {
      dispatch(
        change("editServiceBarang", "no_edit_service", res.data.no_edit_service)
      );
      return dispatch({
        type: GET_NO_EDIT_SERVICE,
        payload: {
          data: res.data.no_edit_service,
        },
      });
    });
  };
};
export const getNoPermintaanBarang = () => {
  return (dispatch) => {
    AxiosMasterGet("permintaan-barang/generate/no-trx").then((res) => {
      dispatch(
        change("permintaanBarang", "no_permintaan", res.data[0].no_permintaan)
      );
      return dispatch({
        type: GET_NO_PERMINTAAN_BARANG,
        payload: {
          data: res.data[0].no_permintaan,
        },
      });
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
  return (dispatch) => {
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
