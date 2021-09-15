import { getData } from "../config/axios";

//Terima Barang
export const GET_NO_KIRIM = "GET_NO_KIRIM";
export const SHOW_MODAL_TERIMA_BARANG = "SHOW_MODAL_TERIMA_BARANG";


//Terima Barang

export const ShowModalTerimaBarang = (data) => {
    return (dispatch) => {
      dispatch({
        type: SHOW_MODAL_TERIMA_BARANG,
        payload: {
          data: data,
        },
      });
    };
  };
export const getNokirim = (data) => {
    return (dispatch) => {
        getData('kirimbarang/get/nokirim').then((res) => {
            dispatch({
                type: GET_NO_KIRIM,
                payload: {
                    data: res.data
                }
            })   
        }).catch((err) => {
            console.log(err);
        })
    }
  }