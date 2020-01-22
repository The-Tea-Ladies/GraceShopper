import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {sendOrder, getOrderId} from '../store/cart'
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
    this.props.getProducts()
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

  render() {
    return (
      <div>
        {/* <h3>Cart</h3>
        <ul>
          {this.props.products.map(product => (
            <li className="all-products-single" key={product.id}>
              <img className="all-products-image" src={product.image} />
              {product.name}
            </li>
          ))}
        </ul> */}
        {/* TODO: display order total */}
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
  cart: state.cart
})

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getAllProducts()),
    getOrderId: () => dispatch(getOrderId()),
    sendOrder: newOrder => dispatch(sendOrder(newOrder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
