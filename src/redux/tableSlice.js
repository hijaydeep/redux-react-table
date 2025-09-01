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
    actions: [], // New: To store descriptions of each change
  },
  reducers: {
    editCell: (state, action) => {
      const { id, field, value } = action.payload;
      const currentTableData = state.history[state.currentIndex];

      // Find the row and its old value to create a descriptive log
      const oldRow = currentTableData.find((row) => row.id === id);

      // If the value hasn't changed, do nothing
      if (!oldRow || oldRow[field] === value) {
        return;
      }

      const actionDescription = `Changed ${oldRow.name}'s ${field} from "${oldRow[field]}" to "${value}"`;

      const newData = currentTableData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      );
      
      // When making a new edit, remove any "future" states from an undo action
      const newHistory = state.history.slice(0, state.currentIndex + 1);
      const newActions = state.actions.slice(0, state.currentIndex);

      state.history = [...newHistory, newData];
      state.actions = [...newActions, actionDescription]; // Add the new action description
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