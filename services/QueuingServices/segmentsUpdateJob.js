const customerServices = require('../backendServices/customerServices')
const cron = require("node-cron");
const { Customer } = require('../../db/models/customer')

cron.schedule("59 59 23 * * *", async () => {
  const customers = await Customer.find({})
  customerServices.updateSegments(customers)
});

