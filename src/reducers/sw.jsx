import { SW_INIT, SW_UPDATE } from "../actions/sw_action";

const initialState = {
  serviceWorkerInitialized: false,
  serviceWorkerUpdated: false,
  serviceWorkerRegistration: null,
};

const sw = (state = initialState, actions) => {
  switch (actions.type) {
    case SW_INIT:
      return {
        ...state,
        serviceWorkerInitialized: actions.payload.data,
      };
    case SW_UPDATE:
      return {
        ...state,
        serviceWorkerUpdated: actions.payload.data,
        serviceWorkerRegistration: actions.payload.reg,
      };

    default:
      return state;
  }
};

export default sw;
