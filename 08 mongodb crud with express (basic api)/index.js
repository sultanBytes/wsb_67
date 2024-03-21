const db = require('./db');
const express = require('express');
const mongodb = require('mongodb');

const app = express();
app.use(express.json());

const connect = async()=>{
    const abc = await db();
    console.log(abc)
};

// connect();
app.post('/insertdata',async(req,res)=>{
    try{
        const data = req.body;
         console.log(data);
        const database = await db();
    const collection = database.collection('users');

    const response = await  collection.insertOne(data);
    // console.log(response);
    console.log(`Inserted user with ID : ${response.insertedId}`);
    res.json({messege:'datainserted successfully',data:response});
}
catch(err){
    console.log(err);
    res.json({messege:'Internal server error'});
}
});


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
app.put('/updatedata/:name',async(req,res)=>{
    try{
        const {name} = req.params;
        // console.log(name);
        const database = await db();
        const collection = database.collection('users');
    
        const response =await collection.updateOne(
            {name:name},
            {
                $set:req.body
            }
        );
    
        console.log(response);
        res.json({messege:'Data updated successfully',data:response});
    }
    catch(err){
        console.log(err);
    res.json({messege:'Internal server error'});
    }
});

app.get('/readdata',async(req,res)=>{
    try{
        const database = await db();
        const collection = database.collection('users');
        const response = await collection.find().toArray();
        console.log(response);
        res.json(response);
    }
    catch(err){
        console.log(err);
        res.json({messege:'Internal server error'});
    }
});

app.get('/readonedata/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const database = await db();
        const collection = database.collection('users');
        const response = await collection.find({
            _id: new mongodb.ObjectId(id)
        }).toArray();
        console.log(response);
        res.json(response);
    }
    catch(err){
        console.log(err);
        res.json({messege:'Internal server error'});
    }
});


app.listen(5000,()=>{
    console.log('Server is running on port 5000');
});