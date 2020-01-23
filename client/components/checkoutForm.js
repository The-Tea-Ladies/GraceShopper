import React from 'react'

/**
 * COMPONENT
 */
const CheckoutForm = props => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <h4>Shipping Address</h4>
        <label htmlFor="name">Name: </label>
        <input
          name="shippingname"
          value={props.state.shippingname}
          onChange={props.handleChange}
        />

        <label htmlFor="address">Address: </label>
        <input
          name="shippingaddress"
          value={props.state.shippingaddress}
          onChange={props.handleChange}
        />

        <h4>Billing Information</h4>
        <label htmlFor="name">Name on Card: </label>
        <input
          name="billingname"
          value={props.state.billingname}
          onChange={props.handleChange}
        />

        <label htmlFor="address">Billing Address: </label>
        <input
          name="billingaddress"
          value={props.state.billingaddress}
          onChange={props.handleChange}
        />

        {/* <label htmlFor="card">Card Number: </label>
        <input
          name="cardnumber"
          value={props.state.cardnumber}
          onChange={props.handleChange}
        /> */}
        <h4 />
        <div id="order-button">
          <span>Order Total: {props.total}</span>
          <button type="submit">Place order</button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutForm
