import React from 'react';
import { connect } from 'react-redux';
import { setAirport } from './../FlightBookingActions';

const LowestFaresComponent = ({fares, setAirport}) => {
	return	<div className="special-fare-wrapper">
			{fares.map((fare, key) => {
				let thisBoxStyle = {
					backgroundImage: `url(http://localhost:4000/places/${fare.destination}.png)`
				}
				return	<div key={key} className="special-fare-box" style={thisBoxStyle} onClick={() => setAirport({value:fare.destination,label:fare.destinationCity},'destination')}>
							<div className="text-wrapper">
								<div className="destination">A {fare.destinationCity}</div>
								<div className="from">Desde ${fare.price}</div>
							</div>
						</div>
			})}
			</div>
}

const mapStateToProps = state => {
	return {

	}
}

const mapDispatchToProps = dispatch => {
	return {
		setAirport: (value,type) => {
			dispatch(setAirport(value,type))
		}
	}
}

export const LowestFares = connect(
	mapStateToProps,
	mapDispatchToProps
)(LowestFaresComponent);