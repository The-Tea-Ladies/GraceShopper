import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const UPDATE_CART = 'UPDATE_CART'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
export const updateCart = product => {
  return {
    type: UPDATE_CART,
    newCartItem: {
      name: product.name,
      image: product.image,
      price: product.price,
      inventory: product.inventory
    },
    id: product.id
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
      if (cart[action.id]) {
        return {
          ...cart,
          [action.id]: {
            ...action.newCartItem,
            quantity: cart[action.id].quantity + 1
          }
        }
      } else {
        return {...cart, [action.id]: {...action.newCartItem, quantity: 1}}
      }
    default:
      return cart
  }
}
