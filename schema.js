const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema} = require('graphql');
const db = require('./db/db');


db.connect((err) => {
    if (err) {
        console.log('Unable to connect to DB', err);
    } else {
        console.log('Connected to db');
    };
});

const PatientType = new GraphQLObjectType({
    name: 'Patient',
    fields: () => ({
        // patient_number: {type: GraphQLString},
        date: {type: GraphQLString},
        status: {type: GraphQLString},
        cases: {type: GraphQLString}
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        patients: {
            type: new GraphQLList(PatientType),
            async resolve(parent, args) {
                try {
                    const data = await db.getDB().collection('patient').find().toArray();
                    return data;
                } catch (e){
                    console.log('Error happened');
                }
            }
        }, 
        patientsbydate: {
            type: new GraphQLList(PatientType),
            args: {
                month: {type: GraphQLString}
            },
            async resolve(parent, args) {
                try {
                    const data = await db.getDB().collection('patient').find({date: {'$regex' : args.month, '$options' : 'i'}}).toArray();
                    return data;
                } catch (e){
                    console.log('Error happened');
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});