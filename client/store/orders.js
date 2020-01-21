import axios from 'axios'

const LOAD_ORDERS = 'LOAD_ORDERS'

const initialState = []

const loadOrders = orders => {
  return {type: LOAD_ORDERS, orders}
}

export const getOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(loadOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(orders = initialState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return [...action.orders]
    default:
      return orders
  }
}
