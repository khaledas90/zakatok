import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./api/global";
import { userApi } from "./api";
import { setupListeners } from "@reduxjs/toolkit/query";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    [userApi.reducerPath]: userApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware)
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
