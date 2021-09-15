const ValidasiMasterTukang = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kode_tukang) {
    errors.kode_tukang = "Kode Tukang Tidak Boleh Kosong";
  }
  if (!value.nama_tukang) {
    errors.nama_tukang = "Nama Tukang Tidak Boleh Kosong";
  }
  return errors;
};

export default ValidasiMasterTukang;
