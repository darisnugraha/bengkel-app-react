import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import React from "react";

const { SearchBar } = Search;
export const TabelGlobal = ({ data, columns }) => {
  return (
    <ToolkitProvider
      keyField="kode_barcode"
      data={data || []}
      columns={columns}
      search
      exportCSV={{
        fileName: "Export Master Kategori.csv",
      }}
    >
      {(props) => (
        <div className="row">
          <div className="col-6">
            <div className="text-left">
              <SearchBar {...props.searchProps} />
            </div>
          </div>
          <hr />
          <div className="col-12">
            <BootstrapTable
              pagination={paginationFactory()}
              {...props.baseProps}
            />
            <br />
          </div>
        </div>
      )}
    </ToolkitProvider>
  );
};
