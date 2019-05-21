const express = require('express');
/*Express is the most common Node JS web application framework that deals with exploring
 various code with which we need on a frequent basis.*/
const moment = require('moment');
/*
A lightweight JavaScript date library for parsing, validating, manipulating, 
and formatting dates
*/
const twilio = require('twilio');
/*
twilio stop providing bug fixes and Support might ask you to upgrade 
before debugging issues
*/
const nodeMailer = require('nodemailer');
/*
used to sends automatic emails
*/
const router = express.Router();
const CardPayment = require('../models/cardPaymentModel');

//require('../model/cardPaymentModel');

const AccountSid = 'AC8c1239baa4854f62534587f0d51feef2';
const AuthToken = '83af64fa3e9f7cdfb36a67fbef49080b';
const client = new twilio(AccountSid, AuthToken);
const twilioNumber = '+19386665693';

router.post('/', (req, res, next) => {
    var payment = new CardPayment({
        cardNo: req.body.cardno,
        cvc: req.body.cvc,
        amount: req.body.amount,
        trainRoute: req.body.route,
        noOftickets: req.body.tickets,
        dateTime: moment().format('yyyy-mm-dd:hh:mm:ss')
    });

    payment.save()
        .then(result => {
            res.status(200).json(result);

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

function sendSMS(number, details) {
    let message = 'Thank you for using TrainBooking. Your train details,\n' +
        'Route: ' + details.route + '.' +
        'Time: ' + details.time + '.';

    client.messages.create(
        {
            to: number,
            from: twilioNumber,
            body: message
        },
        (err, message) => {
            console.log(message.sid);
        }
    );
}
/*This function sends automatic emails to clients */
function sendEmail(email, details) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'booklktrain416@gmail.com',
            pass: 'b00ktr@!n'
        }
    });
    let mailOptions = {
        from: '"BookMyTrain" <booklktrain416@gmail.com>',
        to: email,
        subject: "Ticket Booking Information",
        text: 'Thank You for using TrainBooking. Your payment receipt has been sent to Your Email.\nTrain Route :' + details.trainRoute + '. \nNumber of Tickets :' + details.numberOfTickets + '. \nTotal Amount :' + details.amount + '. \nPaid by : ' + details.paymentType + '.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        //res.render('index');
    });
}

module.exports = router;