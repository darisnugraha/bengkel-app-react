const ValidasiDataUsers = (value) => {
    const errors = {};
    if (!value.user_id) {
        errors.user_id = "User Id Tidak Boleh Kosong";
    }
    if (!value.user_name) {
        errors.user_name = "Username Tidak Boleh Kosong";
    }

    if (!value.level) {
        errors.level = "Level Harus Dipilih ";
    }
    if (!value.password) {
        errors.password = "Password Harus Diisi ";
    }
    if (!value.retype_password) {
        errors.retype_password = "Retype Password Harus Diisi ";
    }

    return errors;
}

export default ValidasiDataUsers;


