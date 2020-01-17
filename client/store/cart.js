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
const initialState = []

/**
 * ACTION CREATORS
 */
const loadCart = cart => {
  return {
    type: LOAD_CART,
    cart
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

export const sendOrder = newOrder => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/orders/checkout', newOrder)
      dispatch(clearCart())
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(cart = initialState, action) {
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
      return [...action.cart]
    case CLEAR_CART:
      return []
    // case DELETED_ITEM:
    //   cart.forEach(item => {
    //     if (item.id == action.itemId && item.quantity !== 0) item.quantity--
    //   })
    //   let updatedCart = cart.filter(item => {
    //     return item.quantity != 0
    //   })
    //   return updatedCart
    default:
      return cart
  }
}
