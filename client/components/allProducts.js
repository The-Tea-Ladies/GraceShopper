import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/product'
import {updateCart} from '../store/cart'
import {getSingleProduct} from '../store/product'

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log('props', this.props.products)
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
                onClick={() => this.props.addToCart(product)}
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
    addToCart: product => dispatch(updateCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
