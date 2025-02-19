import { createSlice } from "@reduxjs/toolkit";
import { ICategoryInitialState, status } from "./types";

const datas: ICategoryInitialState = {
  categories: [],
  status: status.loading,
};

const categorySlice = createSlice({
  name: "category",
  initialState: datas,

  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

const { setCategories, setStatus } = categorySlice.actions;

export default categorySlice.reducer;
