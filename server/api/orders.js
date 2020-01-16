const router = require('express').Router()
const {Order, OrderProduct, Product} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

// function promiseCart(cart) {
//   return Promise.all(
//     cart.map( async (item) => {
//       const product = await Product.findByPk(item.productId);
//       item.product = product;
//       return item;
//     })
//   )
// }

router.get('/', async (req, res, next) => {
  try {
    if (req.session.orderId) {
      const cart = await OrderProduct.findAll({
        where: {orderId: req.session.orderId},
        attributes: ['quantity', 'productId']
      })
      for (let i = 0; i < cart.length; i++) {
        let item = cart[i]
        const {dataValues} = await Product.findByPk(item.productId)
        item.dataValues.product = dataValues
      }

      res.send(cart)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    if (!req.session.orderId) {
      const order = await Order.create()
      req.session.orderId = order.id
      await OrderProduct.updateOrCreate(
        req.session.orderId,
        req.params.productId
      )
      res.sendStatus(201)
    } else {
      await OrderProduct.updateOrCreate(
        req.session.orderId,
        req.params.productId
      )
      res.sendStatus(201)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    await OrderProduct.deleteItem(req.session.orderId, req.params.productId)
    res.sendStatus(201)
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

// router.get('/test', async (req, res, next) => {
//   try {
//     if (!req.session.cart) {
//       req.session.cart = []
//     }

//     console.log('req.session.id before save:', req.session.id)
//     req.session.save()
//     console.log('req.session.id after save:', req.session.id)
//     console.log('req.session')
//     console.log(req.session)
//     res.status(200).send(req.user)
//   } catch (error) {
//     console.log('sad face')
//     next(error)
//   }
// })

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
