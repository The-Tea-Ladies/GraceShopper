import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'
import {me} from '../store/user'

class Orders extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getOrders(this.props.user.id)
  }

  render() {
    return (
      <div>
        <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>Shipping Name</th>
              <th>Shipping Address</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.orders.map(order => (
              <tr key={order.id}>
                <td>{order.shippingname}</td>
                <td>{order.shippingaddress}</td>
                <td>{order.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    getOrders: userId => dispatch(getOrders(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
