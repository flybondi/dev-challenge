import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { request } from 'graphql-request';
import { connect } from 'react-redux';
import { setAirportList } from './../FlightBooking/FlightBookingActions';
/* ROUTING COMPONENTS */ 
import FlightBookingQuickStart from './../FlightBooking/FlightBookingQuickStart'
import FlightBookingSearch from './../FlightBooking/FlightBookingSearch'

class AppComp extends Component {
	componentDidMount() {
		request('/graphql', `{airports {iata,city}}`).then(data => {
			let airportList = data.airports.map(airport => {
				return {value:airport.iata,label:airport.city}
			})
			this.props.setAirportList(airportList)
		})
	}

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

const mapStateToProps = (state) => {
	return {}
}


const mapDispatchToProps = dispatch => {
	return {
		setAirportList: (list) => {
			dispatch(setAirportList(list))
		}
	}
}

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppComp);

export default App;
