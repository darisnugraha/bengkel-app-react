import React from 'react';
import { getToday } from '../../helpers/function';


class SearchForm extends React.Component {
	render() {
		return (
			<li className="navbar-form">
				{/* <form action="" method="POST" name="search_form"> */}
					<div className="form-group">
						<input type="text" readOnly className="form-control" placeholder="Tanggal Sekarang" value={"Tanggal Hari Ini : "+getToday()} />
						<button type="submit" className="btn btn-search"><i className="fa fa-calendar-check"></i></button>
					</div>
				{/* </form> */}
			</li>
		);
	}
};

export default SearchForm;
