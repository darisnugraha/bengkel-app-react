export const SW_INIT = "SW_INIT";
export const SW_UPDATE = "SW_UPDATE";

export const sw_init = () => {
  return (dispatch) => {
    dispatch({
      type: SW_INIT,
      payload: {
        data: true,
      },
    });
  };
};
export const sw_update = (hasil) => {
  return (dispatch) => {
    dispatch({
      type: SW_UPDATE,
      payload: {
        data: true,
        reg: hasil,
      },
    });
  };
};
