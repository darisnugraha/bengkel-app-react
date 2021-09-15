import React from "react";
import Tabel from "../../../../components/Tabel/tabel";

class TabelLaporanPengeluaranBarang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isEdit: false,
        modalDialog: false,
        isLoading: false,
        columns: [
            {
                dataField: "",
                text: "No PB",
                sort: true,
        },
        {
            dataField: "",
            text: "Barcode",
        },
        {
            dataField: "",
            text: "Divisi",
        },
        {
            dataField: "",
            text: "Nama",
        },
        {
            dataField: "",
            text: "Nama Barang",
        },
        {
            dataField: "",
            text: "QTY",
        },
        {
            dataField: "",
            text: "Tanggal",
        },
    ],
    };
  }

  render() {
    return (
      <div>
        <br />
        {/* Master Kategori */}
        <div className="col-lg-12">
          <Tabel
            keyField="no_permintaan_barang"
            data={this.props.listkategori || []}
            columns={this.state.columns}
            CSVExport
            tambahData={false}
          />
        </div>
        <br />
      </div>
    );
  }
}

export default TabelLaporanPengeluaranBarang;
