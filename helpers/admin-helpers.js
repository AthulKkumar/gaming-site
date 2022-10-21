const db = require('../db/connection')
const User = require('../db/schema/userSchema');
const ScoreBoard = require('../db/schema/score');
const Adminlog = require('../db/schema/adminSchema');


module.exports = {
    //Function for fecting all the users who loged in
    getAllUsers : ()=>{
        return new Promise(async(resolve,reject)=>{
            let users = await User.collection.find().toArray();
            resolve(users)
        })
    },

    adminLogin : (adminDetail)=>{
        console.log(adminDetail);
        return new Promise(async(resolve,reject)=>{
            
            let adminEmail = 'admin@123';
            let password = '123';
            let admin = await Adminlog.collection.find();
            console.log(admin.email);
            console.log(adminDetail.email);

            if (adminEmail == adminDetail.email && password == adminDetail.password){

                resolve()
            }else{
                reject()
            }
        })
    }
}