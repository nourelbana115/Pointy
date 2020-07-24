const { Customer } = require('../../db/models/customer');

const calculateEveryone = async (customer, segmentArray) => {
  try {
    if (customer) {
      segmentArray.push('everyone')
    }
  } catch (err) {
    console.log(err)
  }
}

const calculateSuperFan = async (customer, segmentArray) => {
  try {
    const customers = await Customer.find({})
    const total = customers.reduce((total, customer) => total + customer.visits, 0);
    const avgVisits = total / customers.length
    if (customer.visits >= avgVisits) {
      segmentArray.push('superFans')
    }
  } catch (err) {
    console.log(err)
  }
}

const getCurrentMonth = async () => {
  const now = new Date()
  const currentMonth = (now.getMonth() + 1)
  return currentMonth
}

const calculateBirthday = async (customer, segmentArray) => {
  try {
    const currentMonth = await getCurrentMonth()
    const customerBirthday = new Date(customer.birthday)
    const customerBirthdayMonth = (customerBirthday.getMonth() + 1)
    if (customerBirthdayMonth === currentMonth) {
      segmentArray.push('birthday')
    }
  } catch (err) {
    console.log(err)
  }
}

const calculateNewCustomers = async (customer, segmentArray) => {
  try {
    const now = new Date()
    const customerCreatedAt = (new Date(customer.createdAt))
    const newCustomersRange = (now - 15 * 1000 * 60 * 60 * 24)
    if (customerCreatedAt > newCustomersRange) {
      segmentArray.push('newCustomers')
    }
  } catch (err) {
    console.log(err)
  }
}

const calculateSegments = async (customer, segmentArray) => {
  segmentArray = []
  await Promise.all([
    calculateEveryone(customer, segmentArray),
    calculateBirthday(customer, segmentArray),
    calculateSuperFan(customer, segmentArray),
    calculateNewCustomers(customer, segmentArray)
  ])
  return segmentArray
}

const updateCustomer = async (customer, segments) => {
  return await Customer.findByIdAndUpdate(customer._id, { segments: segments, updatedAt: new Date() })
}

exports.updateSegments = async (customers) => {
  for (customer of customers) {
    const segments = await calculateSegments(customer, customer.segments)
    updateCustomer(customer, segments)
  }
  return customers
}