import { ADD_PASSENGER, REMOVE_PASSENGER, SET_AIRPORT, SET_ROUNDTRIPS, SET_TOPPRICE } from './FlightBookingTypes'

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