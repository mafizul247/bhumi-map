import { configureStore, createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../utils/storage";

const saved = loadState();

const settingsSlice = createSlice({
  name: "settings",
  initialState: saved.settings || { language: "en", theme: "light" },
  reducers: {
    setLanguage: (state, action) => { state.language = action.payload; },
    setTheme: (state, action) => { state.theme = action.payload; }
  }
});

const historySlice = createSlice({
  name: "history",
  initialState: saved.history || [],
  reducers: {
    add: (state, action) => { state.unshift(action.payload); if (state.length > 50) state.pop(); },
    remove: (state, action) => state.filter(x => x.id !== action.payload),
    clear: () => []
  }
});

const plotsSlice = createSlice({
  name: "plots",
  initialState: saved.plots || [],
  reducers: {
    add: (state, action) => { state.unshift(action.payload); },
    remove: (state, action) => state.filter(x => x.id !== action.payload)
  }
});

export const { setLanguage, setTheme } = settingsSlice.actions;
export const { add: addHistory, remove: removeHistory, clear: clearHistory } = historySlice.actions;
export const { add: addPlot, remove: removePlot } = plotsSlice.actions;

export const store = configureStore({
  reducer: { settings: settingsSlice.reducer, history: historySlice.reducer, plots: plotsSlice.reducer },
  preloadedState: saved && Object.keys(saved).length ? saved : undefined
});

store.subscribe(() => {
  const s = store.getState();
  saveState({ settings: s.settings, history: s.history, plots: s.plots });
});