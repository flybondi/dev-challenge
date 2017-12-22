import sqlite3 from 'sqlite3';
import fs from 'fs';
import dijkstra from 'node-dijkstra';

const db = new sqlite3.Database(':memory:');
const FlightsDataset = JSON.parse(fs.readFileSync('../dataset.json', 'utf8'));
const dijkstraCalc = new dijkstra()

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

	db.run("CREATE TABLE bestfares (origin TEXT, destination TEXT, price REAL)");
	insertQuery = db.prepare("INSERT INTO bestfares VALUES (?,?,?)");
	let airports = ['EPA','COR','MDZ','BRC'];
	let travelCombinations = [];
	for(let origin_i=0;origin_i<airports.length;origin_i++) {
		for(let dest_i=0;dest_i<airports.length;dest_i++) {
			if(origin_i!==dest_i)
				travelCombinations.push([airports[origin_i],airports[dest_i]])
		}
	}
	for(let i=0;i<travelCombinations.length;i++) {
		let trip = dijkstraCalc.path(travelCombinations[i][0], travelCombinations[i][1], { cost: true })
		if(trip.path!==null) {
			let round = dijkstraCalc.path(travelCombinations[i][0], travelCombinations[i][1], { reverse:true, cost: true })
			if(round.path!==null) {
				let minFare = parseFloat(trip.cost)+parseFloat(round.cost)
				insertQuery.run(travelCombinations[i][0],travelCombinations[i][1],minFare)
			}
		}
	}
	insertQuery.finalize();

});

export default db