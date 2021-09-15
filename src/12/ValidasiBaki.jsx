const ValidasiBaki = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kode_gudang) {
    errors.kode_gudang = "Kode Gudang Tidak Boleh Kosong";
  }
  if (!value.kode_baki) {
    errors.kode_baki = "Kode Baki Tidak Boleh Kosong";
  }
  if (!value.nama_baki) {
    errors.nama_baki = "Nam Baki Tidak Boleh Kosong";
  }
  if (!value.berat_baki) {
    errors.berat_baki = "Berat Baki Tidak Boleh Kosong";
  }
  if (!value.berat_bandrol) {
    errors.berat_bandrol = "Berat Bandrol Tidak Boleh Kosong";
  }
  return errors;
};

export default ValidasiBaki;
