import {
  EDIT_BANK,
  EDIT_BARANG,
  EDIT_CUSTOMER,
  EDIT_DIVISI,
  EDIT_GUDANG,
  EDIT_HARGA_SERVICE,
  EDIT_JENIS,
  EDIT_JENIS_KUNCI,
  EDIT_KATEGORI,
  EDIT_KATEGORI_SERVICE,
  EDIT_KENDARAAN,
  EDIT_KUNCI,
  EDIT_KWALITAS,
  EDIT_MERK_BARANG,
  EDIT_PARAMETER,
  EDIT_RAK,
  EDIT_SALES,
  EDIT_SATUAN,
  EDIT_SELFING,
  EDIT_SUPPLIER,
  EDIT_UKURAN,
  EDIT_WARNA,
  FINISHPROGRESS,
  GET_BANK,
  GET_BARANG,
  GET_CUSTOMER,
  GET_DISKON,
  GET_DIVISI,
  GET_FAKTUR,
  GET_GUDANG,
  GET_HARGA_SERVICE,
  GET_ID_BARANG,
  GET_JENIS,
  GET_JENIS_KUNCI,
  GET_KATEGORI,
  GET_KATEGORI_SERVICE,
  GET_KENDARAAN,
  GET_KUNCI,
  GET_KWALITAS,
  GET_MERK_BARANG,
  GET_NOPOL_CUSTOMER,
  GET_PARAMETER,
  GET_RAK,
  GET_SALES,
  GET_SATUAN,
  GET_SELFING,
  GET_SUPPLIER,
  GET_UKURAN,
  GET_WARNA,
  HIDE_MODAL,
  ONPROGRESS,
  SHOW_MODAL,
  GET_INFO_BARANG,
} from "../actions/datamaster_action";

const initialState = {
  noFaktur: false,
  modalDialog: false,
  dataKategori: false,
  listkategori: [],
  datajenis: false,
  listjenis: [],
  onSend: false,
  datakendaraan: false,
  listkendaraan: [],
  datamerkbarang: false,
  listmerkbarang: false,
  datagudang: false,
  listgudang: [],
  datarak: false,
  listrak: false,
  dataselfing: false,
  listselfing: false,
  datasatuan: false,
  listsatuan: [],
  datakwalitas: false,
  listkwalitas: false,
  datajeniskunci: false,
  listjeniskunci: false,
  datakunci: false,
  listkunci: false,
  databank: false,
  listbank: [],
  dataparameter: false,
  listparameter: [],
  datakategoriservice: false,
  listkategoriservice: [],
  datahargaservice: false,
  listhargaservice: false,
  datadivisi: false,
  listdivisi: false,
  datasales: false,
  listsales: [],
  databarang: false,
  listbarang: [],
  idbarang: false,
  datacustomer: false,
  listcustomer: [],
  listNopol: [],
  datasupplier: false,
  listsupplier: [],
  datawarna: false,
  listwarna: [],
  dataukuran: false,
  listukuran: [],
  listDiskon: [],
  listInfoBarang: [],
  datainfobarang: false,
};

