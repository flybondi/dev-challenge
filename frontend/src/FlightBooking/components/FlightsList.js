import React from 'react';
import { connect } from 'react-redux';

const FlightsListComp = ({direction, foundCombos}) => {
	let showing = 10;
	let totalRows = foundCombos.combos.length;
	let showingCombos = [];
	let showLoader = <div/>
	let showMoreButton = <div />
	for(let i=0;i<totalRows;i++) {
		showingCombos = [...showingCombos, foundCombos.combos[i]]
		if(i===showing)
			break;
	}
	if(totalRows===0) {
		showLoader = <div className="spinner"></div>
	} else {
		showLoader = <div />
		if(showingCombos.length<=totalRows)
			showMoreButton = <button className="load-more">cargar más resultados</button>
	}

	return	<div>
			{showLoader}
			{showingCombos.map((item,key) => {
				return	<div key={key} className="flight-combo">
							<div className="price">
								<span>${item.price}</span>
							</div>
							<div className="flight-combination">
								<div className="trip-part">
									<b>{item.outward.origin}</b> 22:00 <span><i className="fa fa-plane rotated" aria-hidden="true"></i></span> <b>{item.outward.destination}</b> 23:00
								</div>
								<hr />
								<div className="trip-part">
									<b>{item.return.origin}</b> 12:00 <span><i className="fa fa-plane rotated" aria-hidden="true"></i></span> <b>{item.return.destination}</b> 08:00
								</div>
							</div>
							<div className="callToAction">
								<button>comprar</button>
							</div>
						</div>
			})}
			{showMoreButton}
			</div>
}

const mapStateToProps = state => {
	return {
		foundCombos: state.flightBooking.foundCombos
	}
}

const mapDispatchToProps = dispatch => {
	return {
//		setFlightCombos: (combos) => {
//			dispatch(setFlightCombos(combos))
//		}
	}
}

const FlightsList = connect(
	mapStateToProps,
	mapDispatchToProps
)(FlightsListComp);

export default FlightsList;