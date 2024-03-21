const express = require('express');
require('./config');
const Admin = require('./models/Admin');
const cors = require('cors');
const multer = require('multer');
const Course = require('./models/Cousre');
const Video = require('./models/Video');
const fs = require('fs');
const JWT = require('jsonwebtoken');
const jwtKey = 'wsb_67';

const path = require('path');
const app = express();
const port = 5500;
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname);
    }
});

const upload = multer({storage:storage}).single('image');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//verify jwt

const verifyJwt = (req, res, next) => {
    let auth = req.headers.authorization;
    auth =  auth.split(' ')[1];
    
    if(!auth) return  res.status(401).json({messege:'You are not logged in'});

    JWT.verify(auth,jwtKey,(err,decode)=>{
        if(err) return  res.status(402).json({messege:'Something went wrong'});

        req.decode =  decode;
        next();

    })

}

//log in api
app.post('/login',async(req,res)=>{
    const {username, password} = req.body;
    console.log(username , password);
    
    try{
        const userdata = await Admin.find({username:username});
        console.log('api called');
        
        if(userdata.length === 0)
        {
            return res.status(404).json({status:false, messege:'User not foound'});
        }

        if(userdata[0].password !== password)
        {
            return res.status(501).json({status:false, messege:'Password not match'});
        }

        JWT.sign({userdata}, jwtKey, {expiresIn: 60*60*24*7}, (error, token)=>{
            if(error){
                res.status(202).json({status:false, messege:"Something went wrong"});
            }
            else
            {
                res.status(200).json({status:true, messege:"log in successful", data:userdata, auth: token});
            }
        })

        
    }
    catch(err){
        res.status(500).json({status:false, messege:'internal server errror'});
    }
});

