import React from 'react';
import { connect } from 'react-redux';
import { setAirport } from './../FlightBookingActions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const AirportsSelectComponent = ({type, airports, setAirport, value}) => {
	return	<Select onChange={(event) => setAirport({event, type})} options={airports} value={value[type]} placeholder=""/>
}

const mapStateToProps = state => {
	return {
		value: state.flightBooking.flight,
		airports: state.flightBooking.airports
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setAirport: ({event,type}) => {
			dispatch(setAirport(event,type))
		}
	}
}

export const AirportsSelect = connect(
	mapStateToProps,
	mapDispatchToProps
)(AirportsSelectComponent);