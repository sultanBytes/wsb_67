const express = require('express');
const app = express();
const token = 'abc@123';

const checkToken = require('./middleware');

app.use(express.json());

// const checkToken = (req,res,next)=>{
//     // const key = req.query.key;
    
//     if(!req.query.key)
//     {
//         res.send('Please provoide a key');
//     }
//     else if(token != req.query.key)
//     {
//         res.send('Please provoide a valid key');
//     }
//     else
//     {
//         next();
//     }


// };

const postToken = (req,res,next)=>{
    const data = req.body.key;
    if(!data)
    {
        res.status(200).json('please provoide key');
    }
    else if(data != token)
    {
        res.status(200).json('please provoide a valid key');
    }
    else
    {
        next();
    }
    // res.status(200).json('done');
}

app.get('/',checkToken,(req,res)=>{
    res.status(200).json( {message: 'Welcome to the API'})
});


app.post('/',postToken,(req,res)=>{
    res.json({message : 'done'});
});

app.listen(5000,()=>{
    console.log('app is running on port 5000');
})