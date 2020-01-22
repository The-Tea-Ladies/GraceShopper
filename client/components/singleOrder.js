import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/product'
import {getOneOrder} from '../store/orders'

class SingleOrder extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getOneOrder(this.props.match.params.orderId)
  }

  render() {
    return (
      <div>
        <h3>Order</h3>
        {this.props.order.length ? (
          <ul>
            {this.props.order.map(item => (
              <li className="all-products-single" key={item.productId}>
                <img className="all-products-image" src={item.product.image} />
                {item.product.name}
                <div>Quantity: {item.quantity}</div>
              </li>
            ))}
          </ul>
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
  order: state.orders.single
})

const mapDispatchToProps = dispatch => {
  return {
    getOneOrder: orderId => dispatch(getOneOrder(orderId)),
    getSingleProduct: productId => dispatch(getSingleProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
