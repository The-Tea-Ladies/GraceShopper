/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('correct value', () => {
      let order

      beforeEach(async () => {
        order = await Order.create({
          shippingname: 'Marie',
          shippingaddress: '10 Market Place',
          billingname: 'Marie',
          billingaddress: '10 Market Place'
        })
      })

      it('returns true if the shipping name is correct', () => {
        expect(order.shippingname === 'Marie').to.be.equal(true)
      })

      it('returns false if the shipping name is incorrect', () => {
        expect(order.shippingname === 'Kondo').to.be.equal(false)
      })

      it('returns true if finalized is false', () => {
        expect(order.finalized === false).to.be.equal(true)
      })

      it('returns false if finalized is true', () => {
        expect(order.finalized === true).to.be.equal(false)
      })
    }) // end describe('correct value')
  }) // end describe('validations')
}) // end describe('Product model')
