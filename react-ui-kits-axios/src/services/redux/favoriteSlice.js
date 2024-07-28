import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: { favorites: [] },
  reducers: {
    addToFav(state, action) {
      state.favorites.push(action.payload);
    },
    removeFromFav(state, action) {
      state.favorites = [
        ...state.favorites.filter((x) => x.id !== action.payload),
      ];
    },
  },
});

export const { addToFav, removeFromFav } = favoriteSlice.actions;
export default favoriteSlice.reducer;
