//Mendaftarkan reducer / Menggabungkan
import { combineReducers } from "redux";
import datamaster from "./datamaster";
import stocking from "./stocking";
import transaksi from "./transaksi";
import supervisor from "./supervisor";
import member from "./member";
import sw from "./sw";
import { reducer as formReducer } from "redux-form";
export default combineReducers({
  datamaster,
  stocking,
  transaksi,
  supervisor,
  sw,
  member,
  form: formReducer,
});
