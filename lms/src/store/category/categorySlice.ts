import Categories from "@/app/admin/categories/page";
import { createSlice } from "@reduxjs/toolkit";
import { ICategoryInitailState, Status } from "./types";

const datas: ICategoryInitailState = {
  categories: [],
  status: Status.Loading,
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

const {setCategories,setStatus} = categorySlice.actions

export default categorySlice.reducer