const functions = require('firebase-functions')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')
const aws = require('aws-sdk')
require('dotenv').config()
admin.initializeApp()

aws.config.credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
}

const mailTransport = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
    region: 'us-east-1'
  })
})

exports.sendMail = functions.database.ref('users/{uid}/projects').onWrite(async (change) => {
  // TODO: return null if likedBy and likes are updated
  const mailOptions = {
    from: `LSK Guide <${process.env.SENDER_EMAIL_ADDRESS}>`,
    to: process.env.RECEIVER_EMAIL_ADDRESS,
    subject: 'Project Zed has a new project',
    text: 'new project has been submitted'
  }
  try {
    await mailTransport.sendMail(mailOptions, (err, info) => {
      if (err) { console.log(err) } else { console.log(info) }
    })
    console.log('start sending email')
  } catch (error) {
    console.log('send email error', error)
  }
  return null
})
