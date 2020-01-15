const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shippingaddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  billingaddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  finalized: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})
module.exports = Order
