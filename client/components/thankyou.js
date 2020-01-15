import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {updateCart} from '../store/cart'

/**
 * COMPONENT
 */
const ThankYou = props => {
  return (
    <div>
      <h1>Thank you for your order!</h1>
    </div>
  )
}

export default ThankYou
