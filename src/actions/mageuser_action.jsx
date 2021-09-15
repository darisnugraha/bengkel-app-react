
import { getData } from "../config/axios";

export const GET_DATA_USER = "GET_DATA_USER";
export const SHOW_TAMBAH_DATA_USER = "SHOW_TAMBAH_DATA_USER";

export const getDataUser = () => {
    return (dispatch) => {
        getData('users/get/all').then((res) => {
            dispatch({
                type: GET_DATA_USER,
                payload: {
                    data: res.data
                }
            })   
        }).catch((err) => {
             console.log(err);
         })
    }
}

export const ShowModalTambahUser = (data) => {
    return (dispatch) => {
      dispatch({
        type: SHOW_TAMBAH_DATA_USER,
        payload: {
          data: data,
        },
      });
    };
  };