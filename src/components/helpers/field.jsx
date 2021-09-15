import React from "react";
import SelectSearch from "react-select-search";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import Skeleton from "react-loading-skeleton";

export const ReanderField = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    <input
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          event.preventDefault(); //<===== This stops the form from being submitted
        } else {
        }
      }}
      {...input}
      autoComplete="off"
      type={type}
      className="form-control"
      readOnly={readOnly}
      placeholder={placeholder}
    />
    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);
export const FormatNumber = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    <NumberFormat
      thousandSeparator={"."}
      decimalSeparator={","}
      autoComplete="off"
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          event.preventDefault(); //<===== This stops the form from being submitted
        } else {
        }
      }}
      {...input}
      type={type}
      inputmode="numeric"
      className="form-control"
      readOnly={readOnly}
      placeholder={placeholder}
    />
    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);

export const Gramasi = ({
  input,
  label,
  type,
  readOnly,
  placeholder,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    <NumberFormat
      format="#.###"
      autoComplete="off"
      thousandSeparator={"."}
      // step={0.001}
      decimalSeparator={","}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          event.preventDefault(); //<===== This stops the form from being submitted
        } else {
        }
      }}
      {...input}
      type={type}
      inputMode="numeric"
      className="form-control"
      readOnly={readOnly}
      placeholder={placeholder}
    />
    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);


  
export const SkeletonLoading = ({
  label,
}) => (
  <div className="form-group">
    <label> {label} </label>
    <Skeleton className="form-control" />
  </div>
);

export const ReanderSelect = ({
  input,
  label,
  readOnly,
  placeholder,
  options,
  value,
  disabled,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    <SelectSearch
      autoComplete="off"
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          event.preventDefault(); //<===== This stops the form from being submitted
        } else {
        }
      }}
      {...input}
      readOnly={readOnly}
      search
      disabled={disabled}
      placeholder={placeholder}
      options={options}
    />
    {/* <Select
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        options={options}
     
      /> */}

    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);

export const InputDate = ({
  input,
  label,
  readOnly,
  placeholder,
  selected,
  meta: { touched, error, warning },
}) => (
  <div className="form-group">
    <label htmlFor="" className="text-black">
      {label}
    </label>
    <div className="customDatePickerWidth">
      <DatePicker
        autoComplete="off"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault(); //<===== This stops the form from being submitted
          } else {
          }
        }}
        {...input}
        selected={selected}
        className="form-control"
        readOnly={readOnly}
        placeholder={placeholder}
      />
    </div>
    {touched &&
      ((error && (
        <ul className="parsley-errors-list filled">
          <li className="parsley-required"> {error}.</li>
        </ul>
      )) ||
        (warning && <p>{warning}</p>))}
  </div>
);
