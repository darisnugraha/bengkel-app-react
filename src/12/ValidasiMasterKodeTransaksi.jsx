const ValidasiMasterKodeTransaksi = (value,event) => {
    const errors = {};
    // console.log(event.charCode==13);
    if (!value.kode_transaksi) {
        errors.kode_transaksi = "Kode Transaksi Tidak Boleh Kosong";
    }
   
    return errors;
}

export default ValidasiMasterKodeTransaksi;