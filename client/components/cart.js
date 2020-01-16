import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/product'
import {addToCart, deleteItem} from '../store/cart'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleClick(evt) {
    const id = evt.target.id
    this.props.deleteItem(id)
  }

  render() {
    return (
      <div>
        <h3>Cart</h3>
        {this.props.cart.length ? (
          <ul>
            {this.props.cart.map(item => (
              <li className="all-products-single" key={item.id}>
                <img className="all-products-image" src={item.image} />
                {item.name}
                <div>Quantity: {item.quantity}</div>
                <button id={item.id} onClick={this.handleClick}>
                  Remove Item
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
        <Link to="/checkout">
          <button type="submit">Check Out</button>
        </Link>
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
    addToCart: product => dispatch(addToCart(product)),
    deleteItem: id => dispatch(deleteItem(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
