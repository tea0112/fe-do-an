import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import "./App.css"

import { BrowserRouter, Switch } from "react-router-dom"
import React from "react"
import AppRoute from "./routes"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AppRoute />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
