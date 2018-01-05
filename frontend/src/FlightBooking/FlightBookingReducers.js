import { ADD_PASSENGER, REMOVE_PASSENGER, SET_AIRPORT, SET_ROUNDTRIPS, SET_TOPPRICE, SET_SHOWINGRESULTS, SET_AIRPORTLIST, SHOWING_RESULTS, TOP_PRICE, SET_DATEFOCUSEDINPUT, SET_DATE, SET_FLEXIBLEDATES } from './FlightBookingTypes'
import moment from 'moment';

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
		destination: false,
		flexible: true,
		startDate: moment().add(1, 'days'),
		endDate: moment().add(7, 'days')
	},
	passengers: [
		{
			ageRange: 'adult'
		}
	],
	topPrice: TOP_PRICE,
	showingResults: SHOWING_RESULTS,
	waitingResults: true,
	foundCombos: { combos: [], priceRangeMax: 90000 },
	airports: []
}

const flightBooking = (state = initialSearchState, action) => {
	switch(action.type) {
		case ADD_PASSENGER:
			return { ...state, waitingResults: true, passengers: [...state.passengers, {ageRange:action.ageRange}], foundCombos: {...state.foundCombos, combos: [] } }
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
			return { ...state, waitingResults: true, flight: {...state.flight, [action.section]:action.airport}, foundCombos: {...state.foundCombos, combos: [] } }
		case SET_ROUNDTRIPS:
			return { ...state, waitingResults: false, foundCombos: action.roundtrips, showingResults: SHOWING_RESULTS }
		case SET_TOPPRICE:
			return { ...state, waitingResults: true, topPrice: action.price, foundCombos: { ...state.foundCombos, combos: [] } }
		case SET_SHOWINGRESULTS:
			return { ...state, showingResults: action.show}
		case SET_AIRPORTLIST:
			return { ...state, airports: action.list}
		case SET_DATE: 
			return { ...state, flight: {...state.flight, startDate: action.startDate, endDate: action.endDate }}
		case SET_DATEFOCUSEDINPUT:
			return { ...state, waitingResults: true, flight: {...state.flight, focusedInput: action.focusedInput}, foundCombos: {...state.foundCombos, combos: [] } }
		case SET_FLEXIBLEDATES:
			return { ...state, flight: {...state.flight, flexible: action.checked }}
		default:
			return state;
	}
}

export default flightBooking;