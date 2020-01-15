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
    console.log('orderId', orderId, 'ProductId', productId)
    const found = await OrderProduct.findOne({
      where: {orderId: orderId, productId: productId}
    })
    const order = await Order.findByPk(orderId)
    const product = await Product.findByPk(productId)
    if (!found) {
      order.addProduct(product)
    } else {
      found.update({quantity: found.quantity + 1})
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports = OrderProduct
