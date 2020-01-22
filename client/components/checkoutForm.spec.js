/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CheckoutForm from './checkoutForm'
import Testing from './testing'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Testing form', () => {
  let form

  beforeEach(() => {
    form = shallow(
      <CheckoutForm
        state={{
          shippingname: '',
          shippingaddress: '',
          billingname: '',
          billingaddress: ''
        }}
        handleSubmit={() => null}
        handleClick={() => null}
      />
    )
  })

  it('renders in a h4', () => {
    expect(
      form
        .find('h4')
        .first()
        .text()
    ).to.be.equal('Shipping Address')
  })
})
