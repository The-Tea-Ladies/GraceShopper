const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.session.orderId) {
      const cart = await OrderProduct.findAll({
        where: {orderId: req.session.orderId},
        attributes: ['quantity', 'productId']
      })
      cart.map(item => {
        const product = Product.findByPk(item.productId)
        item.product = product
        return item
      })
      res.send(cart)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!req.session.orderId) {
      const order = await Order.create()
      req.session.orderId = order.id
      const quantity = await OrderProduct.updateOrCreate(
        req.session.orderId,
        req.body.productId
      )
      res.send(quantity)
    } else {
      const quantity = await OrderProduct.updateOrCreate(
        req.session.orderId,
        req.body.productId
      )
      res.status(201).send(quantity)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  // if (!req.session.cart) {
  //   req.session.cart = [];
  // }
  try {
    const order = await Order.findByPk(req.session.orderId)
    order.finalized = true
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// router.get('/cart', async (req, res, next) => {
//   try {
//     const products = await Product.findAll({
//       where: {
//         id: {
//           [Sequelize.Op.in]: req.body.IDs
//         }
//       }
//     })
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })
