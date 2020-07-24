const _ = require('lodash');
const logger = require('../utilities/logger');
const { generalResponse } = require('../utilities/responseBody');
const { Customer } = require('../db/models/customer')
const { Email } = require('../db/models/email')

const { sendMail } = require('../services/mailSesService')

exports.sendEmail = async (req, res) => {
  try {
    const merchantData = req.merchant
    const body = _.pick(req.body, ['title', 'content', 'segmentName']);
    const customers = await Customer.find({ merchant: merchantData, segments: body.segmentName })
    const emails = customers.map(customer => customer.email)
    const sentEmails = await sendMail('poity', emails, body.title, body.content)
    const newEmail = new Email({
      merchant: merchantData,
      title: body.title,
      content: body.content,
      segmentName: body.segmentName,
      customers: customers
    })
    newEmail.save()
    req.flash('success', 'Email sent successfully')
    await res.redirect('back')
  } catch (err) {
    req.flash('error', 'Something went wrong')
    res.redirect('back')
  }
}