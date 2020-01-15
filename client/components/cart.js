import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/product'
import {updateCart} from '../store/cart'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log('props', this.props)

    return (
      <div>
        <h3>Cart</h3>
        <ul>
          {this.props.products.map(product => (
            <li className="all-products-single" key={product.id}>
              <img className="all-products-image" src={product.image} />
              {product.name}
            </li>
          ))}
        </ul>
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
  products: state.products.all
})

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getAllProducts()),
    addToCart: product => dispatch(updateCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
