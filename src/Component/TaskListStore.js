import { createSlice } from "@reduxjs/toolkit";

const key = "myDataItem";
const data = JSON.parse(localStorage.getItem(key));

const addTodoReducer = createSlice({
  name: "todos",
  initialState: {
    taskList: data || [],
  },
  reducers: {
    //here we will write our reducer
    //Adding todos
    addTodos: (state, action) => {
      state.taskList = action.payload;
      console.log(state, "state", action);
      localStorage.setItem(key, JSON.stringify(state.taskList));
      return state;
    },
    //update todos
    updateTodos: (state, action) => {
      state.taskList = state.taskList.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return todo;
      });
      return state;
    },
  },
});

export const { addTodos, removeTodos, updateTodos, completeTodos } =
  addTodoReducer.actions;
export default addTodoReducer.reducer;
