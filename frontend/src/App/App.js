import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import FlightBookingQuickStart from './../FlightBooking/FlightBookingQuickStart'
import FlightBookingSearch from './../FlightBooking/FlightBookingSearch'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="router-container">
					<Route exact path="/" component={FlightBookingQuickStart} />
					<Route path="/search" component={FlightBookingSearch} />
				</div>
			</Router>
		);
	}
}

export default App;
