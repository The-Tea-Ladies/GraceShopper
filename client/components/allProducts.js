import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/product'
import {addToCart} from '../store/cart'

/**
 * COMPONENT
 */
export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    return (
      <div>
        <h3>Shop all Tea</h3>
        <div className="all-products">
          {this.props.products.map(product => (
            <div className="all-products-single" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img className="all-products-image" src={product.image} />
              </Link>
              {product.name}

              <button
                type="submit"
                onClick={() => this.props.addToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
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
    addToCart: productId => dispatch(addToCart(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
