const ValidasiKondisiBarang = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kondisi_barang) {
    errors.kondisi_barang = "Kondisi Barang Tidak Boleh Kosong";
  }

  return errors;
};

export default ValidasiKondisiBarang;
