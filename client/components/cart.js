import React from 'react'
import PropTypes, {string} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToCart, deleteItem, getCart} from '../store/cart'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleClick(evt) {
    const id = evt.target.id
    this.props.deleteItem(id)
  }

  priceWriter(price) {
    let stringPrice = `$${price / 100}.${price % 100}`
    if (price % 100 < 10) return stringPrice.concat('0')
    return stringPrice
  }

  render() {
    return (
      <div>
        <h3>Cart</h3>
        {this.props.cart.length ? (
          <div>
            <ul>
              {this.props.cart.map(item => (
                <li className="all-products-single" key={item.productId}>
                  <Link to={`/products/${item.productId}`}>
                    <img
                      className="all-products-image"
                      src={item.product.image}
                    />
                  </Link>
                  {item.product.name}
                  <div>Quantity: {item.quantity}</div>
                  <div>Price: {this.priceWriter(item.product.price)}</div>
                  <button
                    type="submit"
                    id={item.productId}
                    onClick={this.handleClick}
                  >
                    Remove Item
                  </button>
                </li>
              ))}
            </ul>
            <div>Cart Total: {this.priceWriter(this.props.total)}</div>
            <Link to="/checkout">
              <button type="submit">Check Out</button>
            </Link>
          </div>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => ({
  cart: state.cart.cart,
  total: state.cart.total
})

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => dispatch(getCart()),
    addToCart: product => dispatch(addToCart(product)),
    deleteItem: id => dispatch(deleteItem(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
