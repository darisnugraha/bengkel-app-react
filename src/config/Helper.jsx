import Swal from "sweetalert2";

export const simpanLocal = (nama, data) => {
  return new Promise((resolve, reject) => {
    let array = JSON.parse(localStorage.getItem(nama)) || [];
    array.push(data);
    localStorage.setItem(nama, JSON.stringify(array));
    Swal.fire({
      position: "top-right",
      text: "Tambah Data Berhasil",
      timer: 2000,
      icon: "success",
      showConfirmButton: false,
    })
      .then(() => resolve("Berhaisl"))
      .catch(() => reject("GAGAL"));
  });
};


export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
