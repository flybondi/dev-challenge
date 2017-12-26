import db from './fakeDB';
import _ from 'lodash';
import moment from 'moment';

const root = {
	/**
	 * Load balancer check
	 */
	status: () => {
		return 'Healthy';
	},
	/**
	 * Flight Info
	 */
	flight: ({id}) => {
		return FlightsDB[id];
	},
	/**
	 * All airports
	 */
	airports: () => {
		return new Promise((resolve, reject) => {
			db.all("SELECT * FROM airports", (err, rows) => {  
				resolve(rows)
			});
		});
	},
	/**
	 * Lowest fares leaving from AIRPORT
	 */
	leavingFrom: ({airport}) => {
		// TO-DO: Should check dates don't overlap and are correct. Also, remove this horrible nesting.
		return new Promise((resolve, reject) => {
			db.all(`SELECT bestfares.price, bestfares.destination, airports.city AS destinationCity
					FROM bestfares INNER JOIN airports ON bestfares.destination = airports.iata
					WHERE origin = '${airport}'`, (err, results) => {  
				resolve(results)
			});
		});
	},
	/**
	 * Roundtrips combinations
	 */
	roundtrips: ({origin, destination, pax, topPrice, startDate, endDate, flexible}) => {
		return new Promise((resolve, reject) => {
			let startDateQuery = '';
			let endDateQuery = '';
			if(!flexible) {
				startDateQuery = `AND date="${startDate}"`;
				endDateQuery = `AND date="${endDate}"`;
			} else {
				let startDateStart = moment(startDate).subtract(5, 'days').format('YYYY-MM-DD');
				let startDateEnd = moment(startDate).add(5, 'days').format('YYYY-MM-DD');
				let endDateStart = moment(endDate).subtract(5, 'days').format('YYYY-MM-DD');
				let endDateEnd = moment(endDate).add(5, 'days').format('YYYY-MM-DD');

				startDateQuery = `AND date BETWEEN "${startDateStart}" AND "${startDateEnd}"`;
				endDateQuery = `AND date BETWEEN "${endDateStart}" AND "${endDateEnd}"`;
			}
			db.all(`SELECT * FROM flights 
					WHERE (availability >= ${pax} AND origin='${origin}' AND destination='${destination}' ${startDateQuery}) 
					OR  (availability >= ${pax} AND origin='${destination}' AND destination='${origin}' ${endDateQuery}) 
					ORDER BY date ASC LIMIT 100`, (err, flights) => {
				let outwardflights = []
				let returnflights = []
				let combos = []
				let priceRangeMax = 0;
				for(let i=0;i<flights.length;i++) {
					if(flights[i].origin===origin) 
						outwardflights.push(flights[i])
					else
						returnflights.push(flights[i])
				}
				_.forEach(outwardflights, (out) => {
					let outDate = new Date(out.date+'T00:00:00Z')
  					_.forEach(returnflights, (ret) => {
  						let retDate = new Date(ret.date+'T00:00:00Z')
  						let comboPrice = (out.price+ret.price).toFixed(2);
  						if(comboPrice>priceRangeMax)
  							priceRangeMax = comboPrice;
  						if(outDate < retDate) {
  							if(topPrice===0) 
  								combos = [...combos, {price: comboPrice, outward:out, return:ret}]
  							else if((comboPrice)<=topPrice)
  								combos = [...combos, {price: comboPrice, outward:out, return:ret}]
  						}
  					})
				});
				resolve({combos:combos,priceRangeMax:Math.ceil(priceRangeMax)})
			})  
		})
	}
	
};

export default root;