const db = require('./db');

const connect = async()=>{
    const abc = await db();
    console.log(abc)
};

// connect();

const insertdata = async()=>{
    const database = await db();
    const collection = database.collection('users');

    const response = await  collection.insertOne({name:'John Doe', age:30});
    console.log(response);
    console.log(`Inserted user with ID : ${response.insertedId}`);
};

// insertdata();

const insertdataMany = async ()=>{
    const database = await db();
    const collection = database.collection('users');
    const response = await collection.insertMany([
        {
            "name":"abc",
            "email":"test@abc.com",
            "contact":"000000000"
        },
        {
            "name":"abc",
            "email":"test@abc.com",
            "contact":"000000000"
        }
        ,{
            "name":"abc",
            "email":"test@abc.com",
            "contact":"000000000"
        }
        ,{
            "name":"abc",
            "email":"test@abc.com",
            "contact":"000000000"
        }
    ]);
    console.log(response);
};

// insertdataMany();

const  updatedata = async ()=>{
    const database = await db();
    const collection = database.collection('users');

    const response =await collection.updateOne(
        {name:"abc"},
        {
            $set:{name:"janki"}
        }
    );

    console.log(response);
};


// updatedata();