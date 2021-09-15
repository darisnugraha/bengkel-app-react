const ValidasiMasterSales = (value, event) => {
  const errors = {};
  // console.log(event.charCode==13);
  if (!value.kode_sales) {
    errors.kode_sales = "Kode Sales Tidak Boleh Kosong";
  }
  if (!value.nama_sales) {
    errors.nama_sales = "Nama Sales Tidak Boleh Kosong";
  }
  return errors;
};

export default ValidasiMasterSales;
