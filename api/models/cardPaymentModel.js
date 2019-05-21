const mongoose = require('mongoose');

/*
This works as the DB scema for card payments in sampath bank. userId, trainRoute, noOftickets, cardNo, 
cvc, amount and date has been used as attributes there
*/ 

const cardPaymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    trainRoute: {
        type: String
    },
    noOftickets: {
        type: Number
    },
    cardNo: {
        type: Number,
        required: true
    },
    cvc: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dateTime: {
        type: String
    }
});

module.exports = mongoose.model('cardPaymentModel', cardPaymentSchema);