// import { getData } from "../config/axios";

import { AxiosMasterGet } from "../axios";
import uuid from "react-uuid";
import { NotifError } from "../components/notification/notification";

export const GET_FAKTUR = "GET_FAKTUR";
export const HIDE_MODAL = "HIDE_MODAL";
export const SHOW_MODAL = "SHOW_MODAL";
export const ONPROGRESS = "ONPROGRESS";
export const FINISHPROGRESS = "FINISHPROGRESS";
export const GET_KATEGORI = "GET_KATEGORI";
export const EDIT_KATEGORI = "EDIT_KATEGORI";
export const GET_JENIS = "GET_JENIS";
export const EDIT_JENIS = "EDIT_JENIS";
export const GET_KENDARAAN = "GET_KENDARAAN";
export const EDIT_KENDARAAN = "EDIT_KENDARAAN";
export const EDIT_MERK_BARANG = "EDIT_MERK_BARANG";
export const GET_MERK_BARANG = "GET_MERK_BARANG";
export const GET_GUDANG = "GET_GUDANG";
export const EDIT_GUDANG = "EDIT_GUDANG";
export const GET_RAK = "GET_RAK";
export const EDIT_RAK = "EDIT_RAK";
export const EDIT_SELFING = "EDIT_SELFING";
export const GET_SELFING = "GET_SELFING";
export const EDIT_SATUAN = "EDIT_SATUAN";
export const GET_SATUAN = "GET_SATUAN";
export const EDIT_KWALITAS = "EDIT_KWALITAS";
export const GET_KWALITAS = "GET_KWALITAS";
export const EDIT_JENIS_KUNCI = "EDIT_JENIS_KUNCI";
export const GET_JENIS_KUNCI = "GET_JENIS_KUNCI";
export const EDIT_KUNCI = "EDIT_KUNCI";
export const GET_KUNCI = "GET_KUNCI";
export const EDIT_BANK = "EDIT_BANK";
export const GET_BANK = "GET_BANK";
export const EDIT_PARAMETER = "EDIT_PARAMETER";
export const GET_PARAMETER = "GET_PARAMETER";
export const EDIT_KATEGORI_SERVICE = "EDIT_KATEGORI_SERVICE";
export const GET_KATEGORI_SERVICE = "GET_KATEGORI_SERVICE";
export const EDIT_HARGA_SERVICE = "EDIT_HARGA_SERVICE";
export const GET_HARGA_SERVICE = "GET_HARGA_SERVICE";
export const EDIT_DIVISI = "EDIT_DIVISI";
export const GET_DIVISI = "GET_DIVISI";
export const EDIT_SALES = "EDIT_SALES";
export const GET_SALES = "GET_SALES";
export const EDIT_BARANG = "EDIT_BARANG";
export const GET_BARANG = "GET_BARANG";
export const GET_ID_BARANG = "GET_ID_BARANG";
export const EDIT_CUSTOMER = "EDIT_CUSTOMER";
export const GET_CUSTOMER = "GET_CUSTOMER";
export const EDIT_SUPPLIER = "EDIT_SUPPLIER";
export const GET_SUPPLIER = "GET_SUPPLIER";
export const EDIT_WARNA = "EDIT_WARNA";
export const GET_WARNA = "GET_WARNA";
export const EDIT_UKURAN = "EDIT_UKURAN";
export const GET_UKURAN = "GET_UKURAN";
export const GET_DISKON = "GET_DISKON";
export const GET_NOPOL_CUSTOMER = "GET_NOPOL_CUSTOMER";
export const GET_LIST_BARANG = "GET_LIST_BARANG";
export const GET_INFO_BARANG = "GET_INFO_BARANG";
export const GET_SHELVING = "GET_SHELVING";

// Modal
export const hideModal = () => {
  return (dispatch) => {
    dispatch({
      type: HIDE_MODAL,
      payload: {
        data: false,
      },
    });
  };
};
export const showModal = () => {
  return (dispatch) => {
    dispatch({
      type: SHOW_MODAL,
      payload: {
        data: true,
      },
    });
  };
};
// End Modal
// GET NOTA
export const getFaktur = () => {
  var noFaktur = localStorage.getItem("noFaktur");
  if (noFaktur === null) {
    localStorage.setItem("noFaktur", uuid().toUpperCase());
  }
  return (dispatch) => {
    dispatch({
      type: GET_FAKTUR,
      payload: {
        data: localStorage.getItem("noFaktur"),
      },
    });
  };
};
//
// ONSEND PROCESS
export const onProgress = () => {
  return (dispatch) => {
    dispatch({
      type: ONPROGRESS,
      payload: {
        data: true,
      },
    });
  };
};
export const onFinish = () => {
  return (dispatch) => {
    dispatch({
      type: FINISHPROGRESS,
      payload: {
        data: false,
      },
    });
  };
};
// END ONSEND PROCESS

