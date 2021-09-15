const ValidasiMasterGroup = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kode_group) {
    errors.kode_group = "Kode Group Tidak Boleh Kosong";
  }
  if (!value.nama_group) {
    errors.nama_group = "Nama Group Tidak Boleh Kosong";
  }
  if (!value.harga) {
    errors.harga = "Harga Tidak Boleh Kosong";
  }
  if (!value.persentase) {
    errors.persentase = "Persentase Tidak Boleh Kosong";
  }

  return errors;
};

export default ValidasiMasterGroup;
