const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Order.create(req.body))
  } catch (err) {
    next(err)
  }
})

router.post('/test', async (req, res, next) => {
  try {
    await OrderProduct.updateOrCreate(req.body.orderId, req.body.productId)
    res.sendStatus(201)
  } catch (error) {
    next(error)
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
