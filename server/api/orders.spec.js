const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const Product = db.model('product')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    const teaKind = 'Green Tea'

    beforeEach(async () => {
      let newOrder = await Order.create()
      let product = await Product.create({
        name: teaKind,
        price: 20
      })
      await newOrder.addProduct(product)
      await newOrder.addProduct(product)
      return newOrder
    })

    // it('GET /api/orders, guest', async () => {
    //   const res = await request(app)
    //     .get('/api/orders')
    //     .expect(200)

    //   expect(res.body).to.be.an('array')
    //   expect(res.body[0].name).to.be.equal(teaKind)
    //   expect(res.body[0].price).to.be.equal(20)
    // })

    xit('GET /api/orders, guest TEST', async () => {
      // Log in
      // let agent = request.agent(app)
      await request(app)
        .post('/signup')
        .send({email: 'cody@email.com', password: '123'})

      const res = await request(app)
        .post('/auth/login')
        .send({email: 'cody@email.com', password: '123'})

      const res3 = await request(app).get('/api/orders/testing')
      console.log('res3:', res3.data)

      //expect(res).to.have.cookie('expires');
      // The `agent` now has the sessionid cookie saved, and will send it
      // back to the server in the next request:
      // const res2 = await agent.get('/user/me')
      // expect(res2).to.have.status(200);
      //
    })
    xit('GET /api/orders/:userId', async () => {
      const user = await User.create({
        email: 'cody@email.com'
      })
      await newOrder.addUser()
      const res = await request(app)
        .get('/api/orders/1')
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(teaKind)
      expect(res.body.price).to.be.equal(20)
    })
  }) // end describe('/api/orders')
}) // end describe('Order routes')
