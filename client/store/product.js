import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

/**
 * INITIAL STATE
 */
const initialState = {all: []}

/**
 * ACTION CREATORS
 */
const gotAllProducts = products => ({
  type: GOT_ALL_PRODUCTS,
  products
})

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products')
    dispatch(gotAllProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, all: action.products}
    default:
      return state
  }
}
