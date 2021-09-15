import {
  GET_DATA_USER,
  GET_STOCK_OPNAME_LIST,
} from "../actions/supervisor_action";

const initialState = {
  listuser: false,
  liststockopname: false,
};

const supervisory = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_DATA_USER:
      return {
        ...state,
        listuser: actions.payload.data,
      };
    case GET_STOCK_OPNAME_LIST:
      return {
        ...state,
        liststockopname: actions.payload.data,
      };
    default:
      return state;
  }
};

export default supervisory;
