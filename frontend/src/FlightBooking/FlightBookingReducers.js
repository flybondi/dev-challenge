import { ADD_PASSENGER, REMOVE_PASSENGER, SET_AIRPORT, SET_ROUNDTRIPS, SET_TOPPRICE, SET_SHOWINGRESULTS, SHOWING_RESULTS, TOP_PRICE } from './FlightBookingTypes'

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
	topPrice: TOP_PRICE,
	showingResults: SHOWING_RESULTS,
	waitingResults: true,
	foundCombos: { combos: [], priceRangeMax: 90000 }
}

const flightBooking = (state = initialSearchState, action) => {
	switch(action.type) {
		case ADD_PASSENGER:
			let passengersAdded = [...state.passengers, {ageRange:action.ageRange}]
			return { ...state, waitingResults: true, passengers: passengersAdded, foundCombos: {...state.foundCombos, combos: [] } }
		case REMOVE_PASSENGER:
			let passengersRemoved = [...state.passengers]
			for(let i=1;i<state.passengers.length;i++) { // At least one passenger is required, so we don't iterate through the first one (the Adult)
				if(state.passengers[i].ageRange === action.ageRange) {
					passengersRemoved.splice(i,1)
					break;
				}
			}
			return { ...state, waitingResults: true, passengers: passengersRemoved, foundCombos: {...state.foundCombos, combos: [] } }
		case SET_AIRPORT:
			let flight = {...state.flight}
			flight[action.section] = action.airport
			return { ...state, waitingResults: true, flight: flight, foundCombos: {...state.foundCombos, combos: [] } }
		case SET_ROUNDTRIPS:
			let foundCombos = action.roundtrips
			return { ...state, waitingResults: false, foundCombos: foundCombos, showingResults: SHOWING_RESULTS }
		case SET_TOPPRICE:
			let topPrice = action.price
			return { ...state, waitingResults: true, topPrice: topPrice, foundCombos: { ...state.foundCombos, combos: [] } }
		case SET_SHOWINGRESULTS:
			let showingResults = action.show
			return { ...state, showingResults: showingResults}
		default:
			return state;
	}
}

export default flightBooking;