app.post('/addcourse',upload,async(req,res)=>{
    const {coursename, courseprice, courseduration, coursedes, cousrestatus} = req.body;
    // console.log(data)
    const courseimage = req.file.filename;

    const  newCourse = new Course({
        coursename,
        courseprice,
        courseduration,
        coursedes,
        courseimage,
        cousrestatus: cousrestatus === 'true'

    });

    try{
        const response = await newCourse.save();
        res.status(200).json({messege:'data inserted successfully', data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({messege:'internal server error'});
    }

    // console.log(data,img);
    // res.json({messege:'api called'});
});

app.get('/viewcourse', verifyJwt, async(req,res)=>{
   


    try{
        const courses = await Course.find();
       const finalCourses = courses.map((course)=> ({
        ...course._doc, courseimage: `${req.protocol}://${req.get('host')}/uploads/${course.courseimage}`
       }));
        res.status(200).json({messege:'data fetched successfully', data:finalCourses});
    }
    catch(err){
        console.log(err);
        res.status(500).json({messege:'Intenal server error'});
    }
});

app.get('/searchcourse/:searchKey', async(req,res)=>{
    let searchKey= req.params.searchKey;
    try{
        const courses = await Course.find({
            $or:[
                {coursename:{$regex: new RegExp(searchKey,"i")}},
                {courseprice:{$regex: new RegExp(searchKey,"i")}}, 
                {courseduration:{$regex: new RegExp(searchKey,"i")}},
                {coursedes:{$regex: new RegExp(searchKey,"i")}}
            ]
        });

        const finalCourses = courses.map((course)=> ({
            ...course._doc, courseimage: `${req.protocol}://${req.get('host')}/uploads/${course.courseimage}`
           }));
        res.status(200).json({messege:'data fetched successfully', data:finalCourses});
    }
    catch(err){
        console.log(err);
        res.status(500).json({messege:'Intenal server error'});
    }
});

app.get('/viewcoursetrue', async(req,res)=>{
    try{
        const courses = await Course.find({cousrestatus:true});
        res.status(200).json({messege:'data fetched successfully', data:courses});
    }
    catch(err){
        console.log(err);
        res.status(500).json({messege:'Intenal server error'});
    }
});

app.get('/coursebyid/:id', async(req,res)=>{
    let id= req.params.id;

    try{
        let course = await Course.findById(id).lean();
        course = {...course,courseimage : `${req.protocol}://${req.get('host')}/uploads/${course.courseimage}`};
        if(!course)
        {
            return res.status(404).json({messege:"Data not found"});
        }

        res.status(200).json({messege:"Data fetched!", data:course});

    }
    catch(err){
        console.log(err);
        res.status(500).json({messege:"Something went wrong"});
    }
});

app.put('/changecoursestatus/:id', async(req,res)=>{
    const id = req.params.id;
    const statusdata = req.body.newstatus;

    console.log(id, statusdata);
    // res.send('hello');

    try{
        const course = await Course.findById(id);

        if(!course) return  res.status(404).json({messege:'No course with this ID'});

        const updRes = await Course.updateOne(
            {_id:id},
            {$set:{cousrestatus:statusdata}}
        );

        res.status(200).json({messege:'Data updated successfully', data:updRes});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({messege:'Internal server error'});
    }
});

app.put('/updatecourse/:_id', upload, async(req,res)=>{
    const {coursename, courseprice, courseduration, coursedes, cousrestatus} = req.body;
    const newcourseimage = (req.file === undefined) ? null : req.file.filename;

    console.log(newcourseimage);

    

    let newData;

    if(newcourseimage == null){
        newData =  {
                        coursename,
                        courseprice,
                        courseduration,
                        coursedes,
                        cousrestatus
                    }
    }
    else
    {
        const {courseimage} = await Course.findById(req.params._id);
        console.log(courseimage);

        fs.unlinkSync(`${__dirname}/uploads/${courseimage}`);

        newData =  {
            coursename,
            courseprice,
            courseduration,
            coursedes,
            courseimage:newcourseimage,
            cousrestatus
        }
        
    }

    try{
        const response = await Course.updateOne(req.params,
            {
            $set:newData
        });
        res.status(200).json({messege:'Internal serever error',data:response});
    }
    catch(err)
    {
        res.status(500).json({messege:'Internal serever error'});
    }

   
});


app.post('/addvideo',async(req,res)=>{
    console.log('api called');

    const video = new  Video(req.body);
    const  response =await video.save();
    res.status(200).json(response);
});

app.get('/viewvideos', async(req,res)=>{
    const videos =await Video.find().populate('coursecat');
    res.status(200).json(videos);
});

// Assuming your video model file is in the 'models' directory

// app.get('/searchvideo/:searchKey', async (req, res) => {
//     let searchKey = req.params.searchKey;
//     try {
//         // Find courses with matching names
//         const courses = await Course.find({ coursename: { $regex: new RegExp(searchKey, "i") } });

//         // Extract the ObjectId values from the found courses
//         const courseIds = courses.map(course => course._id);

//         // Search for videos with coursecat field matching the found course ObjectId values
//         const videos = await Video.find({
//             $or: [
//                 { videotopic: { $regex: new RegExp(searchKey, "i") } },
//                 { videurl: { $regex: new RegExp(searchKey, "i") } },
//                 { coursecat: { $in: courseIds } }
//             ]
//         }).populate('coursecat');

//         res.status(200).json({ message: 'Data fetched successfully', data: videos });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.get('/searchvideo/:searchKey', async (req, res) => {
    let searchKey = req.params.searchKey;
    try {
        const videos = await Video.find({
            $or: [
                { videotopic: { $regex: new RegExp(searchKey, "i") } },
                { videurl: { $regex: new RegExp(searchKey, "i") } }
            ]
        }).populate({
            path: 'coursecat',
            match: { coursename: { $regex: new RegExp(searchKey, "i") } }, // Match coursename
            select: 'coursename' // Select only the coursename field
        });

        res.status(200).json({ message: 'Data fetched successfully', data: videos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/multipledelete',async(req,res)=>{
    const allIds = req.body.ids;

    console.log(allIds);

    try{
        const oldData =await Course.find({_id : { $in:allIds}});

        oldData.forEach((item)=>{
            fs.unlinkSync(`${__dirname}/uploads/${item.courseimage}`);
        });

        try{
            const response = await Course.deleteMany({_id:{$in:allIds}});
            res.status(200).json({message:'Data deleted successfully', data:response});
        }
        catch(err)
        {
            res.status(400).json({message:"Error in deleting"});
        }

        
    }
    catch(err){
        res.status(500).json({message:"Server Error"});
    }
});

const nodemailer = require('nodemailer');

const details = require('./email_pass');

const setOtp = new Map();

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: details.email,
        pass: details.password
    }
});


app.post('/genrateotp', async(req,res)=>{
    const userEmail = req.body.email;

    const otp = Math.floor(Math.random() *90000 * 10000);
    
    setOtp.set(userEmail, otp.toString());

    const options = {
        from: details.email,
        to: userEmail,
        subject: 'One Time Password for Registration',
        text: `Your OTP is ${otp}`
    };

    transporter.sendMail(options,(error,info)=>{
        if(error) return res.status(202).json({message:false});
        res.status(200).json({message:true});

    })
    
});

app.post('/registeruser', async(req,res)=>{
    const user_data = req.body;
    const  email = user_data.email;
    const otp = user_data.otp;

   const sentOtp = setOtp.get(email);

    if(sentOtp !== otp) return  res.status(403).json({message:'Invalid OTP', okay:false})

    console.log('done');
    res.status(200).json({message:'Registraion successfull', okay: true});


});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

// abc@123!PQR