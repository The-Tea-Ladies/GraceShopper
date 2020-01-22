import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {Link} from 'react-router-dom'

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    console.log(this.props.user)
    return (
      <div>
        {this.props.user ? (
          <div>
            <h3>Welcome {this.props.user.name}</h3>
            <Link to={`/orders/${this.props.user.id}`}>Order History</Link>
          </div>
        ) : (
          <p>No such user</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
