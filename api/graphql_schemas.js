import { buildSchema } from 'graphql';
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

export default schema;