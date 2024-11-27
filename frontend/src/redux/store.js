import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { UserSlice } from "./user/userState";
import { QuizSlice } from "./quiz/quizState";
import React from "react";
import { BookmarkSlice } from "./bookmark/bookmarkState";

export const store = configureStore({
  reducer: {
    userState: UserSlice.reducer,
    quizState: QuizSlice.reducer,
    bookmarkState: BookmarkSlice.reducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
