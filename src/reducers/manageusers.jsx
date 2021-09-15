import {
    GET_DATA_USER, SHOW_TAMBAH_DATA_USER,
  } from "../actions/mageuser_action";
  
  const initialState = {
    getDataUser: false,
    ShowModalTambahUser: false,
  };
  
  const manageusers = (state = initialState, actions) => {
      switch (actions.type) {
          case GET_DATA_USER:
              return {
                  ...state,
                  getDataUser: actions.payload.data,
              };
          case SHOW_TAMBAH_DATA_USER:
              return {
                ...state,
                ShowModalTambahUser: actions.payload.data,
              }
              default:
                return state;
            }
}
        
export default manageusers;