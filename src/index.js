import React from "react"
import ReactDOM from "react-dom"
import createSagaMiddleware from "redux-saga"
import "./index.css"
import { applyMiddleware, compose, createStore } from "redux"
import { Provider } from "react-redux"
import App from "./App"
import rootReducer from "./reducers"

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware))
)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
