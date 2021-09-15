const ValidasiMasterKondisiPinjaman = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kondisi_pinjaman) {
    errors.kondisi_pinjaman = "Kondisi Pinjaman Tidak Boleh Kosong";
  }

  return errors;
};

export default ValidasiMasterKondisiPinjaman;
