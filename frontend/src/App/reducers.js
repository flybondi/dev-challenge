import { combineReducers } from 'redux'
import flightBooking from './../FlightBooking/FlightBookingReducers'

const appReducers = combineReducers({
	flightBooking
})

export default appReducers