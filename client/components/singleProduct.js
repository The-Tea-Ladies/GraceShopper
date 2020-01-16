import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getSingleProduct} from '../store/product'
import {updateCart} from '../store/cart'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProduct()
  }
  render() {
    const product = this.props.products
    console.log('product', product)
    return (
      <div className="single-product">
        <img className="single-img item" src={product.image} />

        <div className="product-description item">
          <h3>{product.name}</h3>
          <p className="item">
            Price: ${product.price / 100}.{product.price % 100}0
          </p>
          <p className="item">Description: {product.description}</p>
          <button type="submit" onClick={() => this.props.addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.single
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProduct: function() {
      const productId = ownProps.match.params.productId
      dispatch(getSingleProduct(productId))
    },
    addToCart: product => dispatch(updateCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
