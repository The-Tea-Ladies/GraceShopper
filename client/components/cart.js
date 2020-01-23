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
        <h2 className="page-title">Shopping Cart</h2>
        {this.props.cart.length ? (
          <div>
            <table className="cart-view">
              <tr>
                <th /> <th>Item</th> <th>Quantity</th> <th>Price</th> <th />
              </tr>
              {this.props.cart.map(item => (
                <tr key={item.productId}>
                  <td>
                    <Link to={`/products/${item.productId}`}>
                      <img
                        className="all-products-image"
                        src={item.product.image}
                      />
                    </Link>
                  </td>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{this.priceWriter(item.product.price)}</td>
                  <td>
                    <button
                      type="submit"
                      id={item.productId}
                      onClick={this.handleClick}
                    >
                      Remove Item
                    </button>
                  </td>
                </tr>
              ))}
              <tr id="total-row">
                <td />
                <td />
                <td>Cart Total:</td>
                <td>{this.priceWriter(this.props.total)}</td>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td>
                  <Link to="/checkout">
                    <button type="submit" id="check-out-button">
                      Check Out
                    </button>
                  </Link>
                </td>
              </tr>
            </table>
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
