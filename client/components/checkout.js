import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {sendOrder, getOrderId, getCart} from '../store/cart'
import CheckoutForm from './checkoutForm'
import {Redirect} from 'react-router-dom'

/**
 * COMPONENT
 */
class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingname: '',
      shippingaddress: '',
      billingname: '',
      billingaddress: ''
      // cardnumber: ''
    }
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleSubmit = async event => {
    event.preventDefault()

    let newOrder = {...this.state}
    const orderId = await this.props.getOrderId()
    await this.props.sendOrder(newOrder)
    this.setState({
      shippingname: '',
      shippingaddress: '',
      billingname: '',
      billingaddress: ''
      // cardnumber: ''
    })
    this.props.history.push(`/thankyou/${orderId}`)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  priceWriter(price) {
    let stringPrice = `$${price / 100}.${price % 100}`
    if (price % 100 < 10) return stringPrice.concat('0')
    return stringPrice
  }

  render() {
    return (
      <div>
        <h4>Order Total: {this.priceWriter(this.props.total)}</h4>
        <CheckoutForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          state={this.state}
        />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => ({
  products: state.products.all,
  cart: state.cart.cart,
  total: state.cart.total
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    getOrderId: () => dispatch(getOrderId()),
    sendOrder: newOrder => dispatch(sendOrder(newOrder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
