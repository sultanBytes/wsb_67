const { MongoClient  } = require('mongodb');
const url = 'mongodb://localhost:27017';
const db = 'wsb_67';
const  client = new MongoClient(url);

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('letrners');
  
    // the following code examples can be pasted here...
  
    return 'done.';
  };

  main();
  