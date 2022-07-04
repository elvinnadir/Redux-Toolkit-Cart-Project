import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import CartItem from '../../cartItems';
import axios from 'axios'


let url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', async () =>{
  try {
    const resp = await axios(url)
    return resp.data
  } catch (error) {
     console.log(error.response.data);
  }
})

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  //   logic is here 
//   CLEARCART 
  clearCart: (state) =>{
    state.cartItems = []
  },
// remove Item in the cart 
  RemoveItem: (state,action) =>{
      const itemId = action.payload
    state.cartItems =  state.cartItems.filter((item) => item.id !== itemId)
  },
// RemoveItem: (state, {payload})=>{
//    let cartItem = state.cartItems.filter((item) => item.id !== payload)
//   state.cartItems = cartItem
// },
//   Increment Amount of Item 
  increase: (state, {payload}) =>{
    const cartItem = state.cartItems.find((item) => item.id === payload.id)
    cartItem.amount = cartItem.amount + 1
  },
  // Decrement Amount of Item
  decrease: (state, {payload}) =>{
    const cartItem = state.cartItems.find((item) => item.id === payload.id)
    cartItem.amount = cartItem.amount - 1
  },
// calculate total amount aaaaand amount of items 
  calculateTotals: (state)  =>{
    let amount = 0;
    let total = 0;
    state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
    })
    state.amount = amount;
    state.total = total;
  },
  },
  extraReducers:{
    [getCartItems.pending]: (state) =>{
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) =>{
      // console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) =>{
      state.isLoading= false;
    },
  }
})


// Action creators are generated for each case reducer function
export const {getProducts, clearCart, RemoveItem, increase, decrease, calculateTotals } = CartSlice.actions

export default CartSlice.reducer