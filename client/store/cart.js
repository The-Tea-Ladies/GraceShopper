import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const LOAD_CART = 'LOAD_CART'
const CLEAR_CART = 'CLEAR_CART'
// const DELETED_ITEM = 'DELETED_ITEM'

/**
 * INITIAL STATE
 */
const initialState = {cart: [], total: 0}

/**
 * ACTION CREATORS
 */
const loadCart = data => {
  return {
    type: LOAD_CART,
    cart: data.cart,
    total: data.total
  }
}

// const deletedItem = itemId => ({
//   type: DELETED_ITEM,
//   itemId
// })

const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

/**
 * THUNK CREATORS
 */

export const addToCart = productId => {
  return async dispatch => {
    try {
      await axios.post(`/api/orders/${productId}`)
      const {data} = await axios.get('/api/orders')
      dispatch(loadCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(loadCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteItem = productId => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/${productId}`)
      const {data} = await axios.get('/api/orders')
      dispatch(loadCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getOrderId = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/id')
      return data.orderId
    } catch (error) {
      console.error(error)
    }
  }
}

export const sendOrder = newOrder => {
  return async dispatch => {
    try {
      await axios.put('/api/orders/checkout', newOrder)
      dispatch(clearCart())
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(cartState = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      // let updated = false
      // cart.forEach(item => {
      //   if (item.id === action.productId) {
      //     item.quantity++
      //     updated = true
      //   }
      // })
      // if (!updated) {
      //   return [...cart, action.newCartItem]
      // } else {
      //   return [...cart]
      // }
      return {...cartState, cart: action.cart, total: action.total}
    case CLEAR_CART:
      return initialState
    // case DELETED_ITEM:
    //   cart.forEach(item => {
    //     if (item.id == action.itemId && item.quantity !== 0) item.quantity--
    //   })
    //   let updatedCart = cart.filter(item => {
    //     return item.quantity != 0
    //   })
    //   return updatedCart
    default:
      return cartState
  }
}
