const ValidasiMasterKondisiPembelian = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kondisi) {
    errors.kondisi = "kondisi Tidak Boleh Kosong";
  }
  if (!value.presentase) {
    errors.presentase = "Presentase Tidak Boleh Kosong";
  }

  return errors;
};

export default ValidasiMasterKondisiPembelian;
