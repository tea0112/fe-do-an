import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css"
import "popper.js"
import "bootstrap/dist/js/bootstrap.min"
import "jquery/dist/jquery.min"
import $ from "jquery"

import { BrowserRouter, Switch } from "react-router-dom"
import React from "react"
import AppRoute from "./routes"

window.jQuery = $
window.$ = $
global.jQuery = $

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
