import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./reducers/userSlice.js";
import Loader from "./reducers/LoaderSlice";
const rootReducer = combineReducers({
  user: user,
  loader: Loader,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  //  composeWithDevTools()
});

const persistor = persistStore(store);
export { store, persistor };
