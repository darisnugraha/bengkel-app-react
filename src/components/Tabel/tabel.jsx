import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import EmptyTable from "../../assets/emptyTable";
import Skeleton from "react-loading-skeleton";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

function Tabel(props) {
  let text = props.textEmpty;
  let handleClick = props.handleClick;
  let tambahData = props.tambahData;
  let expandRow = props.expandRow;
  let selectRow = props.selectRow;
  let exportCSV = props.exportCSV;
  return props.data ? (
    <ToolkitProvider
      keyField={props.keyField}
      data={props.data || []}
      columns={props.columns}
      search
    >
      {(props) => (
        <div className="row">
          <div className="col-6">
            <div className="text-left">
              <SearchBar {...props.searchProps} />
            </div>
          </div>
          <div className="col-6">
            <div className="text-right">
              {tambahData && (
                <button
                  onClick={handleClick}
                  className="btn btn-primary"
                  type="button"
                >
                  Tambah Data
                  <i className="fa fa-plus ml-3"></i>
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="col-12">
            <BootstrapTable
              pagination={paginationFactory()}
              selectRow={selectRow}
              expandRow={expandRow}
              {...props.baseProps}
              striped
              noDataIndication={<EmptyTable text={text || "Tidak Ada Data"} />}
            />
            <br />
            {exportCSV && (
              <ExportCSVButton {...props.csvProps}>
                Export CSV!!
              </ExportCSVButton>
            )}
          </div>
        </div>
      )}
    </ToolkitProvider>
  ) : props.empty ? (
    <ToolkitProvider
      keyField={props.keyField}
      data={props.data || []}
      columns={props.columns}
      search
    >
      {(props) => (
        <div className="row">
          <div className="col-6">
            <div className="text-left">
              <SearchBar {...props.searchProps} />
            </div>
          </div>
          <div className="col-6">
            <div className="text-right">
              {tambahData && (
                <button
                  onClick={handleClick}
                  className="btn btn-primary"
                  type="button"
                >
                  Tambah Data
                  <i className="fa fa-plus ml-3"></i>
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="col-12">
            <BootstrapTable
              pagination={paginationFactory()}
              {...props.baseProps}
              noDataIndication={<EmptyTable text={text || "Tidak Ada Data"} />}
            />
            <br />
            {props.CSVExport && (
              <ExportCSVButton {...props.csvProps}>
                Export CSV!!
              </ExportCSVButton>
            )}
          </div>
        </div>
      )}
    </ToolkitProvider>
  ) : (
    <Skeleton width={"100%"} height={250} />
  );
}

export default Tabel;
