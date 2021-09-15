import React from "react";
import Tabel from "../../../../components/Tabel/tabel";

class TabeLaporanService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isEdit: false,
        modalDialog: false,
        isLoading: false,
        columns: [
            {
                dataField: "",
                text: "No. Faktur Service",
                sort: true,
        },
        {
            dataField: "",
            text: "Tanggal",
        },
        {
            dataField: "",
            text: "Keterangan",
        },
        {
            dataField: "",
            text: "Total",
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

export default TabeLaporanService;
