import { AxiosMasterGet } from "../axios";

export const GET_DATA_MEMBER = "GET_DATA_MEMBER";
export const GET_DATA_HADIAH = "GET_DATA_HADIAH";
export const SET_DATA_MEMBER = "SET_DATA_MEMBER";
export const GET_PARAMETER = "GET_PARAMETER";
export const SET_DATA_HADIAH = "SET_DATA_HADIAH";
export const SET_CUSTOMER_HADIAH = "SET_CUSTOMER_HADIAH";

export const getListMember = () => {
  return (dispatch) => {
    AxiosMasterGet("member/get-member-all")
      .then((res) =>
        dispatch({
          type: GET_DATA_MEMBER,
          payload: {
            data: res.data,
          },
        })
      )
      .catch((err) => console.log(err));
  };
};
export const getParameter = () => {
  return (dispatch) => {
    AxiosMasterGet("member/get-parameter-poin")
      .then((res) =>
        dispatch({
          type: GET_PARAMETER,
          payload: {
            rupiah: res.data[0].rupiah,
            poin: res.data[0].poin,
          },
        })
      )
      .catch((err) => console.log(err));
  };
};
export const getListHadiah = () => {
  return (dispatch) => {
    AxiosMasterGet("hadiah/get-hadiah-all")
      .then((res) =>
        dispatch({
          type: GET_DATA_HADIAH,
          payload: {
            data: res.data,
          },
        })
      )
      .catch((err) => console.log(err));
  };
};

export const setListMember = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_DATA_MEMBER,
      payload: {
        data: data,
      },
    });
  };
};
export const setListHadiah = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_DATA_HADIAH,
      payload: {
        data: data,
      },
    });
  };
};
export const pilihcustomer = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_CUSTOMER_HADIAH,
      payload: {
        data: data,
      },
    });
  };
};
