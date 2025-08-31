import { createSlice } from "@reduxjs/toolkit";

const initialData = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

const tableSlice = createSlice({
  name: "table",
  initialState: {
    history: [initialData],
    currentIndex: 0,
  },
  reducers: {
    editCell: (state, action) => {
      const { id, field, value } = action.payload;
      const newData = state.history[state.currentIndex].map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      );

      state.history = [
        ...state.history.slice(0, state.currentIndex + 1),
        newData,
      ];
      state.currentIndex++;
    },
    undo: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    },
    redo: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex++;
      }
    },
  },
});

export const { editCell, undo, redo } = tableSlice.actions;
export default tableSlice.reducer;
