const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
const OrderProduct = require('../db/models/orderProduct')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      console.log('session id before login', req.session.id)

      console.log('session id', req.session.id)
      const order = await Order.findOne({
        where: {userId: user.id, finalized: false}
      })

      if (order && req.session.orderId) {
        await OrderProduct.mergeOrders(req.session.orderId, order.id)
        req.session.orderId = order.id
        console.log('maybe merged!')
      } else if (!order && req.session.orderId) {
        console.log('no order yes session here')
        const order = await Order.findByPk(req.session.orderId)
        await order.update({userId: user.id})
      } else if (order && !req.session.orderId) {
        console.log('yes oder no session here', req.session.id, order.id)
        req.session.orderId = order.id
        console.log('session', req.session)
      }
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  //console.log('session id', req.session.id)
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
