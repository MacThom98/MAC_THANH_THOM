import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from "./feature/tokenSlice"

const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;