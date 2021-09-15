import React from "react";
import empty from "./empty.svg";

function EmptyTable(props) {
  return (
    <div className="col-lg-12">
      <div className="text-center">
        <img src={empty} width="250" height="250" alt="Empty"></img>
        <h5>{props.text}</h5>
      </div>
    </div>
  );
}

export default EmptyTable;
