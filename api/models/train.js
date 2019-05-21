const mongoose = require('mongoose');

/*
This works as the train scema for DB, which supports the trains routes. I have used mongoose there, 
to simplifying Node's callback patterns that make it easier to work with than the standard driver alone
*/

const trainSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String, 
    price: Number
})

module.exports = mongoose.model('Train', trainSchema);