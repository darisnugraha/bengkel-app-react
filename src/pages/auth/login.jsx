import React, { lazy } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getToday,
  localStoragedecryp,
  localStorageencryp,
} from "../../components/helpers/function.jsx";
import { postData } from "../../config/axios.jsx";
import { PageSettings } from "../../config/page-settings.js";
const FormLogin = lazy(() => import("./FormLogin.jsx"));
class Login extends React.Component {
  static contextType = PageSettings;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // isLogin: false,
    };
  }

  state = {
    date: "",
  };

  getDate = () => {
    var date = new Date().toDateString();
    this.setState({ date });
  };

  componentDidMount() {
    const isAuthenticated = localStoragedecryp("islogin");
    if (isAuthenticated === getToday()) {
      this.props.history.push("/dashboard");
    }
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });

    this.context.handleSetPageSidebar(false);
    this.context.handleSetPageHeader(false);
    this.context.handleSetBodyWhiteBg(true);
    this.getDate();
    // console.log(encryptascii('sa'));
    // console.log(decryptascii('BF95'));
  }

  componentWillUnmount() {
    this.context.handleSetPageSidebar(true);
    this.context.handleSetPageHeader(true);
    this.context.handleSetBodyWhiteBg(false);
  }

  onfiled(err) {
    // NotifError(err)
    console.log(err);
    Swal.fire({
      title: "Whops..",
      text: err.response.data,
      icon: "info",
    });
    this.setState({ isLoading: false });
  }
  onSubmit(data) {
    let hasil = {
      user_id: data.user_id,
      password: data.password,
    };

    this.setState({ isLoading: true });
    postData("users/login", hasil)
      .then((resposn) => {
        localStorageencryp("userdata", JSON.stringify(resposn.data));
        localStorageencryp("token", resposn.data.token);
        localStorageencryp("islogin", getToday());
        localStorageencryp("Menu", this.handleMenu(resposn.data.akses));
      })
      .then(() => this.props.history.push("/dashboard"))
      .catch((err) => this.onfiled(err));
  }

  handleMenu(json) {
    let hasil = [];
    json
      .map((list) => list.menu_name)
      .forEach((data) => {
        hasil.push(data);
      });
    return JSON.stringify(hasil);
  }

  render() {
    return (
      <div className="login login-with-news-feed">
        <div className="news-feed">
          <div
            className="news-image"
            style={{
              backgroundImage: `url(${require("../../assets/img/login-bg/logo.jpeg")})`,
            }}
          ></div>
          <div className="news-caption">
            <h4 className="caption-title">
              <b>Bengkel</b> App
            </h4>
            <p>Bengkel App Admin Website <small>V.1.1</small></p>
          </div>
        </div>
        <div className="right-content">
          <div className="login-header">
            <div className="brand">
              <span className="logo"></span> <b>Bengkel</b> App
            </div>
            <div className="icon">
              <i className="fa fa-sign-in"></i>
            </div>
          </div>
          <div className="login-content">
            <FormLogin
              isLoading={this.state.isLoading}
              onSubmit={(data) => this.onSubmit(data)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
// Login = reduxForm({
// 	form: "FormLogin",
// 	enableReinitialize: true,
// 	validate: ValidasiLogin,
//   })(Login);
//   export default connect()(Login);
