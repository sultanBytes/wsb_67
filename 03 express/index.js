const express = require('express');
const path = require('path');

const folder = path.join(__dirname,'files');

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    let abc = req.query;
    console.log(abc)
    res.send('Hello World!')
});

app.post('/',(req,res)=>{
    res.send('hello class');
});

app.get('/hello',(req,res)=>{
    res.send(`
    <h1>Hello everyone</h1>
    `)
});

app.post('/insert_data',(req,res)=>{
   const abc = req.body;
   console.log(abc);
//    res.send(data);
res.status(200).json({msg:'Data inserted',sultan:abc});
    // res.json({msg:'Data inserted',sultan:abc})

});

app.get('/home',(req,res)=>{
    res.sendFile(`${folder}/hello.html`);
})

app.get('/about',(req,res)=>{
    res.sendFile(`${folder}/about.html`);
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});