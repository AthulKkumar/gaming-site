require('../db/connection')
const User = require('../db/schema/userSchema');
const bcrypt = require('bcrypt');


module.exports = {
    // //User signup function
    doSignup: (userData) => {
        //Create an user db in database
        return new Promise(async (resolve, reject) => {

            userData.password = await bcrypt.hash(userData.password, 10)//Hashing the password
            userData.cpassword = await bcrypt.hash(userData.password, 10)

            const { username, email, password, cpassword } = userData;

            const userExist = await User.findOne({ username: username })

            if (userExist) {
               return reject('username exist')
               
            } else if (password != cpassword) {
                console.log('password is incorrect');
            }

            let user = User({ username, email, password, cpassword })

            user.save().then((response) => {
                console.log(response);
                resolve(response)
            })
        })

    },
    //Login function
    doLogin: (userData) => {

        //verify the user has an account or not
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {}
            let user = await User.findOne({ email: userData.email })
            //checks if the email is present or not
            if (user) {
                //Checks the password correct or not
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log('login success');
                        response.user = user;
                        response.status = true;
                        resolve(response)
                    } else {
                        console.log('login failed');
                        // resolve({status:false})
                        reject()
                    }
                })
            } else {
                console.log('login failed');
                reject()
                // resolve({status:false})
            }
        })
    }

}