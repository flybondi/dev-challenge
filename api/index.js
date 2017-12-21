import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import fs from 'fs';
import * as path from 'path';
import GraphDB from 'node-dijkstra'; // Let's "simulate" we have a Neo4j DB
import sqlite3 from 'sqlite3';
import _ from 'lodash';

/**
 * Init
 * For demo purposes i'll use a SQLite3 DB instead a MySQL or PostgreSQL
 */
const db = new sqlite3.Database(':memory:');
const FlightsDataset = JSON.parse(fs.readFileSync('../dataset.json', 'utf8'));
const dijkstraCalc = new GraphDB()

db.serialize(function() {
	db.run("CREATE TABLE flights (origin TEXT, destination TEXT, price REAL, availability INTEGER, date TEXT)");
	
	let insertQuery = db.prepare("INSERT INTO flights VALUES (?,?,?,?,?)");
	for(let i=0;i<FlightsDataset.length;i++) {
		let insertValues = [
			FlightsDataset[i].origin,
			FlightsDataset[i].destination,
			FlightsDataset[i].price,
			FlightsDataset[i].availability,
			FlightsDataset[i].data // typo in the dataset, beware when replacing it
		]
		insertQuery.run(insertValues) // Into SQLite3

		dijkstraCalc.addNode(FlightsDataset[i].origin, { [FlightsDataset[i].destination]:FlightsDataset[i].price }) // Into Graph DB
	}
	insertQuery.finalize();

	db.run("CREATE TABLE airports (iata TEXT, city TEXT)");
	insertQuery = db.prepare("INSERT INTO airports VALUES (?,?)");
	insertQuery.run('EPA','Buenos Aires')
	insertQuery.run('COR','Corrientes')
	insertQuery.run('MDZ','Mendoza')
	insertQuery.run('BRC','Bariloche')
	insertQuery.finalize();
});

/**
 * GraphQL 
 */
const schema = buildSchema(`
	type Query {
		flight(id: Int): Flight,
		airports: [Airport],
		leavingFrom(airport: String): [Flight]
		roundtrips(origin: String, destination: String, pax: Int, topPrice: Float = 0): Roundtrip
	}
	type Airport {
		iata: String,
		city: String
	}
	type Flight {
		origin: String,
		destination: String,
		destinationCity: String,
		price: Float,
		availability: Int,
		date: String
	}
	type Roundtrip {
		combos: [FlightCombo],
		priceRangeMax: Int
	}
	type FlightCombo {
		price: Float,
		outward: Flight,
		return: Flight,
	}
`);

const rootValue = {
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
			db.all("SELECT * FROM airports", (err, airports) => {  
				let lowestFares = []
				for(let i=0;i<airports.length;i++) {
					if(airport!==airports[i].iata) {
						let trip = dijkstraCalc.path(airport, airports[i].iata, { cost: true })
						if(trip.path!==null) {
							let round = dijkstraCalc.path(airport, airports[i].iata, { reverse:true, cost: true })	
							if(round.path!==null) {
								let minFare = parseFloat(trip.cost)+parseFloat(round.cost)
								lowestFares = [...lowestFares, {
									destination: airports[i].iata,
									price: minFare,
									destinationCity: airports[i].city
								}]
							}
						}
					}
				}
				resolve(lowestFares)
			});
		});
	},
	/**
	 * Roundtrips combinations
	 */
	roundtrips: ({origin, destination, pax, topPrice}) => {
		return new Promise((resolve, reject) => {
			db.all(`SELECT * FROM flights WHERE (availability >= ${pax} AND origin='${origin}' AND destination='${destination}') OR  (availability >= ${pax} AND origin='${destination}' AND destination='${origin}') ORDER BY date ASC`, (err, flights) => {
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

/**
 * Express Routing 
 */
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: rootValue,
	graphiql: true
}));

app.listen(4000);

/**
 * Kill or Close detection
 */
process.stdin.resume();

function exitHandler(options, err) {
	db.close();
	if (options.cleanup) console.log('clean');
	if (err) console.log(err.stack);
	if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));