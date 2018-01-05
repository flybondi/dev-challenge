import express from 'express';
import graphqlHTTP from 'express-graphql';
import * as path from 'path';
import db from './fakeDB';
import schema from './graphql_schemas';
import graphql_root from './graphql_root';

/**
 * Express Routing 
 */
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', process.env.REACT_ROUTE));
});

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: graphql_root,
	graphiql: true
}));

app.listen(process.env.PORT);

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