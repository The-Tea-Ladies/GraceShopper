import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const UPDATE_CART = 'UPDATE_CART'
const CLEAR_CART = 'CLEAR_CART'
const DELETE_ITEM = 'DELETE_ITEM'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
export const updateCart = product => {
  return {
    type: UPDATE_CART,
    newCartItem: {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      inventory: product.inventory,
      quantity: 1
    }
  }
}

const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}
export const deleteItem = itemId => ({
  type: DELETE_ITEM,
  itemId
})

/**
 * THUNK CREATORS
 */

export const sendOrder = newOrder => {
  return async dispatch => {
    try {
      const {data} = await axios.post('api/orders', newOrder)
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
    case UPDATE_CART:
      let updated = false
      cart.forEach(item => {
        if (item.id === action.newCartItem.id) {
          item.quantity++
          updated = true
        }
      })
      if (!updated) {
        return [...cart, action.newCartItem]
      } else {
        return [...cart]
      }
    case CLEAR_CART:
      return []
    case DELETE_ITEM:
      cart.forEach(item => {
        if (item.id == action.itemId && item.quantity !== 0) item.quantity--
      })
      let updatedCart = cart.filter(item => {
        return item.quantity != 0
      })
      return updatedCart
    default:
      return cart
  }
}
