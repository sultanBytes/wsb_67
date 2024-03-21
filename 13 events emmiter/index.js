const express = require('express');
const EventEmitter = require('events');
const cors = require('cors');

const app = express();

app.use(cors());

const event = new EventEmitter();

let count = 0;
event.on('sultan',()=>{
    count++;
    console.log(count++);
});

app.get('/',async(req,res)=>{
    event.emit('sultan');
    res.send('hello');
});

app.get('*',(req,res)=>{
    res.send('404  Not Found!');
});

app.listen(5000);