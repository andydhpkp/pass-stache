"use strict";
import nodemailer from '../../node_modules'
import twoFactor from '../../node_modules'
/* const nodemailer = require("nodemailer");
const twoFactor = require("node-2fa"); */

function sendToken() {
    let newSecret = twoFactor.generateSecret()
    let token = twoFactor.generateToken(newSecret).token

    const email = document.querySelector('#login-email').value.trim()

    sendEmail(email, token)
}

function verifyToken(secret, userToken) {
    let verified = twoFactor.verifyToken(secret, userToken)

    switch(verified.delta) {
        case 0:
            alert('verified')
            break;
        case -1:
            alert('the token was entered too late, please try again!')
            break;
        case 1:
            alert('the token was entered too early, please try again!')
            break;
        default:
            alert('Something went wrong, please try again!')
    }
}

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(email, token) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pass.stache@gmail.com',
      pass: 'uofugroupproject2'
    }
  });

  // send mail with defined transport object
  var mailOptions = {
    from: 'pass.stache@gmail.com',
    to: email,
    subject: 'Pass-Stache Authentication Code',
    text: `This is your secret token for authentication purposes:
    
         *${token}* 
         
         Please enter token within 4 minutes or ask for a new one.`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {sendToken, sendEmail, verifyToken}