const datamaster = (state = initialState, actions) => {
  switch (actions.type) {
    // Modal
    case HIDE_MODAL:
      return {
        ...state,
        modalDialog: actions.payload.data,
      };
    case SHOW_MODAL:
      return {
        ...state,
        modalDialog: actions.payload.data,
      };
    //End Modal
    // Kategori
    case EDIT_KATEGORI:
      return {
        ...state,
        datakategori: actions.payload.data,
      };
    case GET_KATEGORI:
      return {
        ...state,
        listkategori: actions.payload.data,
      };
    // End Kategori
    // Jenis
    case EDIT_JENIS:
      return {
        ...state,
        datajenis: actions.payload.data,
      };
    case GET_JENIS:
      return {
        ...state,
        listjenis: actions.payload.data,
      };
    // End Jenis
    // ONSEND PROCES
    case ONPROGRESS:
      return {
        ...state,
        onSend: actions.payload.data,
      };
    case FINISHPROGRESS:
      return {
        ...state,
        onSend: actions.payload.data,
      };
    // kendaraan
    case EDIT_KENDARAAN:
      return {
        ...state,
        datakendaraan: actions.payload.data,
      };
    case GET_KENDARAAN:
      return {
        ...state,
        listkendaraan: actions.payload.data,
      };
    // barang
    case EDIT_MERK_BARANG:
      return {
        ...state,
        datamerkbarang: actions.payload.data,
      };
    case GET_MERK_BARANG:
      return {
        ...state,
        listmerkbarang: actions.payload.data,
      };
    // gudang
    case EDIT_GUDANG:
      return {
        ...state,
        datagudang: actions.payload.data,
      };
    case GET_GUDANG:
      return {
        ...state,
        listgudang: actions.payload.data,
      };
    // rak
    case EDIT_RAK:
      return {
        ...state,
        datarak: actions.payload.data,
      };
    case GET_RAK:
      return {
        ...state,
        listrak: actions.payload.data,
      };
    // gudang
    case EDIT_SELFING:
      return {
        ...state,
        dataselfing: actions.payload.data,
      };
    case GET_SELFING:
      return {
        ...state,
        listselfing: actions.payload.data,
      };
    // Satuan
    case EDIT_SATUAN:
      return {
        ...state,
        datasatuan: actions.payload.data,
      };
    case GET_SATUAN:
      return {
        ...state,
        listsatuan: actions.payload.data,
      };
    // kwalitas
    case EDIT_KWALITAS:
      return {
        ...state,
        datakwalitas: actions.payload.data,
      };
    case GET_KWALITAS:
      return {
        ...state,
        listkwalitas: actions.payload.data,
      };
    // Jenis kunci
    case EDIT_JENIS_KUNCI:
      return {
        ...state,
        datajeniskunci: actions.payload.data,
      };
    case GET_JENIS_KUNCI:
      return {
        ...state,
        listjeniskunci: actions.payload.data,
      };
    // kunci
    case EDIT_KUNCI:
      return {
        ...state,
        datakunci: actions.payload.data,
      };
    case GET_KUNCI:
      return {
        ...state,
        listkunci: actions.payload.data,
      };
    // BANK
    case EDIT_BANK:
      return {
        ...state,
        databank: actions.payload.data,
      };
    case GET_BANK:
      return {
        ...state,
        listbank: actions.payload.data,
      };
    // PARAMETER
    case EDIT_PARAMETER:
      return {
        ...state,
        dataparameter: actions.payload.data,
      };
    case GET_PARAMETER:
      return {
        ...state,
        listparameter: actions.payload.data,
      };
    // KATEGORI SERVICE
    case EDIT_KATEGORI_SERVICE:
      return {
        ...state,
        datakategoriservice: actions.payload.data,
      };
    case GET_KATEGORI_SERVICE:
      return {
        ...state,
        listkategoriservice: actions.payload.data,
      };
    // HARGA SERVICE
    case EDIT_HARGA_SERVICE:
      return {
        ...state,
        datahargaservice: actions.payload.data,
      };
    case GET_HARGA_SERVICE:
      return {
        ...state,
        listhargaservice: actions.payload.data,
      };
    // DIVISI
    case EDIT_DIVISI:
      return {
        ...state,
        datadivisi: actions.payload.data,
      };
    case GET_DIVISI:
      return {
        ...state,
        listdivisi: actions.payload.data,
      };
    // SALES
    case EDIT_SALES:
      return {
        ...state,
        datasales: actions.payload.data,
      };
    case GET_SALES:
      return {
        ...state,
        listsales: actions.payload.data,
      };
    // BARANG
    case EDIT_BARANG:
      return {
        ...state,
        databarang: actions.payload.data,
      };
    case GET_BARANG:
      return {
        ...state,
        listbarang: actions.payload.data,
      };
    case GET_ID_BARANG:
      return {
        ...state,
        idbarang: actions.payload.data,
      };
      case GET_INFO_BARANG:
      return{
        ...state,
        listInfoBarang: actions.payload.data,
      }
    // CUSTOMER
    case EDIT_CUSTOMER:
      return {
        ...state,
        datacustomer: actions.payload.data,
      };
    case GET_CUSTOMER:
      return {
        ...state,
        listcustomer: actions.payload.data,
      };
    case GET_NOPOL_CUSTOMER:
      return {
        ...state,
        listNopol: actions.payload.data
      }
    // Supplier
    case EDIT_SUPPLIER:
      return {
        ...state,
        datasupplier: actions.payload.data,
      };
    case GET_SUPPLIER:
      return {
        ...state,
        listsupplier: actions.payload.data,
      };
    // Warna
    case EDIT_WARNA:
      return {
        ...state,
        datawarna: actions.payload.data,
      };
    case GET_WARNA:
      return {
        ...state,
        listwarna: actions.payload.data,
      };
    // Ukuran
    case EDIT_UKURAN:
      return {
        ...state,
        dataukuran: actions.payload.data,
      };
    case GET_UKURAN:
      return {
        ...state,
        listukuran: actions.payload.data,
      };
    case GET_FAKTUR:
      return {
        ...state,
        noFaktur: actions.payload.data,
      };
    case GET_DISKON:
      return {
        ...state,
        listDiskon: actions.payload.data,
      };
    default:
      return state;
  }
};

export default datamaster;
