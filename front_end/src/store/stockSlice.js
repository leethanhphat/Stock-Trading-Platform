import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: [],
  selectedStock: null,
  loading: false,
  error: null,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStocks: (state, action) => {
      state.stocks = action.payload;
    },
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStocks, setSelectedStock, setLoading, setError } = stockSlice.actions;
export default stockSlice.reducer;