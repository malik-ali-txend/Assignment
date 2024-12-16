import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const initialState = {
  items: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const { id, newItem } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) state.items[index] = newItem;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const apiSlice = createApi({
  reducerPath: 'api', // Redux state slice name
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spoonacular.com/',
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => `recipes/random?apiKey=d25d4c6f03924ab1b37f7982069eb5a3&number=5`,
      
    }),
  }),
});


export const { addItem, updateItem, deleteItem } = dataSlice.actions;
export const { useGetRecipesQuery } = apiSlice;
export default dataSlice.reducer;
