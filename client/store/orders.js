import axios from 'axios'

const initialState = {
  all: [],
  single: {}
}

const LOAD_ORDERS = 'LOAD_ORDERS'

const loadOrders = orders => {
  return {type: LOAD_ORDERS, orders}
}

export const getOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/myorders`)
      dispatch(loadOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const LOAD_ONE_ORDER = 'LOAD_ONE_ORDER'

const loadOneOrder = order => {
  return {type: LOAD_ONE_ORDER, order}
}

export const getOneOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/myorders/${orderId}`)
      dispatch(loadOneOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORDERS:
      return {...state, all: action.orders}
    case LOAD_ONE_ORDER:
      return {...state, single: action.order}
    default:
      return state
  }
}
