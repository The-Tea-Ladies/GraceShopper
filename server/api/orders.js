const router = require('express').Router()
const {Order} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Order.create(req.body))
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
