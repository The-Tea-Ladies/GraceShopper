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

OrderProduct.mergeOrders = async (sessOrderId, dbOrderId) => {
  try {
    const newItems = await OrderProduct.findAll({where: {orderId: sessOrderId}})
    for (let i = 0; i < newItems.length; i++) {
      let item = newItems[i]
      let found = await OrderProduct.findOne({
        where: {orderId: dbOrderId, productId: item.productId}
      })
      if (found) {
        await found.update({quantity: found.quantity + item.quantity})
      } else {
        const order = await Order.findByPk(dbOrderId)
        const product = await Product.findByPk(item.productId)
        const orderProdInstance = await order.addProduct(product)
        await orderProdInstance[0].update({quantity: item.quantity})
      }
    }
    const defunctOrder = await Order.findOne({where: {id: sessOrderId}})
    await defunctOrder.destroy()
  } catch (error) {
    console.log(error)
  }
}
module.exports = OrderProduct
