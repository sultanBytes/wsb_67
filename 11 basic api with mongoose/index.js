const express = require('express');
require('./config');
const User = require('./models/User');


const port = 5000;

const app = express();
app.use(express.json());

app.post('/insertdata',async(req,res)=>{
    const data = req.body;
    console.log(data);

    const user = new User(data);
    const response =await user.save();
    res.status(200).json({messege:'api called',data:response});
});

app.delete('/deletedata/:_id',async(req,res)=>{
    // const q = req.query;
    const p = req.params;
    console.log(p);

    const response =await User.deleteOne(req.params);
    res.json({messege:'api called',data:response});
});

app.put('/updatedata/:_id',async(req,res)=>{
    const data = req.body;
    console.log(data);

    // const user = new User(data);
    const result = await User.updateOne(
        req.params,
        {$set:data}
    );

    res.json({messege:'data updated',data:result});
});

app.get('/readdata',async(req,res)=>{
    const data = await User.find();
    res.json({data:data});
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});