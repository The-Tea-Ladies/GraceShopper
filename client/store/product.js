import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_ONE_PRODUCT = 'GOT_ONE_PRODUCT'

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  single: {}
}

/**
 * ACTION CREATORS
 */
const gotAllProducts = products => ({
  type: GOT_ALL_PRODUCTS,
  products
})

export const gotOneProduct = product => ({
  type: GOT_ONE_PRODUCT,
  product
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

export const getSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(gotOneProduct(res.data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, all: action.products}
    case GOT_ONE_PRODUCT:
      return {...state, single: action.product}
    default:
      return state
  }
}
