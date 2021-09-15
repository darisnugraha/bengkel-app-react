import { GET_NO_KIRIM, SHOW_MODAL_TERIMA_BARANG } from "../actions/databarang_action";

const initialState = {
    getNokirim:false,
    ShowModalTerimaBarang:false,
}

const databarang = (state = initialState, actions) => {
    switch (actions.type) {
        case SHOW_MODAL_TERIMA_BARANG:
            return {
                ...state,
                ShowModalTerimaBarang: actions.payload.data,
            };
        case GET_NO_KIRIM:
            return {
                ...state,
                getNokirim: actions.payload.data,
            };
        default:
            return state;
        }
}
export default databarang;