import React from "react";
import ReactDOM from "react-dom/client";
import 'regenerator-runtime/runtime.js'
import Speech from "react-speech"
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { Provider } from "react-redux";
import store from "../reudx/store.js";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import ContextProvider from "./Context/Context.jsx";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ContextProvider>
          <App />
          <Toaster />
        </ContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
