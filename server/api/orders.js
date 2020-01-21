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

const userOnly = async (req, res, next) => {
  if (req.session.orderId) {
    let order = await Order.findByPk(req.session.orderId)
    if (
      (!req.user && order.userId) ||
      (req.user && req.user.id !== order.userId)
    ) {
      const err = new Error('Not allowed!')
      err.status = 401
      return next(err)
    }
  }

  next()
}

router.get('/', userOnly, async (req, res, next) => {
  try {
    if (req.session.orderId) {
      const cart = await OrderProduct.findAll({
        where: {orderId: req.session.orderId},
        attributes: ['quantity', 'productId'],
        order: [['createdAt', 'ASC']]
      })
      for (let i = 0; i < cart.length; i++) {
        let item = cart[i]
        const {dataValues} = await Product.findByPk(item.productId)
        item.dataValues.product = dataValues
      }

      res.send(cart)
    } else {
      res.send([])
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    console.log('session id in product', req.session.id)
    if (!req.session.orderId) {
      const order = await Order.create()
      if (req.user) {
        await order.update({userId: req.user.id})
      }
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

router.put('/checkout', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.session.orderId)
    await order.update({...req.body, finalized: true})
    req.session.orderId = null
    res.sendStatus(204)
  } catch (err) {
    next(err)
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
