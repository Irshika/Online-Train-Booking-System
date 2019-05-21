const mongoose = require('mongoose');

/*
This works as the user scema for DB. user scema is made for user logins. id, which is auto implementing, 
email, and a password has been used as attributes there
*/

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String,
         required: true,
          unique: true,
         // match: 
        },
    password: {type: String, required: true},
   // NIC : {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);