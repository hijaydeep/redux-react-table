import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableSlice";

// Utility to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("tableState");
    if (serializedState === null) {
      return undefined; // No state found, return undefined to use reducer's initial state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Utility to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("tableState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
  preloadedState: persistedState, // Load the persisted state on startup
});

// Subscribe to store updates and save the state
store.subscribe(() => {
  saveState({
    table: store.getState().table,
  });
});

export default store;
