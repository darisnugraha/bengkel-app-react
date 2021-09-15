const validatePermintaanBarang = (values) => {
  const errors = {};
  if (parseInt(values.stock) < parseInt(values.qty)) {
    errors.qty = "Jumlah Melebihi stock, mohon kuragi";
  }
  return errors;
};

export default validatePermintaanBarang;
