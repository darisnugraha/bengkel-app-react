import {
  GET_HANCUR_BARANG_TEMP,
  GET_KONVERSI_BARANG_TEMP,
  GET_KUNCI_BARANG_TEMP,
  GET_LIST_PENGELUARAN_BARANG,
  GET_PENGELUARAN_BARANG_SELECTED,
  GET_PENGELUARAN_BARANG_TEMP,
  GET_PERMINTAAN_TEMP,
  GET_TAMBAH_STOCK_TEMP,
} from "../actions/stocking_action";

const initialState = {
  permintaan_temp: false,
  pengeluaran: false,
  pengeluaran_selected: false,
  konversi_temp: false,
  hancur_temp: false,
  kunci_temp: false,
  tambahStock_temp: [],
};

const stocking = (state = initialState, actions) => {
  switch (actions.type) {
    // Permintaan
    case GET_PERMINTAAN_TEMP:
      return {
        ...state,
        permintaan_temp: actions.payload.data,
      };
    case GET_PENGELUARAN_BARANG_TEMP:
      return {
        pengeluaran: actions.payload.data,
      };
    case GET_LIST_PENGELUARAN_BARANG:
      return {
        ...state,
        pengeluaran: actions.payload.data,
      };
    case GET_PENGELUARAN_BARANG_SELECTED:
      return {
        ...state,
        pengeluaran_selected: actions.payload.data,
      };
    case GET_KONVERSI_BARANG_TEMP:
      return {
        ...state,
        konversi_temp: actions.payload.data,
      };
    case GET_HANCUR_BARANG_TEMP:
      return {
        ...state,
        hancur_temp: actions.payload.data,
      };
    case GET_KUNCI_BARANG_TEMP:
      return {
        ...state,
        kunci_temp: actions.payload.data,
      };
    case GET_TAMBAH_STOCK_TEMP:
      return {
        ...state,
        tambahStock_temp: actions.payload.data,
      };
    default:
      return state;
  }
};

export default stocking;
