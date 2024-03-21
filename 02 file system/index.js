const http = require('http');
const path = require('path');
const fs = require('fs');

const folder = path.join(__dirname, 'files');

const filePath = `${folder}/hello.txt`;

const api = require('./app');

const serverFunction = (req,res)=>{
    res.write(JSON.stringify(api));
    res.end();
};

http.createServer(serverFunction).listen(5000);
// fs.writeFileSync(filePath,'hello everyone changed');

// fs.readFile(filePath,'utf-8',(err,file)=>{
//     if(!err){
//         console.log(file);
//     }
    
// });
// fs.appendFileSync(filePath,' this data is updated');


// fs.unlinkSync(filePath);