// Kategori

export const editKategori = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_KATEGORI,
      payload: {
        data: data,
      },
    });
  };
};
export const getKategori = (data) => {
  return (dispatch) => {
    AxiosMasterGet("kategori/get/all")
      .then((res) =>
        dispatch({
          type: GET_KATEGORI,
          payload: {
            data: res.data,
          },
        })
      )
      .catch((err) => NotifError(err.response.data));
  };
};

// End kategori

// Jenis
export const editJenis = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_JENIS,
      payload: {
        data: data,
      },
    });
  };
};
export const getJenis = (data) => {
  return (dispatch) => {
    AxiosMasterGet("jenis/get/all").then((res) =>
      dispatch({
        type: GET_JENIS,
        payload: {
          data: res.data,
        },
      })
    );
  };
};

// Kendaraan
export const editKendaraan = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_KENDARAAN,
      payload: {
        data: data,
      },
    });
  };
};
export const getKendaraan = (data) => {
  return (dispatch) => {
    AxiosMasterGet("merk-kendaraan/get/all").then((res) =>
      dispatch({
        type: GET_KENDARAAN,
        payload: {
          data: res.data,
        },
      })
    );
  };
};

// Barang
export const editMerkBarang = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_MERK_BARANG,
      payload: {
        data: data,
      },
    });
  };
};
export const getMerkBarang = (data) => {
  return (dispatch) => {
    AxiosMasterGet("merk-barang/get/all").then((res) =>
      dispatch({
        type: GET_MERK_BARANG,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
// Gudang
export const editGudang = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_GUDANG,
      payload: {
        data: data,
      },
    });
  };
};
export const getGudang = (data) => {
  return (dispatch) => {
    AxiosMasterGet("lokasi-gudang/get/all").then((res) =>
      dispatch({
        type: GET_GUDANG,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
// Rak
export const editRak = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_RAK,
      payload: {
        data: data,
      },
    });
  };
};
export const getRak = (data) => {
  return (dispatch) => {
    AxiosMasterGet("lokasi-rak/get/all").then((res) =>
      dispatch({
        type: GET_RAK,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
// Selfing
export const editSelfing = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SELFING,
      payload: {
        data: data,
      },
    });
  };
};
export const getSelfing = (data) => {
  return (dispatch) => {
    AxiosMasterGet("lokasi-selving/get/all").then((res) =>
      dispatch({
        type: GET_SELFING,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
// Satuan
export const editSatuan = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SATUAN,
      payload: {
        data: data,
      },
    });
  };
};
export const getSatuan = (data) => {
  return (dispatch) => {
    AxiosMasterGet("satuan/get/all").then((res) =>
      dispatch({
        type: GET_SATUAN,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
// Kwalitas
export const editKwalitas = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_KWALITAS,
      payload: {
        data: data,
      },
    });
  };
};
export const getKwalitas = (data) => {
  return (dispatch) => {
    AxiosMasterGet("kwalitas/get/all").then((res) =>
      dispatch({
        type: GET_KWALITAS,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
// Jenis Kunci
export const editJenisKunci = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_JENIS_KUNCI,
      payload: {
        data: data,
      },
    });
  };
};
export const getJenisKunci = (data) => {
  return (dispatch) => {
    AxiosMasterGet("jenis-kunci/get/all").then((res) =>
      dispatch({
        type: GET_JENIS_KUNCI,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  Kunci
export const editKunci = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_KUNCI,
      payload: {
        data: data,
      },
    });
  };
};
export const getKunci = (data) => {
  return (dispatch) => {
    AxiosMasterGet("kunci/get/all").then((res) =>
      dispatch({
        type: GET_KUNCI,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  Bank
export const editBank = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_BANK,
      payload: {
        data: data,
      },
    });
  };
};
export const getBank = (data) => {
  return (dispatch) => {
    AxiosMasterGet("bank/get/all").then((res) =>
      dispatch({
        type: GET_BANK,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  Parameter
export const editParameter = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_PARAMETER,
      payload: {
        data: data,
      },
    });
  };
};
export const getParameter = (data) => {
  return (dispatch) => {
    AxiosMasterGet("kategori-transaksi/get/all").then((res) =>
      dispatch({
        type: GET_PARAMETER,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  Kategori Service
export const editKategoriService = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_KATEGORI_SERVICE,
      payload: {
        data: data,
      },
    });
  };
};
export const getKategoriService = (data) => {
  return (dispatch) => {
    AxiosMasterGet("kategori-service/get/all").then((res) =>
      dispatch({
        type: GET_KATEGORI_SERVICE,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  Harga Service
export const editHargaService = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_HARGA_SERVICE,
      payload: {
        data: data,
      },
    });
  };
};
export const getHargaService = (data) => {
  return (dispatch) => {
    AxiosMasterGet().then((res) =>
      dispatch({
        type: GET_HARGA_SERVICE,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  DIVISI
export const editDivisi = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_DIVISI,
      payload: {
        data: data,
      },
    });
  };
};
export const getDivisi = (data) => {
  return (dispatch) => {
    AxiosMasterGet("divisi/get/all").then((res) =>
      dispatch({
        type: GET_DIVISI,
        payload: {
          data: res.data,
        },
      })
    );
  };
};

export const getListBarangCari = (data) => {
  return (dispatch) => {
    AxiosMasterGet("barang/get/all").then((res) =>
      dispatch({
        type: GET_LIST_BARANG,
        payload: {
          data: res.data,
        },
      })
    );
  };
};

//SHELVING
export const getShelving = () => {
  return (dispatch) => {
    console.log("GET SHELVING");
    AxiosMasterGet("lokasi-selving/get/all").then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_SHELVING,
        payload: {
          data: res.data,
        },
      })
    }
    );
  };
};

export const getInfoBarang = (data) => {
  return (dispatch) => {
    AxiosMasterGet("/barang/get/info/all").then((res) =>
      dispatch({
        type: GET_INFO_BARANG,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  SALES
export const editSales = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SALES,
      payload: {
        data: data,
      },
    });
  };
};
export const getSales = (data) => {
  return (dispatch) => {
    AxiosMasterGet("pegawai/get/all").then((res) =>
      dispatch({
        type: GET_SALES,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  Baranag
export const editBarang = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_BARANG,
      payload: {
        data: data,
      },
    });
  };
};
export const getBarang = (data) => {
  return (dispatch) => {
    AxiosMasterGet("barang/get/all").then((res) =>
      dispatch({
        type: GET_BARANG,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
export const getIDBarang = (data) => {
  return (dispatch) => {
    AxiosMasterGet("barang/get/generate").then((res) =>
      dispatch({
        type: GET_ID_BARANG,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  Customer
export const editCustomer = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_CUSTOMER,
      payload: {
        data: data,
      },
    });
  };
};
export const getCustomer = (data) => {
  return (dispatch) => {
    AxiosMasterGet("customer/get/all").then((res) =>
      dispatch({
        type: GET_CUSTOMER,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
export const getNopolCustomer = (data) => {
  return (dispatch) => {
    AxiosMasterGet("customer/get/all").then((res) =>
      dispatch({
        type: GET_NOPOL_CUSTOMER,
        payload: {
          data: res.data.nopol_kendaraan,
        },
      })
    );
  };
};
//  SUPPLIER
export const editSupplier = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SUPPLIER,
      payload: {
        data: data,
      },
    });
  };
};
export const getSupplier = (data) => {
  return (dispatch) => {
    AxiosMasterGet("supplier/get/all").then((res) => {
      dispatch({
        type: GET_SUPPLIER,
        payload: {
          data: res.data,
        },
      })
    }
    );
  };
};
//  WARNA
export const editWarna = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_WARNA,
      payload: {
        data: data,
      },
    });
  };
};
export const getWarna = (data) => {
  return (dispatch) => {
    AxiosMasterGet("warna/get/all").then((res) =>
      dispatch({
        type: GET_WARNA,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  UKURAN
export const editUkuran = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_UKURAN,
      payload: {
        data: data,
      },
    });
  };
};
export const getUkuran = (data) => {
  return (dispatch) => {
    AxiosMasterGet("ukuran/get/all").then((res) =>
      dispatch({
        type: GET_UKURAN,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
//  UKURAN
export const getDiskon = (data) => {
  return (dispatch) => {
    AxiosMasterGet("kategori/get/all").then((res) =>
      dispatch({
        type: GET_DISKON,
        payload: {
          data: res.data,
        },
      })
    );
  };
};
