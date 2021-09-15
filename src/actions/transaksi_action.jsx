import { AxiosMasterGet } from "../axios";

export const GET_LIST_BAYAR_SERVICE = "GET_LIST_BAYAR_SERVICE";
export const GET_LIST_TERIMA_SUPPLIER = "GET_LIST_TERIMA_SUPPLIER";
export const GET_LIST_RETURN_SUPPLIER = "GET_LIST_RETURN_SUPPLIER";
export const GET_LIST_BARANG_RONGSOK = "GET_LIST_BARANG_RONGSOK";
export const SET_PEMBAYARAN_SUPPLIER = "SET_PEMBAYARAN_SUPPLIER";
export const GET_LIST_PEMBAYARAN_TEMP = "GET_LIST_PEMBAYARAN_TEMP";
export const GET_LIST_BARANG_SPAREPART_TEMP = "GET_LIST_BARANG_SPAREPART_TEMP";
export const GET_LIST_PIUTANG_CUSTOMER = "GET_LIST_PIUTANG_CUSTOMER";
export const SET_TOTAL_PIUTANG_CUSTOMER = "SET_TOTAL_PIUTANG_CUSTOMER";
export const GET_LIST_SERVICE = "GET_LIST_SERVICE";
export const GET_LIST_BARANG_BAYAR = "GET_LIST_BARANG_BAYAR";
export const GET_LIST_BARANG_PEMBAYARAN = "GET_LIST_BARANG_PEMBAYARAN";
export const GET_LIST_BARANG_KIRIM_SERVICE = "GET_LIST_BARANG_KIRIM_SERVICE";
export const GET_LIST_KIRIM_SERVICE_LUAR = "GET_LIST_KIRIM_SERVICE_LUAR";
export const SET_GRAND_TOTAL = "SET_GRAND_TOTAL";
export const SET_BARANG_JASA = "SET_BARANG_JASA";
export const GET_PROGRESS = "GET_PROGRESS";
export const GET_LIST_BARANG_KOMPLAIN = "GET_LIST_BARANG_KOMPLAIN";
export const GET_LIST_BARANG_RETUR_SPL = "GET_LIST_BARANG_RETUR_SPL";

export const getListBarangReturSupplier =() => {
  let data = JSON.parse(localStorage.getItem("ListBarangSPL")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG_RETUR_SPL,
      payload: {
        data: data,
      },
    });
  };
}

export const getListTerimaSupplier = () => {
  let data = JSON.parse(localStorage.getItem("PenerimaanSupplier_temp")) || [];
  let total =
    data !== []
      ? data.map((data) => data.total).reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_TERIMA_SUPPLIER,
      payload: {
        data: data,
        sub_total: total,
      },
    });
  };
};
export const getListService = () => {
  let data = JSON.parse(localStorage.getItem("list_service_daftar_temp")) || [];
  let sparepart = [];
  let barang = [];
  data.map((list, index) =>
    index % 2 === 0 ? sparepart.push(data[index]) : barang.push(data[index])
  );
  let totalbarang =
    data !== []
      ? barang
          .map((data) => parseFloat(data.harga_total))
          .reduce((a, b) => a + b, 0)
      : null;
  let totalsparepart =
    data !== []
      ? sparepart
          .map((data) => parseFloat(data.harga_total))
          .reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_SERVICE,
      payload: {
        data: data,
        totalbarang: totalbarang,
        totalsparepart: totalsparepart,
      },
    });
  };
};
export const getListReturnSupplier = () => {
  let data = JSON.parse(localStorage.getItem("ReturnSupplier_temp")) || [];
  let total =
    data !== []
      ? data.map((data) => data.harga_total).reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_RETURN_SUPPLIER,
      payload: {
        data: data,
        sub_total: total,
      },
    });
  };
};
export const setPembayaranSupplier = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_PEMBAYARAN_SUPPLIER,
      payload: {
        data: data,
      },
    });
  };
};
export const getServiceProgress = (data) => {
  AxiosMasterGet("daftar-service/getDataPendaftaranSerivce").then((res) =>
    localStorage.setItem("progress_service", JSON.stringify(res.data))
  );
  return (dispatch) => {
    dispatch({
      type: GET_PROGRESS,
      payload: {
        data: data,
      },
    });
  };
};
export const setGrandTotal = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_GRAND_TOTAL,
      payload: {
        data: data,
      },
    });
  };
};

export const setPembayaranPiutang = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_TOTAL_PIUTANG_CUSTOMER,
      payload: {
        data: data,
      },
    });
  };
};

