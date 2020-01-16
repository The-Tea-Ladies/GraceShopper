const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order')
const Product = require('./product')

const OrderProduct = db.define('orderproduct', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    defaultValue: 1
  }
})
OrderProduct.updateOrCreate = async (orderId, productId) => {
  try {
    const found = await OrderProduct.findOne({
      where: {orderId: orderId, productId: productId}
    })
    const order = await Order.findByPk(orderId)
    const product = await Product.findByPk(productId)
    if (!found) {
      order.addProduct(product)
      return {quantity: 1}
    } else {
      found.update({quantity: found.quantity + 1})
      return {quantity: found.quantity}
    }
  } catch (err) {
    console.log(err)
  }
}

OrderProduct.deleteItem = async (orderId, productId) => {
  try {
    const found = await OrderProduct.findOne({
      where: {orderId: orderId, productId: productId}
    })
    const order = await Order.findByPk(orderId)
    const product = await Product.findByPk(productId)
    if (found.quantity === 1) {
      order.removeProduct(product)
    } else {
      found.update({quantity: found.quantity - 1})
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports = OrderProduct
