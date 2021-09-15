import React, { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, Route, withRouter } from "react-router-dom";
import routes from "./../../config/page-route.jsx";
import { PageSettings } from "./../../config/page-settings.js";
import access from "../../assets/accessDenied.svg";
import { getToday } from "../notification/function.jsx";
import { getUserData } from "../notification/notification.jsx";


function setTitle(path, routeArray) {
  var pageTitle;
  for (var i = 0; i < routeArray.length; i++) {
    if (routeArray[i].path === path) {
      pageTitle = "Bengkel App | " + routeArray[i].title;
    }
  }
  document.title = pageTitle ? pageTitle : "Bengkel App | React App";
}

class Content extends React.Component {
  componentDidMount() {
    setTitle(this.props.history.location.pathname, routes);
    console.log(this.checkAcces());
  }
  componentWillMount() {
    this.props.history.listen(() => {
      setTitle(this.props.history.location.pathname, routes);
    });
  }

  checkAcces() {
    let array = JSON.parse(localStorage.getItem("Menu")) || []; //ganti dengan hak akses dari API
    let data = this.props.history.location.pathname;
    let hasil = array.findIndex((res) => res === data);
    return data === "/" ? 2 : hasil;
    // return 3;
  }
  render() {
    return (
      <Suspense fallback={<Skeleton width={"100%"} height={1000} />}>
        <PageSettings.Consumer>
          {({
            pageContentFullWidth,
            pageContentClass,
            pageContentInverseMode,
          }) => (
            <div
              className={
                "content " +
                (pageContentFullWidth ? "content-full-width " : "") +
                (pageContentInverseMode ? "content-inverse-mode " : "") +
                pageContentClass
              }
            >
              {this.checkAcces() === -1 ? (
                <>
                  {localStorage.getItem("userdata") === null ? (-1) : JSON.parse(localStorage.getItem("userdata")).level ===
                    "OWN" ? (
                    <>
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="container text-center mt-5 ">
                      <div className="align-item-center">
                        <img src={access} alt="Access" width="30%" />
                        <h1> Mohon Maaf</h1>
                        <h1 className="f-w-900">
                          Akses Di Menu Ini Tidak Di Izinkan
                        </h1>
                        <h5>Hubungi Admin Jika Ingin Memakai Menu Ini</h5>
                        <div>
                          <Link to="/dashboard">
                            <button className="btn btn-primary mt-3">
                              <i className="fa fa-chevron-left mr-3"></i> Go
                              Home
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : localStorage.getItem("userdata") === null || undefined ? (
                <>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                </>
              ) : getUserData().tgl_system < getToday() ? (
                <>
                  {this.props.history.location.pathname ===
                    "/validasi-jual-beli" ||
                  this.props.history.location.pathname ===
                    "/validasi-hutang" ? (
                    <>
                      {routes.map((route, index) => (
                        <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="container text-center mt-5 ">
                      <div className="align-item-center">
                        <img src={access} alt="Access" width="30%" />
                        <h1> Mohon Maaf</h1>
                        <h3 className="f-w-900">
                          Tanggal System Berbeda <br />
                          Dengan Tanggal Sekarang
                        </h3>
                        <h5>Silahkan Tutup Toko</h5>
                        <div>
                          <button
                            disabled={this.state.isLoading}
                            onClick={() => this.showModalTutupToko()}
                            className="btn btn-primary mt-3"
                          >
                            {this.state.isLoading ? (
                              <>
                                <i className="fas fa-spinner fa-spin"></i>{" "}
                                &nbsp; Tutup Toko Sekarang
                              </>
                            ) : (
                              <>
                                {" "}
                                <i className="fa fa-window-close mr-3"></i>{" "}
                                Tutup Toko Sekarang{" "}
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </PageSettings.Consumer>
      </Suspense>
    );
  }
}

export default withRouter(Content);
