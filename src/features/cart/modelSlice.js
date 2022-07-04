import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'

const initialState = {
  isOpen: false,
  cocktails: [],
  isLoading: false,
}


export const getCocktails = createAsyncThunk('getCocktails', async () =>{
   try {
    const resp = await axios(url)
    return resp.data.drinks
   } catch (error) {
    console.log(error.response.data);
   }
})


export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
   openModal: (state) =>{
    state.isOpen = true
   },
   closeModal: (state) =>{
    state.isOpen = false
   }
  },
  extraReducers:{
    [getCocktails.pending]: (state) =>{
      state.isLoading = true;
    },
    [getCocktails.fulfilled]: (state, action) =>{
      // console.log(action);
      state.isLoading = false;
      state.cocktails = action.payload;
    },
    [getCocktails.rejected]: (state) =>{
      state.isLoading= false;
    }
  }
})

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer