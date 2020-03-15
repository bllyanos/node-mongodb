const express = require('express');
const mongo = require('./core/mongo');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
	const usersCollection = await mongo.getCollection('users');
	const users = await usersCollection.find({});
	res.json(await users.toArray());
});

app.get('/add', async (req, res) => {
	try {
		const name = req.query.name;
		const age = req.query.age;
		if (!name) throw new Error("MissingField:name");
		if (!age) throw new Error("MissingField:age");
		const usersCollection = await mongo.getCollection('users');
		const user = {
			name,
			age
		};
		const result = await usersCollection.insertOne(user);
		res.json(result);
	} catch (err) {
		if (err.message.includes("MissingField")) {
			res.status(400).json(err.message);
		} else {
			res.sendStatus(500);
		}
	}
});

app.listen(3000);