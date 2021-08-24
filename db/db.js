const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const dbname = 'covid_mongodb';
const url = 'mongodb://localhost:27017';
const mongoOptions = {useUnifiedTopology: true};

const state = {
    db: null,
};

const connect = (cb) => {
    if (state.db) {
        cb();
    } else {
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if (err) {
                cb(err);
            } else {
                state.db = client.db(dbname);
                cb();
            };
        });
    };
};

const getPrimaryKey = (_id) => {
    return ObjectId(_id);
};

const getDB = () => {
    return state.db;
};

module.exports = {getDB, connect, getPrimaryKey};