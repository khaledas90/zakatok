import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isNavigating: boolean;
  dashboardDrawerOpened: boolean;
}

const initialState: UIState = {
  isNavigating: false,
  dashboardDrawerOpened: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsNavigating(state, action: { payload: boolean }) {
      state.isNavigating = action.payload;
    },
    setDashboardDrawerOpened(state, action: { payload: boolean }) {
      state.dashboardDrawerOpened = action.payload;
    },
  },
});

export const { setIsNavigating, setDashboardDrawerOpened } = uiSlice.actions;
export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
