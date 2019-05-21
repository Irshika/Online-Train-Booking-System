const mongoose = require('mongoose');

/*
This works as the DB Scema for dialog bill payment.userId, trainRoute, noOftickets,
amount, phone number and pin number has bveen used as attributes there
*/

const mobilePaymentScehma = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    trainRoute: {
        type: String
    },
    noOftickets: {
        type: Number
    },
    amount: {
        type: Number,
        required: true
    },
    dateTime: {
        type: String
    }
});

module.exports = mongoose.model('mobilePayment', mobilePaymentScehma);