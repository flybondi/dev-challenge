import React from 'react';
import { connect } from 'react-redux';
import { request } from 'graphql-request';
import { setRoundTrips } from './../FlightBookingActions';
import FlightsList from './FlightsList';

const FlightsCombinationsComponent = ({flight, passengers, setRoundTrips, topPrice}) => {
	if(flight.destination===false) 
		return <div/>
	else {
		const roundtripsQuery = `{ roundtrips(origin:"${flight.origin.value}",destination:"${flight.destination.value}",pax: ${passengers.length}, topPrice: ${topPrice}) {
										priceRangeMax, combos {
											price,
											outward { origin, destination, destinationCity, price, availability, date },
											return { origin, destination, destinationCity, price, availability, date }
										}
									}
								}`
		request('/graphql', roundtripsQuery).then(data => {
			setRoundTrips(data.roundtrips)
		})
		return <div className="flight-selector">
					<hr />
					<h1>Vuelos de {flight.origin.label} a {flight.destination.label}</h1>
					<FlightsList />
				</div>
	}
}

const mapStateToProps = state => {
	return {
		flight: state.flightBooking.flight,
		passengers: state.flightBooking.passengers,
		topPrice: state.flightBooking.topPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setRoundTrips: (roundtrips) => {
			dispatch(setRoundTrips(roundtrips))
		}
	}
}

export const FlightsCombinations = connect(
	mapStateToProps,
	mapDispatchToProps
)(FlightsCombinationsComponent);