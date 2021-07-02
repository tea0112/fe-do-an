import React from "react"
import ReactDOM from "react-dom"
import createSagaMiddleware from "redux-saga"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import rootReducer from "./reducers"
import rootSaga from "./sagas"

// persist react
const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// redux devtool
const composeEnhancer = composeWithDevTools({
  features: { defaultPanel: "state" },
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
)

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
