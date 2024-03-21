const {MongoClient} = require('mongodb');
const dbname = 'wsb_67';
const url = "mongodb://localhost:27017";

const connection = new MongoClient(url);

const connectionDb = async()=>{
    try{
        await connection.connect();

        const db = connection.db(dbname);
        console.log('Server connected successfully');

        return db;
        
    }
    catch(err){
        console.log(err);
    }
};

module.exports = connectionDb;