const token = 'abc@123';

module.exports = checkToken = (req,res,next)=>{
    // const key = req.query.key;
    
    if(!req.query.key)
    {
        res.send('Please provoide a key');
    }
    else if(token != req.query.key)
    {
        res.send('Please provoide a valid key');
    }
    else
    {
        next();
    }


};