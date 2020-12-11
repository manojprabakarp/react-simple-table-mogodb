"use strict"
const MongoClient = require('mongodb').MongoClient;
const { ConnectionString } = require('mongo-connection-string');

const WORDS_PATH = "/dictinorywords";

const connectionString = new ConnectionString({
    protocol: process.env.protocol,
    username: process.env.uname,
    password: process.env.password,
    hosts: [{ host: process.env.hosts }],
    options: {
        retryWrites: process.env.retryWrites,
        w: process.env.w
    }
});

const getWords = async (request, respose) => {

    const client = new MongoClient(connectionString.toURI(), { useUnifiedTopology: true });
    client.connect(async err => {
        const collection = client.db(process.env.database).collection(process.env.collection);
        let result = await collection.find().toArray();
        respose.send(result);
    });

}

exports.init = (app) => {
    app.get(WORDS_PATH, getWords);
}
