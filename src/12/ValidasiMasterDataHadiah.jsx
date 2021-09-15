const ValidasiMasterDataHadiah = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.nama_hadiah) {
    errors.nama_hadiah = "Nama Hadiah Tidak Boleh Kosong";
  }
  if (!value.poin) {
    errors.poin = "Poin Tidak Boleh Kosong";
  }

  return errors;
};

export default ValidasiMasterDataHadiah;