export const getListBarangRongsok = () => {
  let data = JSON.parse(localStorage.getItem("BarangRongsok_temp")) || [];
  let total =
    data !== []
      ? data
          .map((data) => parseFloat(data.harga_total))
          .reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG_RONGSOK,
      payload: {
        data: data,
        sub_total: total,
      },
    });
  };
};
export const getListPiutangCustomer = () => {
  return (dispatch) =>
    AxiosMasterGet("bayar-piutang-customer/getDataPiutangCustomer")
      .then((res) => {
        dispatch({
          type: GET_LIST_PIUTANG_CUSTOMER,
          payload: {
            data: res.data,
          },
        });
      })
      .catch((err) => console.log(err));
};
export const getListBayarService = () => {
  return (dispatch) =>
    AxiosMasterGet("daftar-service/getDataPendaftaranSerivce?bayar=true")
      .then((res) => {
        dispatch({
          type: GET_LIST_BAYAR_SERVICE,
          payload: {
            data: res.data,
          },
        });
      })
      .catch((err) => console.log(err));
};

export const getListKirimServiceLuar = () => {
  return (dispatch) =>
    AxiosMasterGet("kirim-service-luar/getDataKirimServiceLuarAll")
      .then((res) => {
        dispatch({
          type: GET_LIST_KIRIM_SERVICE_LUAR,
          payload: {
            data: res.data,
          },
        });
      })
      .catch((err) => console.log(err));
};
export const ListBarangBayar = (data) => {
  return (dispatch) =>
    dispatch({
      type: GET_LIST_BARANG_BAYAR,
      payload: {
        data: data,
      },
    });
};
export const tambahJasa = (data) => {
  return (dispatch) =>
    dispatch({
      type: SET_BARANG_JASA,
      payload: {
        data: data,
      },
    });
};

export const getListPembayaran = () => {
  let data = JSON.parse(localStorage.getItem("listPembayaran_temp")) || [];
  let total =
    data !== []
      ? data.map((data) => parseFloat(data.bayar_rp)).reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_PEMBAYARAN_TEMP,
      payload: {
        data: data,
        sub_total: total,
      },
    });
  };
};

export const getListBarangBayar = () => {
  let data = AxiosMasterGet("daftar-service/getDaftarServiceAllActive") || [];
  let total =
    data !== []
      ? data
          .map((data) => parseFloat(data.harga_total))
          .reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG_PEMBAYARAN,
      payload: {
        data: data,
        total_bayar: total,
      },
    });
  };
};

export const getListBarangBayarS = () => {
  let data = AxiosMasterGet("daftar-service/getDaftarServiceAllActive") || [];
  let total =
    data !== []
      ? data
          .map((data) => parseFloat(data.harga_total))
          .reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG_PEMBAYARAN,
      payload: {
        data: data,
        total_bayar: total,
      },
    });
  };
};

export const getListBarangPembayaran = () => {
  let data = JSON.parse(localStorage.getItem("list_barang_bayar")) || [];
  let total =
    data !== []
      ? data
          .map((data) => parseFloat(data.harga_total))
          .reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG_PEMBAYARAN,
      payload: {
        data: data,
        total_bayar: total,
      },
    });
  };
};

export const getListPembayaranKomplain = () => {
  let data = JSON.parse(localStorage.getItem("total_bayar")) || [];
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG_PEMBAYARAN,
      payload: {
        data: data,
        total_bayar: data,
      },
    });
  };


}

export const getKirimServiceBarang = () => {
  let data = JSON.parse(localStorage.getItem("barang_kirim_service")) || [];
  let total =
    data !== []
      ? data
          .map((data) => parseFloat(data.harga_total))
          .reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG_KIRIM_SERVICE,
      payload: {
        data: data,
        total_bayar: total,
      },
    });
  };
};

export const getListBarang = () => {
  let data = JSON.parse(localStorage.getItem("barangSparepart_temp")) || [];
  let tukar = JSON.parse(localStorage.getItem("tukarSparepart_temp")) || [];
  let total =
    data !== []
      ? data
          .map((data) => parseFloat(data.harga_total))
          .reduce((a, b) => a + b, 0)
      : null;
  let totalTukar =
    data !== []
      ? tukar
          .map((data) => parseFloat(data.harga_total))
          .reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG_SPAREPART_TEMP,
      payload: {
        data: data,
        sub_total: total,
        totalTukar: totalTukar,
      },
    });
  };
};

export const getListBarangKomplain = () => {
  let data = JSON.parse(localStorage.getItem("KomplainBarang_temp")) || [];
  let total =
    data !== []
      ? data
          .map((data) => parseFloat(data.total))
          .reduce((a, b) => a + b, 0)
      : null;
  return (dispatch) => {
    dispatch({
      type: GET_LIST_BARANG_KOMPLAIN,
      payload: {
        data: data,
        total_bayar: total,
      },
    });
  };
};
