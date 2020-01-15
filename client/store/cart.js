import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const UPDATE_CART = 'UPDATE_CART'

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

/**
 * THUNK CREATORS
 */

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
    default:
      return cart
  }
}
