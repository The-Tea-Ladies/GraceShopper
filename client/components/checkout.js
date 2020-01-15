import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {updateCart, sendOrder} from '../store/cart'
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

  handleSubmit = event => {
    event.preventDefault()

    //the below map takes our map from the redux store and stores it as an array of arrays, each with the form [product ID, quantity ordered]. This format will likely change.
    const cart = this.props.cart.map(product => {
      return [product.id, product.quantity]
    })

    let newOrder = {...this.state, cart} //eventually, should also send userid if applicable

    this.props.sendOrder(newOrder)

    this.setState({
      shippingname: '',
      shippingaddress: '',
      billingname: '',
      billingaddress: ''
      // cardnumber: ''
    })
    // redirect to thank you page??
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        {/* TODO: Update this cart view (below) to matcht the cart view that Liz and Anastasiia create. maybe just grab the same component again, but need to not show the "checkout" button. */}
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
    addToCart: product => dispatch(updateCart(product)),
    sendOrder: newOrder => dispatch(sendOrder(newOrder))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
