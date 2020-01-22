/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('correct value', () => {
      let oolong

      beforeEach(async () => {
        oolong = await Product.create({
          name: 'oolong fresh',
          price: 10
        })
      })

      it('returns true if the name is correct', () => {
        expect(oolong.name === 'oolong fresh').to.be.equal(true)
      })

      it('returns false if the name is incorrect', () => {
        expect(oolong.name === 'oolong stale').to.be.equal(false)
      })

      it('returns true if the price is correct', () => {
        expect(oolong.price === 10).to.be.equal(true)
      })

      it('returns false if the price is incorrect', () => {
        expect(oolong.price === 3).to.be.equal(false)
      })
    }) // end describe('correct value')
  }) // end describe('validations')
}) // end describe('Product model')
