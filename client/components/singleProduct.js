import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getSingleProduct} from '../store/product'
import {addToCart} from '../store/cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getProduct()
  }

  priceWriter(price) {
    let stringPrice = `$${price / 100}.${price % 100}`
    if (price % 100 < 10) return stringPrice.concat('0')
    return stringPrice
  }

  render() {
    const product = this.props.product
    return (
      <div className="single-product">
        <img className="single-img item" src={product.image} />

        <div className="product-description item">
          <h3>{product.name}</h3>
          <p className="item">Price: {this.priceWriter(product.price)}</p>
          <p className="item">Description: {product.description}</p>
          <button
            type="submit"
            onClick={() => this.props.addToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  product: state.products.single
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProduct: function() {
      const productId = ownProps.match.params.productId
      dispatch(getSingleProduct(productId))
    },
    addToCart: productId => dispatch(addToCart(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
