import {
  GET_DATA_HADIAH,
  GET_DATA_MEMBER,
  GET_PARAMETER,
  SET_CUSTOMER_HADIAH,
  SET_DATA_HADIAH,
  SET_DATA_MEMBER,
} from "../actions/member_action";

const initialState = {
  listmember: [],
  listEdit: [],
  listhadiah: [],
  hadiahEdit: [],
  parameter: [],
  customerpilihan: "",
};

const member = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_DATA_MEMBER:
      return {
        ...state,
        listmember: actions.payload.data,
      };
    case GET_DATA_HADIAH:
      return {
        ...state,
        listhadiah: actions.payload.data,
      };
    case SET_DATA_MEMBER:
      return {
        ...state,
        listEdit: actions.payload.data,
      };
    case SET_DATA_HADIAH:
      return {
        ...state,
        hadiahEdit: actions.payload.data,
      };
    case SET_CUSTOMER_HADIAH:
      return {
        ...state,
        customerpilihan: actions.payload.data,
      };
    case GET_PARAMETER:
      return {
        ...state,
        parameter_rupiah: actions.payload.rupiah,
        parameter_poin: actions.payload.poin,
      };
    default:
      return state;
  }
};

export default member;
