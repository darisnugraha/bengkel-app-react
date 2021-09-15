const ValidasiMasterJenis = (value) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kode_kategori) {
    errors.kode_kategori = "Kode Kategori Tidak Boleh Kosong";
  }
  if (!value.kode_jenis) {
    errors.kode_jenis = "Kode Jenis Tidak Boleh Kosong";
  }
  if (!value.nama_jenis) {
    errors.nama_jenis = "Nama Jenis Tidak Boleh Kosong";
  }

  return errors;
};

export default ValidasiMasterJenis;
