const router = require('express').Router()

const HttpError = require('../utils/HttpError')
const {User} = require('../db/models')
module.exports = router

router.param('id', (req, res, next, id) => {
  User.findByPk(id)
    .then(user => {
      if (!user) throw HttpError(404)
      req.requestedUser = user
      next()
      return null
    })
    .catch(next)
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id)
//     res.json(user)

//   } catch (err) {
//     next(err)
//   }
// })

const adminsOnly = (req, res, next) => {
  if (!req.params.isAdmin) {
    const err = new Error('Not allowed!')
    err.status = 401
    return next(err)
  }
  next()
}

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    const id = req.params.id
    await User.destroy({where: {id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
