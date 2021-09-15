const ValidasiLogin = (value) => {
    const errors = {};
    // console.log(event.charCode==13);
    if (!value.username) {
      errors.username = "Username Harus Diisi";
    }
    if (!value.password) {
      errors.password = "Password Harus Diisi";
    }
  
    return errors;
  };
  
  export default ValidasiLogin;
  