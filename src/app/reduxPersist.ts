import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskReducer from "../app/lib/taskSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["tasks"], // Añadir cualquier estado que quieras persistir
};

const persistedReducer = persistReducer(persistConfig, taskReducer);

const store = configureStore({
  reducer: {
    tasks: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // Ignorar acciones persistentes
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
