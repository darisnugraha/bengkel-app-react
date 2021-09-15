export const Gramasi = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^0-9.]+/g, "");
  if (!previousValue || value.length > previousValue.length) {
    return onlyNums;
  }
};

export const NumberOnly = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^0-9]+/g, "");
  if (!previousValue || value.length > previousValue.length) {
    return onlyNums;
  }
};

export const required = (value) => (value ? undefined : "Tidak Boleh Kosong");
export const number = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
