const http = require('http');
const express = require('express');


console.log(__dirname);

const serverFunction = (req,res)=>{
    // res.write('hello this is my server');
    res.end(JSON.stringify({name:'ali',age:25}));
};

http.createServer(serverFunction).listen(5000);