import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min"
import "./helpers/static/pages/sbadmin2/css/sb-admin-2.min.css"
import "./helpers/static/pages/sbadmin2/vendor/fontawesome-free/css/all.min.css"
import "./App.css"

import AppRoute from "./routes/routes"

function App() {
  return (
    <div className="App">
      <AppRoute />
    </div>
  )
}

export default App
