const ValidasiParameterRugiNota = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kode_kategori) {
    errors.kode_kategori = "Kode Kategori Tidak Boleh Kosong";
  }
  if (!value.kadar) {
    errors.kadar = "Kadar Tidak Boleh Kosong";
  }
  if (!value.rugi) {
    errors.rugi = "Rugi Tidak Boleh Kosong";
  }
  if (!value.rusak) {
    errors.rusak = "Rusak Tidak Boleh Kosong";
  }

  return errors;
};

export default ValidasiParameterRugiNota;
