const validasiProvinsi = (value) => {
    const errors = {};
    if (!value.kodeProvinsi) {
        errors.kodeProvinsi = "Kode Provinsi Tidak Boleh Kosong";
    }
    if (!value.namaProvinsi) {
        errors.namaProvinsi = "Nama Provinsi Tidak Boleh Kosong";
    }

    if (!value.statusAktif) {
        errors.statusAktif = "Status Tidak Boleh Kosong";
    }

    return errors;
}

export default validasiProvinsi;


