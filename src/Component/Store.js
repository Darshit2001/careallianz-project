import { configureStore } from "@reduxjs/toolkit";
import addTodoReducer from "./TaskListStore";

const store = configureStore({
  reducer: {
    addList: addTodoReducer,
  },
});

export default store;
