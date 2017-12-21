import React from 'react';
import { connect } from 'react-redux';
import { setShowResults } from '../FlightBookingActions'

const FlightsListComp = ({direction, foundCombos, showingResults, setShowResults, waitingResults}) => {
	let totalRows = foundCombos.combos.length;
	let showingCombos = [];
	let showLoader = <div/>
	let showMoreButton = <div />
	let showNoResults = <div />
	for(let i=0;i<totalRows;i++) {
		showingCombos = [...showingCombos, foundCombos.combos[i]]
		if(i===showingResults)
			break;
	}
	if(waitingResults) {
		showLoader = <div className="spinner"></div>
	} else {
		showLoader = <div />
		if(showingResults<totalRows)
			showMoreButton = <button className="load-more" onClick={() => setShowResults(showingResults+10)}>cargar más resultados</button>
	}
	if(!waitingResults&&totalRows===0) {
		showNoResults = <div>No se encontraron resultados :( </div>
	}

	return	<div>
			{showLoader}
			{showNoResults}
			{showingCombos.map((item,key) => {
				let outwardDate = new Date(item.outward.date);
				let returnDate = new Date(item.return.date);

				let mm = outwardDate.getMonth() + 1;
				let dd = outwardDate.getDate();

				let mmRet = returnDate.getMonth() + 1; 
				let ddRet = returnDate.getDate();

				return	<div key={key} className="flight-combo">
							<div className="square-box">
								<div>
									<span className="date">{dd}/{mm} - {ddRet}/{mmRet}</span>
									<span className="price">${item.price}</span>
								</div>
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
		foundCombos: state.flightBooking.foundCombos,
		showingResults: state.flightBooking.showingResults,
		waitingResults: state.flightBooking.waitingResults
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setShowResults: (show) => {
			console.log('a')
			dispatch(setShowResults(show))
		}
	}
}

const FlightsList = connect(
	mapStateToProps,
	mapDispatchToProps
)(FlightsListComp);

export default FlightsList;