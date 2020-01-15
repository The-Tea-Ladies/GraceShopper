import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {updateCart} from '../store/cart'
import CheckoutForm from './checkoutForm'

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
      billingaddress: '',
      cardnumber: ''
    }
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleSubmit = event => {
    event.preventDefault()
    //TODO: we should trigger a thunk here to do the database stuff
    this.setState({
      shippingname: '',
      shippingaddress: '',
      billingname: '',
      billingaddress: '',
      cardnumber: ''
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    console.log('props', this.props)

    return (
      <div>
        {/* TODO: Update this cart view (below) to matcht the cart view that Liz and Anastasiia create. maybe just grab the same component again, but need to not show the "checkout" button. */}
        <h3>Cart</h3>
        <ul>
          {this.props.products.map(product => (
            <li className="all-products-single" key={product.id}>
              <img className="all-products-image" src={product.image} />
              {product.name}
            </li>
          ))}
        </ul>
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
  products: state.products.all
})

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getAllProducts()),
    addToCart: product => dispatch(updateCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
