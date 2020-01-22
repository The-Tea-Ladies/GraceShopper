/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import CheckoutForm from './checkoutForm'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('<CheckoutForm />', () => {
  let form, formSpy

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
        handleChange={() => null}
      />
    )
  })

  it('renders in a h4', () => {
    expect(
      form
        .find('h4')
        .at(0)
        .text()
    ).to.be.equal('Shipping Address')
    //expect(form.find('h4').text()).to.be.equal('Billing Information')
  })

  it('renders a <button> element', () => {
    expect(form.find('button').length).to.be.equal(1)
  })

  xit('simulates click events', () => {
    const onButtonClick = sinon.spy()
    form.find('button').simulate('click', {})
    expect(onButtonClick.called).to.equal(true)
  })
})
