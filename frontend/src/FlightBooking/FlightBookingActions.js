import { ADD_PASSENGER, REMOVE_PASSENGER, SET_AIRPORT, SET_ROUNDTRIPS, SET_TOPPRICE, SET_SHOWINGRESULTS, SET_AIRPORTLIST, SET_DATE, SET_DATEFOCUSEDINPUT, SET_FLEXIBLEDATES } from './FlightBookingTypes'

/**
 * Add passenger with ageRange specified
 */
export const addPassenger = (ageRange) => {
	return {
		type: ADD_PASSENGER,
		ageRange
	}
}

/**
 * Remove passenger based on their index
 */
export const removePassenger = (ageRange) => {
	return {
		type: REMOVE_PASSENGER,
		ageRange
	}
}

/**
 * Set airport origin
 */
export const setAirport = (airport, section) => {
	return {
		type: SET_AIRPORT,
		section,
		airport
	}
}

/**
 * Set Found combos
 */
export const setRoundTrips = (roundtrips) => {
	return {
		type: SET_ROUNDTRIPS,
		roundtrips
	}
}

/**
 * Set top amount of money to spend
 */
export const setTopPrice = (price) => {
	return {
		type: SET_TOPPRICE,
		price
	}
}

/**
 * Set results to show
 */
export const setShowResults = (show) => {
	return {
		type: SET_SHOWINGRESULTS,
		show
	}
}

/**
 * Set airports list
 */
export const setAirportList = (list) => {
	return {
		type: SET_AIRPORTLIST,
		list
	}
}

/**
 * Set Date @airbnb
 */
export const setDate = (startDate, endDate) => {
	console.log(startDate)
	console.log(endDate)
	return {
		type: SET_DATE,
		startDate,
		endDate
	}
}

/**
 * Set Focused Input Date Picker @airbnb
 */
export const setDateFocusedInput = (focusedInput) => {
	return {
		type: SET_DATEFOCUSEDINPUT,
		focusedInput
	}
}

/**
 * Toggle flexible dates
 */
export const toggleFlexibleDates = (checked) => {
	return {
		type: SET_FLEXIBLEDATES,
		checked
	}
}
