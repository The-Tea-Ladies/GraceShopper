import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {getOrders} from '../store/orders'
import OrderHistory from './orderHistory'

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUser()
    this.props.getOrders()
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
        {this.props.user ? (
          <div>
            <h3>Welcome {this.props.user.name}</h3>
            <OrderHistory orders={this.props.orders} />
          </div>
        ) : (
          <p>No such user</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders.all,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getOrders: () => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
