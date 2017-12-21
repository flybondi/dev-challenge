import { ADD_PASSENGER, REMOVE_PASSENGER, SET_AIRPORT, SET_ROUNDTRIPS, SET_TOPPRICE } from './FlightBookingTypes'

/**
 * Initial state for Flight Booking,
 * the origin airport should be setted after a
 * location API fires the search of the nearest 
 * airport
 * Passengers is an array of objects (passenger)
 */
const initialSearchState = {
	flight: {
		origin: {value:'EPA',label:'Buenos Aires'},
		destination: false
	},
	passengers: [
		{
			ageRange: 'adult'
		}
	],
	topPrice: 90000,
	foundCombos: { combos: [], priceRangeMax:90000 }
}

const flightBooking = (state = initialSearchState, action) => {
	switch(action.type) {
		case ADD_PASSENGER:
			let passengersAdded = [...state.passengers, {ageRange:action.ageRange}]
			return { ...state, passengers: passengersAdded }
		case REMOVE_PASSENGER:
			let passengersRemoved = [...state.passengers]
			for(let i=1;i<state.passengers.length;i++) { // At least one passenger is required, so we don't iterate through the first one (the Adult)
				if(state.passengers[i].ageRange === action.ageRange) {
					passengersRemoved.splice(i,1)
					break;
				}
			}
			return { ...state, passengers: passengersRemoved }
		case SET_AIRPORT:
			let flight = {...state.flight}
			flight[action.section] = action.airport
			return { ...state, flight: flight }
		case SET_ROUNDTRIPS:
			let foundCombos = action.roundtrips
			return { ...state, foundCombos: foundCombos }
		case SET_TOPPRICE:
			let topPrice = action.price
			return { ...state, topPrice: topPrice }
		default:
			return state;
	}
}

export default flightBooking;