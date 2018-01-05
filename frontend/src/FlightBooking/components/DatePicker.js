import React from 'react';
import { connect } from 'react-redux';
import { setDate, setDateFocusedInput, toggleFlexibleDates } from './../FlightBookingActions';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

const DatePickerComponent = ({ type, value, setDate, setDateFocusedInput, toggleFlexibleDates }) => {
	return 	<div>
				<h3>Fechas</h3>	
				<DateRangePicker
					startDate={value.startDate}
					startDateId="startDate"
					endDateId="endDate"
					endDate={value.endDate}
					onDatesChange={({ startDate, endDate }) => setDate({ startDate, endDate })} 
					focusedInput={value.focusedInput} 
					onFocusChange={focusedInput => setDateFocusedInput({ focusedInput })} 
					block
					noBorder
					displayFormat="DD-MM-YYYY"
				/>
				<div className="checkbox-input">
					<input type="checkbox" checked={value.flexible} onChange={({ target }) => toggleFlexibleDates({ target })} /> <label>Fechas flexibles</label>
				</div>
			</div>
}

const mapStateToProps = state => {
	return {
		value: state.flightBooking.flight
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setDate: ({ startDate, endDate }) => {
			dispatch(setDate(startDate, endDate))
		},
		setDateFocusedInput: ({ focusedInput }) => {
			dispatch(setDateFocusedInput(focusedInput))
		},
		toggleFlexibleDates: ({ target }) => {
			dispatch(toggleFlexibleDates(target.checked))
		}
	}
}

export const DatePicker = connect(
	mapStateToProps,
	mapDispatchToProps
)(DatePickerComponent);