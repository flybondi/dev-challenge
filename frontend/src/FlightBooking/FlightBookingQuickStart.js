import React, { Component } from 'react';
import { PassengerCount, AirportsSelect } from './components';
import Header from '../App/Header';
import './FlightBooking.css';
import { Link } from 'react-router-dom';

class FlightBookingQuickStart extends Component {
	componentWillMount() {
		document.getElementById('body').className='quick-search'
	}

	componentWillUnmount() {
		document.getElementById('body').className=''
	}

	render() {
		return (
			<div className="fixed-container">
				<div className="boarding-pass">			
					<Header color="yellow" />
					<div className="departure-destination row">
						<div>
							<label>Desde</label><br />
							<AirportsSelect type="origin" />
						</div>
						<div className="centered">
							<br />
							<i className="fa fa-plane animated" aria-hidden="true"></i>
						</div>
						<div className="align-right">
							<label>Hasta</label><br />
							<span  className="legend">Un lugar por conocer</span>
						</div>
					</div>
					<div className="row passengers yellow-background">
						<PassengerCount/>
					</div>
					<div className="row yellow-background bottom">
						<div className="col align-right">
							<Link className="search btn-submit" to="/search"><i className="fa fa-arrow-right" aria-hidden="true"></i></Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FlightBookingQuickStart;