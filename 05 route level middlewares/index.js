const express = require('express');
const app = express();
const route = express.Router();

const middelware1 = (req,res,next)=>{
    console.log('middleware called');
    next();
};

const middelware2 = (req,res,next)=>{
    console.log('2 called');
    next();
}

const middlewareRoute = (req,res,next)=>{
    console.log('route level middleware');
    next();
};
app.use(middlewareRoute,middelware1,middelware2);
app.get('/',[middelware1,middelware2],(req,res)=>{
    res.json({messege:'hello world!'});
});

route.get('/home',(req,res)=>{
    res.send('route level')
});
route.post('/post',(req,res)=>{
    res.send('hello');
})

app.use('/',route);
app.listen(5000,()=>{
    console.log('Server is running on 5000');
})