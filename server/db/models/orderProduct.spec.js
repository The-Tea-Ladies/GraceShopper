/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')
const Order = db.model('order')
const OrderProduct = db.model('orderproduct')

describe('orderProduct model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('correct length', () => {
      let oolong
      let genmaicha
      let order
      let orderProdInstances

      beforeEach(async () => {
        oolong = await Product.create({
          name: 'oolong fresh',
          price: 10
        })
        genmaicha = await Product.create({
          name: 'genmaicha green',
          price: 12
        })
        order = await Order.create()
        await order.addProduct(oolong)
        await order.addProduct(genmaicha)
        orderProdInstances = await OrderProduct.findAll()
      })

      it('returns true if length is correct', () => {
        expect(orderProdInstances.length === 2).to.be.equal(true)
      })
    }) // end describe('correct length')

    // describe('update or create', () => {
    //   let oolong
    //   let genmaicha
    //   let order
    //   let orderProdInstances

    //   beforeEach(async () => {
    //     oolong = await Product.create({
    //       name: 'oolong fresh',
    //       price: 10
    //     })
    //     genmaicha = await Product.create({
    //       name: 'genmaicha green',
    //       price: 12
    //     })
    //     order = await Order.create()
    //     await order.addProduct(oolong)
    //     await OrderProduct.updateOrCreate(order.id, genmaicha.id)
    //     orderProdInstances = await OrderProduct.findOne({where: {productId: genmaicha.id}})
    //   })

    //   it('returns true if the quantity is correct', () => {
    //     expect(orderProdInstances.length).to.be.equal(1)
    //   })

    // }) // end describe('update or create')
  }) // end describe('validations')
}) // end describe('orderProduct model')
