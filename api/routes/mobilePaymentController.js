const express = require('express');
const moment = require('moment');
const twilio = require('twilio');
const nodeMailer = require('nodemailer');

const router = express.Router();

const MobilePayment = require('../models/mobilePaymentModel');

//require('../model/mobilePaymentModel');

const AccountSid = 'AC8c1239baa4854f62534587f0d51feef2';
const AuthToken = '83af64fa3e9f7cdfb36a67fbef49080b';
const client = new twilio(AccountSid, AuthToken);
const twilioNumber = '+19386665693';

router.post('/', (req, res, next) => {
    var payment = new MobilePayment({
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
            });
        });
});
/*This function sends automatic sms's to clients */
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