require('../db/connection')
const User = require('../db/schema/userSchema');
const ScoreBoard = require('../db/schema/score');
const bcrypt = require('bcrypt');
var ObjectId = require('mongoose').Types.ObjectId;
const { response } = require('express');


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
    },
    //Function for storing the score of the scramble game
    wordScrambler: (score, userId) => {
        console.log(score);
        console.log(userId);

        return new Promise(async (resolve, reject) => {
            const userScoreBoard = await ScoreBoard.collection.findOne({ user: userId })
            console.log(userScoreBoard);
            //Checks whether the user has scoreboard or not
            if (userScoreBoard) {
                console.log('yo');
                //Search for the user scooreboard and update the scramble score 
                let scoreuser = await ScoreBoard.collection.updateOne({ user: userId },
                    {
                        $set: { 'wordscrambler': score }
                    }
                )
                // .then((response) => {
                //     console.log('ih');
                //     resolve()

                // })
                console.log(scoreuser);
                resolve()

            }//If the user has no score card it will create new score card for scramble word game
            else {
                // console.log(score.score);

                let scoreObj = {
                    user: userId,
                    wordscrambler: {
                        score: score.score //The score value
                    }
                }

                ScoreBoard.collection.insertOne(scoreObj).then((response) => {
                    resolve()
                })


            }

        })
    },
    //Function that checks if the user is eligable for another game
    //It takes the score from the scramble game
    checkLevel: (userId) => {
        return new Promise(async (resolve, reject) => {
            console.log(userId);
            //Search wheter the user has scoreboard or not
            const scoreBoardExist = await ScoreBoard.collection.findOne({ user: userId });
            // console.log(scoreBoardExist);
            // if user hs not scorebosrd it will rject otherwise it will return the score from the scoreboard
            if (scoreBoardExist == null) {
                reject(null)
            } else {
                const userScoreBoard = await ScoreBoard.collection.aggregate([
                    {
                        $match: { user: userId }
                    },
                    {
                        $project: { score: '$wordscrambler.score' }
                    }
                ]).toArray();
                // console.log(userScoreBoard[0].score);
                resolve(userScoreBoard[0].score)
            }
        })
    }


}