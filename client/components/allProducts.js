import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'

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
    console.log('props', this.props)

    return (
      <div>
        <h3>All Products</h3>
        <div className="all-products">
          {this.props.products.map(product => (
            <div className="all-products-single" key={product.id}>
              <img className="all-products-image" src={product.image} />
              {product.name}
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
  return {getProducts: () => dispatch(getAllProducts())}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
