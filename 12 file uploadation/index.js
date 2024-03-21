const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wsb_67');

const dataSchema = new mongoose.Schema({
    name:String,
    price:String,
    thumbnail:String,
    images:Object
});

const Data = mongoose.model('files', dataSchema);

const app = express();
const port = 6500;
app.use(express.json());

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination:function(req,file,cb)
    {
        cb(null,'uploads');
    },
    filename:function(req,file,cb)
    {
        const fileName = Date.now() + file.originalname;
        cb(null,fileName);
    }
});

const upload = multer({ storage: storage }).fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 5 }
]);

// app.get('/',upload.none(),(req,res)=>{
//     const {key, key2, key3} = req.body;
//     console.log(key, key2, key3);
//     res.send('api called');
// });

app.post('/insert_data',upload,async(req,res)=>{

    const data = req.body;
    const files = req.files;
    // console.log(files);

    const thumbnail = files.thumbnail[0].filename;
    let images = [];

   const imgs = files.images;
   imgs.forEach((img)=>{
    images.push(img.filename);
   });

   console.log(thumbnail,images);

    const fileData = new Data({
        name : data.name ,
        price : data.price ,    
        thumbnail:thumbnail,
        images:images

    });

    const result = await fileData.save();
    res.send(result);
});

app.get('/readdata',async(req,res)=>{
    const datas=await Data.findById('65d6d4f267c2f8bb9ae9f445');
    console.log(req.protocol)
    console.log(req.get('host'));

    

    const path = `${req.protocol}://${req.get('host')}/uploads`; 
    res.json({messege:'Got data',data:datas,path:path});

    
});




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});