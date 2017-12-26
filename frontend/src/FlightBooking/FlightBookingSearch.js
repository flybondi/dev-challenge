import React, { Component } from 'react';
import { PassengerCount, LowestFares, FlightsCombinations, PriceSlider, AirportsSelect, DatePicker } from './components';
import Header from '../App/Header';
import './FlightBooking.css';
import { request } from 'graphql-request';
import { connect } from 'react-redux';

class FlightBookingSearchComp extends Component {
	constructor(props){
		super(props);
		this.state = {
			ready: false,
			flight: props.flight
		}
	}

	componentDidMount() {
		let self = this;
		const lowestFares = `{leavingFrom(airport: "${this.state.flight.origin.value}") {destination,price,destinationCity}}`
		request('/graphql', lowestFares).then(data => {
			self.setState({lowestFares:data.leavingFrom, ready: true})
		})
	}

	render() {
		let mainContent = <div className="centered"><h1>Buscando ofertas</h1><div className="spinner"></div></div>
		if(this.state.ready)
			mainContent = 	<div>
								<h1>Saliendo de {this.state.flight.origin.label} </h1>
								<LowestFares fares={this.state.lowestFares} />
								<FlightsCombinations />
							</div>
		return (
			<div className="fluid-container flight-search">
				<div className="yellow-background sidebar">
					<Header color="white" />
					<DatePicker />
					<PriceSlider />
					<h3>Pasajeros</h3>
					<PassengerCount/>
				</div>
				<div className="main">
					{mainContent}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		flight: state.flightBooking.flight
	}
}

const FlightBookingSearch = connect(
	mapStateToProps
)(FlightBookingSearchComp);

export default FlightBookingSearch;