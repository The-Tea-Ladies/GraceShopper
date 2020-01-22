const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingname: {
    type: Sequelize.STRING
  },
  shippingaddress: {
    type: Sequelize.STRING
  },
  billingname: {
    type: Sequelize.STRING
  },
  billingaddress: {
    type: Sequelize.STRING
  },
  finalized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
