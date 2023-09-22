import { configureStore } from "@reduxjs/toolkit";
import newMenuSlice from "./Components/Pages/NewMenu/NewMenuSlice";

export const store = configureStore({
  reducer: {
    newMenu: newMenuSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export { store };
