import React from 'react'
import {Link} from 'react-router-dom'

const Orders = props => {
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
          {props.orders.map(order => (
            <tr key={order.id}>
              <td>{order.shippingname}</td>
              <td>{order.shippingaddress}</td>
              <Link to={`/orders/${order.id}`}>
                <td>{order.updatedAt}</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Orders
