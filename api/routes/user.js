const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post("/signup", (req, res, next) => {
    //make the same user not signup twise, this is an security purpose
    User.find({email: req.body , email})
    .exec()
    .then(user => {
        if(user.length >= 1){
            return res.status(409).json({
                message: 'Mail exists'
            })
       
        }else{
            //hash password for security reasons. Then the password can not be identified coz its in symbols
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: req.body.password
                     });
                     user
                     .save()
                     .then(result => {
                         console.log(result);
                         res.status(201).json({
                             message: 'User created'
                         });
                     })
                     .catch(err => {
                         console.log(err);
                         res.status(500).json({
                             error: err
                         });
                     });
                }
            });  
        }
    })
    
   
   
        

        
   

});
//login of a signed up user
router.post("/login", (req, res, next) => {
    User.find({email:req.body.email})
    .exec()
    .then(user => {
        if(user.length <1){
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

    //bcrypt the hashed password using bcrypt library 
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if(err){
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        if(result) {
           const token =  jwt.sign({
                email:user[0].email,
                userId:user[0]._id
            }, process.env.JWT_KEY, {
                expiresIn: "ih"
                //expire after one hour for security reasons
            })

            return res.status(200).json({
                message: 'Auth successful',
                token: token

            })
        } 
        res.status(401).json({
            message: 'Auth failed'
        })
        
    });

    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

//delete user
    router.delete("/:userId", (req, res, next) => {
        User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    });

module.exports = router;