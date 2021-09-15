const ValidasiMasterKategori = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kode_kategori) {
    errors.kode_kategori = "Kode Tidak Boleh Kosong";
  }
  if (!value.nama_kategori) {
    errors.nama_kategori = "Nama Kategori Tidak Boleh Kosong";
  }

  if (!value.harga_pergram) {
    errors.harga_pergram = "Harga / Gram Tidak Boleh Kosong";
  }
  if (!value.presentase) {
    errors.presentase = "Presentase Tidak Boleh Kosong";
  }
  if (!value.kadar) {
    errors.kadar = "Kadar Tidak Boleh Kosong";
  }

  return errors;
};

export default ValidasiMasterKategori;
