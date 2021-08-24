const db = require('./db');
const collectionName = 'patient';
const express = require('express');
const app = express();

const csvtojson = require('csvtojson');

db.connect((err) => {
    if (err) {
        console.log('Unable to connect to DB', err);
        process.exit(1);
    } else {
        app.listen(3000, ()=> {
            console.log('Connected to DB, listening on PORT 3000');
        });
    };
});

const addToDb = (fileName) => {
    let arrayToInsert = [];
    csvtojson().fromFile(fileName).then(source => {
        // Fetching the all data from each row
        for (let i = 0; i < source.length; i++) {
             let oneRow = {
                // patient_number: source[i]['Patient Number'],
                date: source[i]['Date Announced'],
                status: source[i]['Current Status'],
                cases: source[i]['Num Cases'],
             };
             arrayToInsert.push(oneRow);
         }
         //inserting into the table patient”
         let collection = db.getDB().collection(collectionName);
         collection.insertMany(arrayToInsert, (err, result) => {
             if (err) console.log(err);
             if(result){
                 console.log('Import CSV into database successfully.');
             }
         });
    });
};

for (let i=0; i<=24; i++) {
    const fileName = `../covid_data/raw_data${i}.csv`;
    addToDb(fileName);
};




