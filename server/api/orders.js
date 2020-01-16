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

router.post('/add', async (req, res, next) => {
  try {
    await OrderProduct.updateOrCreate(req.body.orderId, req.body.productId)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.get('/test', async (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = []
    }

    console.log('req.session.id before save:', req.session.id)
    req.session.save()
    console.log('req.session.id after save:', req.session.id)
    console.log('req.session')
    console.log(req.session)
    res.status(200).send(req.user)
  } catch (error) {
    console.log('sad face')
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
