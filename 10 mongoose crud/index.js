// const { default: mongoose } = require('mongoose');
const UserModel = require('./Models/User');

const insertData = async()=>{
    let data = new UserModel({
        name:'test',
        email:'test@mail.com',
        contact:'000000000'
    });

    let result = await data.save();
    console.log(result);

};
// insertData();

const readData = async()=>{
    let users = await UserModel.findById('65d2e305721b88d81f0a0224');

    console.log(users);
};

readData();