const ValidasiMasterGudang = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kode_gudang) {
    errors.kode_gudang = "Kode Gudang Tidak Boleh Kosong";
  }
  if (!value.nama_gudang) {
    errors.nama_gudang = "Nama Gudang Tidak Boleh Kosong";
  }
  return errors;
};

export default ValidasiMasterGudang;
