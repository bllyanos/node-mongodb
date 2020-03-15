const mongodb = require('mongodb');

const mongoClient = new mongodb.MongoClient("mongodb://mongo:27017/docker-mongo", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

async function getCollection(name) {
	if (!mongoClient.isConnected()) {
		await mongoClient.connect();
	}
	return mongoClient.db('docker-mongo').collection(name);
}

module.exports = {
	getCollection
}