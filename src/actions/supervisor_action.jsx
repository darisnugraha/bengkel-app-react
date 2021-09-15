import { AxiosMasterGet } from "../axios";

export const GET_DATA_USER = "GET_DATA_USER";
export const GET_STOCK_OPNAME_LIST = "GET_STOCK_OPNAME_LIST";

export const getListUser = () => {
  return (dispatch) => {
    AxiosMasterGet("users/get/all")
      .then((res) =>
        dispatch({
          type: GET_DATA_USER,
          payload: {
            data: res.data,
          },
        })
      )
      .catch((err) => console.log(err));
  };
};
export const getListStockOpname = () => {
  let data = JSON.parse(localStorage.getItem("StockOpname_temp")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_STOCK_OPNAME_LIST,
      payload: {
        data: data,
      },
    });
  };
};
