/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getAllProducts, gotAllProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
//import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Thunks', () => {
  let store
  let mockAxios

  const initialState = {products: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllProducts', () => {
    it('eventually dispatches the GOT ALL PRODUCTS action', async () => {
      const fakeProduct = [
        {name: 'Codys Tea', price: 23},
        {name: 'Emmas Tea', price: 24}
      ]
      mockAxios.onGet('/api/products').reply(200, fakeProduct)
      await store.dispatch(getAllProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ALL_PRODUCTS')
      expect(actions[0].products).to.deep.equal(fakeProduct)
    })
  })
})
