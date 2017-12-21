import React from 'react';
import { connect } from 'react-redux';
import { setAirport } from './../FlightBookingActions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const AirportsSelect = ({type, airports, setAirport, value}) => {
	return	<Select onChange={(event) => setAirport(event, type)} options={airports} value={value[type]} placeholder=""/>
}

const mapStateToProps = state => {
	return {
		value: state.flightBooking.flight,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setAirport: (value,type) => {
			dispatch(setAirport(value,type))
		}
	}
}

const AirportsSelectInput = connect(
	mapStateToProps,
	mapDispatchToProps
)(AirportsSelect);

export default AirportsSelectInput;