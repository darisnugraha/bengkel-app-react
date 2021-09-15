import React, { Component } from "react";

class NavigationStepper extends Component {
  render() {
    return (
      <div className="col-lg-12 mt-3 mb-3">
        <div className="row">
          <div className="col-lg-6">
            <div className="text-left">
              <button
                type="button"
                className={
                  this.props.first
                    ? "btn btn-warning d-none"
                    : "btn btn-warning"
                }
                onClick={this.props.prevStep}
              >
                <i className="fa fa-chevron-left mr-3"></i>
                Back
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-right">
              <button
                type={this.props.simpan ? "submit" : "button"}
                className={
                  this.props.last ? "btn btn-warning d-none" : "btn btn-warning"
                }
                onClick={this.props.nextStep}
              >
                {!this.props.simpan ? (
                  <>
                    Next <i className="fa fa-chevron-right ml-3"></i>
                  </>
                ) : (
                  <>
                    Simpan <i className="fa fa-paper-plane ml-3"></i>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavigationStepper;
