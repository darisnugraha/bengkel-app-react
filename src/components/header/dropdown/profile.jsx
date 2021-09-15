import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Swal from "sweetalert2";
import user_foto from "../../../assets/img/user/logo.jpeg";
import { AxiosMasterPost } from "../../../axios";
import { getUserData } from "../../notification/notification";

const logout = () => {
  Swal.fire({
    title: "Konfirmasi Keluar !!",
    text: "Apakah anda yakin ingin keluar ?",
    icon: "info",
    position: "top-center",
    cancelButtonText: "Tidak",
    showCancelButton: true,
    confirmButtonText: "OK",
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      AxiosMasterPost("users/logout/"+getUserData().user_id)
      .then(()=>{
        var base_url = window.location.origin;
        console.log(base_url);
        window.location.href = base_url+"/sambasmotor.com/";
      })
      .then(()=>{localStorage.clear()})
      .then(()=>{localStorage.setItem("islogin", "false")})

    }
  });
};
class DropdownProfile extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className="dropdown navbar-user"
        tag="li"
      >
        <DropdownToggle tag="a">
          <img src={user_foto} alt="" />
          <span className="d-none d-md-inline" style={{ cursor: "pointer" }}>
            {getUserData().user_name}
          </span>
          <b className="caret"></b>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu dropdown-menu-right" tag="ul">
          {/* <DropdownItem>Setting</DropdownItem> */}
          {/* <div className="dropdown-divider"></div> */}
          <DropdownItem>
            {/* <button onClick={() => logout()}>Log Out </button> */}
            <Link to="#" onClick={() => logout()}>
              Logout
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default DropdownProfile;
