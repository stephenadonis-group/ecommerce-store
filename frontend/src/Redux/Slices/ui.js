import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const uiSlice = createSlice({
  name: "UI",
  initialState,

  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleMode } = uiSlice.actions;

export default uiSlice.reducer;
