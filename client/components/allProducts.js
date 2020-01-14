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
        <h3>All Products Here yay!</h3>
        <div>
          {this.props.products.map(product => (
            <div key={product.id}>
              {product.name}
              <img src={product.image} />
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
