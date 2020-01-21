import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {AllProducts} from './allProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts', () => {
  let allProducts

  beforeEach(() => {
    allProducts = shallow(<AllProducts products={[]} />)
  })

  it('renders the products in a div', () => {
    expect(allProducts.find('h3')).to.have.length(1)
  })
})
