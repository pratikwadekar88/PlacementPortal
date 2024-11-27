import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBookmarked: false,
};

export const BookmarkSlice = createSlice({
  name: "bookmarkState",
  initialState,

  reducers: {
    setIsToggled: (state) => {
      state.isBookmarked = !state.isBookmarked;
    },
  },
});

export default BookmarkSlice.reducer;
export const bookmarkAction = BookmarkSlice.actions;
