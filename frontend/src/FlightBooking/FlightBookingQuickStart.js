import React, { Component } from 'react';
import PassengerCount from './components/PassengerCount'
import AirportsSelect from './components/AirportsSelect'
import Header from '../App/Header'
import './FlightBooking.css'
import { request } from 'graphql-request'
import { Link } from 'react-router-dom'

class FlightBookingQuickStart extends Component {
	constructor(props){
		super(props);
		this.state = {
			airports_options: []
		}
	}

	componentWillMount() {
		document.getElementById('body').className='quick-search'
	}

	componentWillUnmount() {
		document.getElementById('body').className=''
	}

	componentDidMount() {
		let self = this;
		const airportsQuery = `{
			airports {
				iata,
				city
			}
		}`
		request('/graphql', airportsQuery).then(data => {
			let selectAirports = data.airports.map(airport => {
				return {value:airport.iata,label:airport.city}
			})
			self.setState({airports_options:selectAirports})
		})
	}

	render() {
		return (
			<div className="fixed-container">
				<div className="boarding-pass">			
					<Header color="yellow" />
					<div className="departure-destination row">
						<div>
							<label>Desde</label><br />
							<AirportsSelect type="origin" airports={this.state.airports_options} />
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