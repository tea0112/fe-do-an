import { Route, Switch } from "react-router-dom"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "bootstrap/dist/css/bootstrap.min.css"
import "popper.js"
import "bootstrap/dist/js/bootstrap.min"
import "jquery/dist/jquery.min"
import $ from "jquery"

import AppRoute from "./routes"

window.jQuery = $
window.$ = $
global.jQuery = $

function App() {
  return (
    <Switch>
      <div className="App">
        <Route path="/">
          <AppRoute />
        </Route>
      </div>
    </Switch>
  )
}

export default App
