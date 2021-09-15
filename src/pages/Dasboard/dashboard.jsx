import React from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
} from "../../components/panel/panel.jsx";
// import { Line } from "react-chartjs-2";
import developed from "../../assets/developed.svg";
import { AxiosMasterGet } from "../../axios";
import { ToastError } from "../../components/notification/notification";
import Tabel from "../../components/Tabel/tabel.jsx";
import Moment from "moment";

class DashboardV1 extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      listSPK: [],
      listTanggal: [],
      activeTab: "1",
      columns: [
        {
          dataField: "no_daftar",
          text: "No SPK",
        },
        {
          dataField: "nama_customer",
          text: "Nama Customer",
        },
        {
          dataField: "kota",
          text: "Kota",
        },
        {
          dataField: "nopol_kendaraan",
          text: "No Polisi",
        },
        {
          dataField: "handphone",
          text: "No Handphone",
        },
        {
          dataField: "tgl_masuk",
          text: "Tanggal Masuk Service",
          formatter: (data) => Moment(data).format('DD/MM/YYYY'),

        },
      ],
    };

    this.lineChartData = {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      datasets: [
        {
          label: "Page Views",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(0, 172, 172, 0.25)",
          borderColor: "#00acac",
          borderWidth: 2,
          pointBorderColor: "#00acac",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#00acac",
          pointHoverBorderWidth: 3,
          pointRadius: 3,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40, 59, 76, 94, 77, 82],
        },
        {
          label: "Visitors",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(52, 143, 226, 0.25)",
          borderColor: "#348fe2",
          borderWidth: 2,
          pointBorderColor: "#348fe2",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#348fe2",
          pointHoverBorderWidth: 3,
          pointRadius: 3,
          pointHitRadius: 10,
          data: [25, 29, 40, 45, 16, 15, 20, 39, 26, 44, 57, 32],
        },
      ],
    };

    this.lineChartOptions = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "black",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "black",
            },
          },
        ],
      },
      legend: {
        labels: {
          fontColor: "black",
        },
      },
    };

    this.map = {
      center: {
        lat: 59.95,
        lng: 30.33,
      },
      zoom: 9,
    };

    this.date = new Date();

    this.sparklineData = [
      {
        values: [789, 880, 676, 200, 890, 677, 900],
        colors: { area: "transparent", line: "#ff5b57" },
      },
    ];

    this.sparklineData2 = [
      {
        values: [789, 880, 676, 200, 890, 677, 900],
        colors: { area: "transparent", line: "#f59c1a" },
      },
    ];

    this.sparklineData3 = [
      {
        values: [789, 880, 676, 200, 890, 677, 900],
        colors: { area: "transparent", line: "#00acac" },
      },
    ];

    this.sparklineData4 = [
      {
        values: [789, 880, 676, 200, 890, 677, 900],
        colors: { area: "transparent", line: "#348fe2" },
      },
    ];

    this.sparklineData5 = [
      {
        values: [789, 880, 676, 200, 890, 677, 900],
        colors: { area: "transparent", line: "#ccc" },
      },
    ];

    this.sparklineData6 = [
      {
        values: [789, 880, 676, 200, 890, 677, 900],
        colors: { area: "transparent", line: "#2d353c" },
      },
    ];
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount() {
    console.log(JSON.parse(localStorage.getItem("userdata")).user_id);
    AxiosMasterGet("daftar-service/getDataPendaftaranSerivce")
      .then((res) => {
        this.setState({
          listSPK: res && res.data,
        });
      })
      .then(() => console.log(this.state.listTanggal))
      .catch((err) =>
        ToastError(`Erorr Get SPK , Detail : ${err.response.data}`)
      );
  }

  openNewTab() {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-500,top=-1000`;

    var base_url = window.location.origin;
    console.log(base_url);
    window.open(`${base_url}/bengkelapp.com/service-progress`, "test", params);
  }
  render() {
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/dashboard/v1">Home</Link>
          </li>
          <li className="breadcrumb-item active">Dashboard</li>
        </ol>
        <h1 className="page-header">Dashboard</h1>
        {/* <button
          className="btn btn-primary mb-2 mt-2"
          onClick={() => this.openNewTab()}
        >
          Lihat Daftar Service
        </button> */}
        <div className="row">
          {/* <div className="col-xl-12">
            <Panel>
              <PanelHeader>Website Analytics (Last 7 Days)</PanelHeader>
              <PanelBody>
                <Line
                  data={this.lineChartData}
                  height={300}
                  options={this.lineChartOptions}
                />
              </PanelBody>
            </Panel>
          </div> */}
          {/* <div className="col-lg-12">
            <Panel>
              <PanelHeader>
                <PanelBody>
                  <h2>Changelog :</h2>
                  <h4>3/19/2021</h4>
                  <h5>Perbaikan Hasil QC 7</h5> */}
          {/* <h5>Tambah Nomor Daftar pada Permintaan barang</h5>
                  <h5>Penerimaan barang sudah bisa tambah barang baru</h5>
                  <a href="https://docs.google.com/document/d/18FE3l2LX9PMwF9n5YOkOicmDinPujY2xBpWziMyW_XQ/edit?usp=sharing">
                    LAMPIRAN HASIL QC
                  </a> */}
          {/* </PanelBody>
              </PanelHeader>
            </Panel>
          </div> */}
          <div className="col-lg-12">
            <Panel>
              <PanelHeader>List Daftar Service</PanelHeader>
              <PanelBody>
                <Tabel
                  keyField="no_daftar"
                  data={this.state.listSPK || []}
                  columns={this.state.columns}
                  CSVExport
                  tambahData={false}
                />
              </PanelBody>
            </Panel>
          </div>
          <div className="col-lg-12 text-center d-none">
            <img src={developed} alt="Developed" width={300} />
            <h3>Dear User, This Website Is Under Developed</h3>
            <h5>Sorry if you got some errors..</h5>
            <p>Cheerss..</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardV1;
