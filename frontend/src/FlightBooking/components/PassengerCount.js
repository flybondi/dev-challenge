import React from 'react';
import { connect } from 'react-redux'
import { removePassenger, addPassenger } from './../FlightBookingActions'

const PassengerInput = ({ addHandler, removeHandler, value, label }) => { 
 	return	<div className="passenger-count">
 				<label htmlFor="passengers">{label}</label>
				<button type="button" onClick={removeHandler}><i className="fa fa-minus-circle" aria-hidden="true"></i></button>
				<span>{value}</span>
				<button type="button" onClick={addHandler}><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
			</div>
}

const PassengersCount = ({ addPassenger, removePassenger, count }) => {
 	return	<div className="passenger-count-wrapper">
				<PassengerInput removeHandler={() => removePassenger('adult')} addHandler={() => addPassenger('adult')} value={count.adult} label="Adultos" />
				<PassengerInput removeHandler={() => removePassenger('children')} addHandler={() => addPassenger('children')} value={count.children} label="Niños" />
				<PassengerInput removeHandler={() => removePassenger('infant')} addHandler={() => addPassenger('infant')} value={count.infant} label="Infantes"/>
			</div>
}


/**
 * Count passengers by Age Range
 */
const countPassengersByAgeRange = (passengers) => {
	let adults = passengers.filter(passenger => passenger.ageRange === 'adult');
	let children = passengers.filter(passenger => passenger.ageRange === 'children');
	let infants = passengers.filter(passenger => passenger.ageRange === 'infant');

	const count = {
		adult: adults.length,
		children: children.length,
		infant: infants.length
	}

	return count
}

/**
 * Redux -> 
 */
const mapStateToProps = state => {
	return {
		count: countPassengersByAgeRange(state.flightBooking.passengers)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		removePassenger: ageRange => {
			dispatch(removePassenger(ageRange))
		},
		addPassenger: ageRange => {
			dispatch(addPassenger(ageRange))
		}
	}
}

const PassengerCountInputs = connect(
	mapStateToProps,
	mapDispatchToProps
)(PassengersCount)

/** 
 * <- Redux
 */
export default PassengerCountInputs;
